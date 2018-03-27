import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { createPoll } from '../../services/poll.services';
import Typography from 'material-ui/Typography';

export class PollForm extends Component {
  state = {
    title: {
      value: '',
      error: false
    }
  }
  static styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    button: {
      margin: theme.spacing.unit,
      marginLeft: 'auto'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 600,
    },
    root: theme.typography.button,
    text: {
      textAlign: 'center',
      margin: '20px'
    },
    grid: {
      marginTop: '30%'
    },
  });

  static propTypes = {
    classes: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    createPoll: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.createPoll = this.createPoll.bind(this);
    this.setTitle = this.setTitle.bind(this);
  }

  setTitle(event) {
    event.persist();
    return this.setState(prevState => ({
      title: {
        value: event.target.value,
        error: false
      }
    }));
  }

  isValidTitle(title) {
    return title.length > 5
  }

  async createPoll() {
    try {
      const title = this.state.title.value;
      if (this.isValidTitle(title)) {
        let poll = await createPoll(title, this.props.token);
        poll.author = {
          _id: poll.author,
          displayName: this.props.user.displayName
        }
        this.props.createPoll(poll);

        return this.props.history.push(`/poll/${poll._id}/edit`)
      }

      return this.setState(prevState => ({
        title: {
          value: '',
          error: true
        }
      }));
    } catch(error) {
      return error;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.grid}>
        <Paper className={classes.paperRoot} elevation={4}>
          <form id="new-poll" className={classes.container}>
            <div className={classes.text}>
              <span className={classes.root}>Enter the title of your new poll below</span>
            </div>
            <TextField
              id="title"
              label="Title"
              placeholder="Enter a title for your poll (greater than 5 letters)"
              className={classes.textField}
              value={this.state.title.value}
              error={this.state.title.error}
              margin="normal"
              required
              onChange={this.setTitle}
            />
            <Button variant="flat" className={classes.button} onClick={this.createPoll}>
              NEXT
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(PollForm.styles)(PollForm);
