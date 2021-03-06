import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import DoneAllIcon from 'material-ui-icons/DoneAll';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';
import { updatePollOptionStat } from '../services/option.service';
import { fecthPoll } from '../services/poll.services';
import FacebookProvider, { Share } from 'react-facebook';
import Facebook from 'material-ui-next-community-icons/icons/facebook';
import Fingerprint2 from 'fingerprintjs2';
import green from 'material-ui/colors/green';

class Poll extends Component {
  state = {
    options: [],
    finger: '',
    chartLoading: false,
    voting: false,
    disableVoteButton: true,
    hasAlreadyVoted: false
  };

  loadScript(src) {
    this.setState({ chartLoading: true });
    const { poll: { title, options } } = this.props;
    return new Promise(function(resolve, reject){
      var script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', () => {
        const chart = () => {
          google.charts.load("current", {packages:["corechart"]});
          google.charts.setOnLoadCallback(() => drawChart(options));
          function drawChart (options) {
            const totalVotes = options.map((option, index) => option.timesChosen)
              .reduce((a,b) => (a + b));
            const formatedOptions = options.map(option => ([
              option.title, option.timesChosen/totalVotes
            ]));
            const newOptions = [['Task', 'Hours per Day'], ...formatedOptions];
            var data = google.visualization
              .arrayToDataTable(newOptions);

            var options = {
              title,
              pieHole: 0.4,
            };

            var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
            chart.draw(data, options);
            try {
              this.setState({ chartLoading: false });
            } catch(error) {
              // do nothing
            }
          };
        }
        resolve(chart());
      });
      script.addEventListener('error', (e) => {
        try {
          this.setState({ chartLoading: false });
        } catch(error) {
          // do nothing
        }
        reject(e);
      });
      document.body.appendChild(script);
    });
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    poll: PropTypes.object,
    fetchPoll: PropTypes.func.isRequired,
    updatePoll: PropTypes.func.isRequired
  };

  static styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      backgroundColor: theme.palette.background.paper
    },
    title: {
      marginLeft: theme.spacing.unit * 4
    },
    button: {
      margin: theme.spacing.unit,
      marginLeft: 'auto'
    },
    actions: {
      display: 'flex',
    },
    chart: {
      width: '100%',
      height: 'auto'
    },
    progress: {
      margin: theme.spacing.unit * 2,
      marginLeft: '35%',
      marginTop: '6%'
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '30%',
      left: '20vw',
      marginTop: -12,
      marginLeft: -12,
      zIndex: 99999
    },
  });

  constructor(props) {
    super(props);

    this.vote = this.vote.bind(this);
    this.createFingerPrint = this.createFingerPrint.bind(this);
  }

  createFingerPrint() {
    return new Promise((resolve, reject) => new Fingerprint2()
      .get(finger => resolve(finger)));
  }

  async componentDidMount () {
    const finger = await this.createFingerPrint();

    let poll = await this.runFetchPoll();
    const { auth, history } = this.props;

    if (poll.options.length > 0) {
      this.setState({
        finger,
        options: poll.options.map(option => ({ ...option, checked: false }))
      });
    }
    if (poll.options.length < 2) {
      return history.push('/');
    }
    if(!auth && poll.status !== 'PUBLISHED') {
      return history.push('/');
    }

    return await this.loadScript('https://www.gstatic.com/charts/loader.js');
  }

  async runFetchPoll() {
    try {
      let newPoll;
      const {
        poll, fetchPoll: savePoll, user, history, user: { _id, displayName  }, token
      } = this.props;
      newPoll = poll;
      if (!poll) {
        const currentPoll = await fecthPoll(this.props.match.params.id, token);

        savePoll(currentPoll);
        newPoll = currentPoll;
      }

      return newPoll;
    } catch(error) {
      return this.props.history.push('/');
    }
  }

  handleToggle = index => () => {
    const { options } = this.state;
    const newOptions = [...options];
    if (!newOptions[index].checked) {
      newOptions.forEach(value => {
        value.checked = false;
      });
      newOptions[index].checked = true;
    } else {
      newOptions[index].checked = !newOptions[index].checked;
    }

    const disableVoteButton = newOptions.every(option => option.checked === false);
    this.setState({ ...newOptions, disableVoteButton });
  };

  async vote() {
    try {
      this.setState(prevState => ({ ...prevState, voting: true }));
      const { poll, updatePoll } = this.props;
      const selectedOption = this.state.options.filter(option => option.checked)[0];
      const update = await updatePollOptionStat(selectedOption, this.state.finger);
      let index;
      poll.options.forEach((option, indexOption) => {
        if (option._id === selectedOption._id) {
          index = indexOption
          return;
        }
      });
      const newPoll = {...poll};
      newPoll.options[index] = update;

      updatePoll(newPoll);
      location.reload();
    } catch (error) {
      this.setState({ voting: false });
      return error;
    }
  }

  render() {
    if (!this.props.poll) return null;
    const {
      classes,
      token,
      updatePoll,
      poll,
      poll: { options: pollOptions },
      history,
      auth
    } = this.props;

    if(poll.options.length < 2 || this.state.options.length < 1) return null;
    if(!auth && poll.status !== 'PUBLISHED') return null
    return (
      <div className={this.props.classes.root}>
        <Grid container alignItems="center" direction="row" justify="center">
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                action={
                  <FacebookProvider appId={FACEBOOK_APP_ID}>
                    <Share href={`${HOST_NAME}/poll/${poll._id}`}>
                    <Button
                      color="primary"
                      className={classes.button}
                    >
                      <Facebook/> SHARE
                    </Button>
                    </Share>
                  </FacebookProvider>
                }
              />
              <CardContent>
              <Typography className={classes.title} gutterBottom variant="headline" component="h2">
                {poll.title}
              </Typography>
                <List>
                  {pollOptions.map((option, index) => (
                    <div key={index}>
                      <ListItem
                        role={undefined}
                        dense
                        button
                        onClick={this.handleToggle(index)}
                        className={classes.listItem}
                      >
                        <Checkbox
                          checked={this.state.options[index].checked}
                          tabIndex={-1}
                          disableRipple
                        />
                        <ListItemText primary={option.title} />
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
                {this.state.voting && <CircularProgress
                  size={68}
                  className={classes.buttonProgress}
                  size={200}
                  thickness={3}
                /> }
              </CardContent>
              <CardActions className={classes.actions} disableActionSpacing>
              <Button
                color="primary"
                className={classes.button}
                onClick={this.vote}
                disabled={this.state.disableVoteButton}
              >
                <DoneAllIcon /> VOTE
              </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <div id="donutchart" className={classes.chart}>
              {
                this.state.chartLoading ?
                <CircularProgress
                  className={classes.progress}
                  size={200}
                  style={{ color: purple[500]}}
                  thickness={3}
                />
                : null
              }
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(Poll.styles)(Poll);
