import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import green from 'material-ui/colors/green';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Chip from 'material-ui/Chip';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import AddIcon from 'material-ui-icons/Add';
import TrendingFlatIcon from 'material-ui-icons/TrendingFlat';
import Save from 'material-ui-icons/Save';
import IconButton from 'material-ui/IconButton';
import OptionForm from './forms/Option.form';
import { fecthPoll, updatePollTitle, deletePoll as deletePollApi, publishPoll } from '../services/poll.services';
import Options from './Options';
import Polls from './Polls';
import { CircularProgress } from 'material-ui/Progress';

class EditPoll extends Component {
  state = {
    title: {
      value: '',
      error: false
    },
    openOptionForm: false,
    loading: false
  }

  static styles = theme => ({
    root: {
      flexGrow: 1,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    card: {
      margin: '20px 0 10px 0',
      width: '100%',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: '0 0 100%'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    actions: {
      display: 'flex',
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    },
    button: {
      margin: theme.spacing.unit,
      marginLeft: 'auto'
    },
    buttonRight: {
      margin: theme.spacing.unit
    },
    leftIcon: {
      marginRight: theme.spacing.unit,
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
    iconSmall: {
      fontSize: 20,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      marginLeft: 'auto'
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  });

  static propTypes = {
    classes: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    poll: PropTypes.object,
    updatePoll: PropTypes.func.isRequired,
    fetchPoll: PropTypes.func.isRequired,
    deletePoll: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.addOption = this.addOption.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.runFetchPoll = this.runFetchPoll.bind(this);
    this.disableUpdateButton = this.disableUpdateButton.bind(this);
    this.setInput = this.setInput.bind(this);
    this.deletePoll = this.deletePoll.bind(this);
    this.publishPoll = this.publishPoll.bind(this);
    this.unPublishPoll = this.unPublishPoll.bind(this);
  }

  setInput(event) {
    event.persist();
    this.setState(prevState => ({
      [event.target.id]: {
        value: event.target.value,
        error: false
      }
    }));
  }

  async componentWillMount() {
    await this.runFetchPoll();
  }

  async runFetchPoll() {
    try {
      let owner, newPoll;
      const {
        poll, fetchPoll: savePoll, user, history, user: { _id, displayName  }, token
      } = this.props;
      newPoll = poll;
      if (!poll) {
        const currentPoll = await fecthPoll(this.props.match.params.id, token);
        savePoll(currentPoll);
        newPoll = currentPoll;
        owner = _id === currentPoll.author._id;
      } else {
        owner = _id === poll.author._id;
      }


      if (!owner) {
        return this.props.history.push('/');
      }

      this.setState(prevState => ({ title: { value: newPoll.title } }));
    } catch(error) {
      return this.props.history.push('/');
    }
  }

  addOption() {
    this.setState({ openOptionForm: true });
  }

  handleDialogClose() {
    this.setState({ openOptionForm: false });
  }

  disableUpdateButton(oldValue, newValue) {
    return oldValue === newValue;
  }

  async unPublishPoll(poll, token, publish, updatePollState) {
    try {
      this.setState({ loading: true });
      poll.status = 'DRAFT';
      const newPoll = await publish(poll, token);
      this.setState({ loading: false });
      updatePollState(newPoll);

      return;
    } catch(error) {
      return error
    }
  }

  async publishPoll(poll, token, publish, updatePollState) {
    try {
      this.setState({ loading: true });
      poll.status = 'PUBLISHED';
      const newPoll = await publish(poll, token);
      this.setState({ loading: false });
      updatePollState(newPoll);

      return;
    } catch(error) {
      this.setState({ loading: false });
      return error;
    }
  }

  async deletePoll(poll, token, deletePollApi, deletePoll, history) {
    try {
      this.setState({ loading: true });
      await deletePollApi(poll, token);
      deletePoll(poll);
    } catch(error) {
      this.setState({ loading: false });
      return error;
    }
  }

  async updateTitle(poll, newTitle, token, updatePollState) {
    try {
      poll.title = newTitle;
      const updatedPoll = await updatePollTitle(poll, token);
      updatePollState(poll);

      return;
    } catch(error) {
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
      deletePoll,
      history
    } = this.props;
    const { openOptionForm, expandRootPanel, loading } = this.state;
    const options = pollOptions.filter(option => option !== null);
    return (
      <div className={this.props.classes.root}>
        <Grid container alignItems="center" direction="row" justify="center">
          <Grid item xs={12} sm={12} md={8} lg={9}>
            <ExpansionPanel defaultExpanded expanded={expandRootPanel}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography className={classes.heading}>EDIT POLL</Typography>
                <Typography className={classes.secondaryHeading}>
                  created: {Polls.formatDate(new Date(poll.date))}
                </Typography>
                <Typography className={classes.secondaryHeading}>status: {poll.status}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                <Grid container direction="row">
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <form id="edit-poll" className={classes.container}>
                      <Button
                        className={classes.buttonRight}
                        href={`/poll/${poll._id}`}
                        variant="raised"
                        size="small"
                        color="secondary"
                      >
                        <TrendingFlatIcon /> VIEW POLL
                      </Button>
                      <Button className={classes.button}  color="primary" onClick={this.addOption}>
                        <AddIcon /> ADD OPTION
                      </Button>
                      <TextField
                        id="title"
                        label="Poll Title"
                        placeholder="Enter a title for your poll (greater than 5 letters)"
                        className={classes.TextField}
                        value={this.state.title.value}
                        error={this.state.title.error}
                        margin="normal"
                        required
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={this.setInput}
                      />
                      <Button
                        className={classes.button}
                        color="primary"
                        disabled={this.disableUpdateButton(poll.title, this.state.title.value)}
                        onClick={() => this.updateTitle(poll, this.state.title.value, token, updatePoll)}
                      >
                        <AddIcon /> UPDATE TITLE
                      </Button>

                      <OptionForm
                        updatePoll={updatePoll}
                        open={openOptionForm}
                        handleClose={this.handleDialogClose}
                        token={token}
                        poll={poll}
                      />
                    </form>
                  </Grid>
                  {options.length > 0 ? options.map((option, index) => (
                    <Options poll={poll} option={option} token={token} updatePoll={updatePoll} index={index} key={`option-${index}`}/>
                  )) : ''}
                </Grid>
              </ExpansionPanelDetails>
              <Divider/>
              <ExpansionPanelActions>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => this.deletePoll(poll, token, deletePollApi, deletePoll, history)}
                >
                  DELETE
                </Button>
                {
                  poll.status === 'PUBLISHED' ?
                  <Button
                    onClick={() => this.unPublishPoll(poll, token, publishPoll, updatePoll)}
                    size="small"
                    color="primary"
                    disabled={poll.options.length < 2}
                  >
                    UNPUBLISH POLL
                  </Button> :
                  <Button
                    onClick={() => this.publishPoll(poll, token, publishPoll, updatePoll)}
                    size="small"
                    color="primary"
                    disabled={poll.options.length < 2}
                  >
                    PUBLISH POLL
                  </Button>
                }
                {loading && <CircularProgress size={68} className={classes.buttonProgress} />}
              </ExpansionPanelActions>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default withStyles(EditPoll.styles)(EditPoll);
