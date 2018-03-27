import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ClearIcon from 'material-ui-icons/Clear';
import Collapse from 'material-ui/transitions/Collapse';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import IconButton from 'material-ui/IconButton';
import classnames from 'classnames';
import { updatePollOptionTitle, deletePollOption } from '../services/option.service';
import { CircularProgress } from 'material-ui/Progress';
import green from 'material-ui/colors/green';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class Option extends Component {
  state = {
    title: this.props.option.title,
    expanded: false,
    loadingUpdate: false,
    loadingDelete: false,
    deleteDialogOpen: false
  }
  static styles = theme => ({
    actions: {
      display: 'flex',
    },
    card: {
      margin: '20px 0 10px 0',
      width: '100%',
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
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    buttonProgress: {
      color: green[500],
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
    },
  });

  static propTypes = {
    classes: PropTypes.object.isRequired,
    option: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    updatePoll: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    poll: PropTypes.object.isRequired
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  constructor(props) {
    super(props);

    this.setInput = this.setInput.bind(this);
    this.updateOptionTitle = this.updateOptionTitle.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.handleDeleteDialogClose = this.handleDeleteDialogClose.bind(this);
    this.handleDeleteDialogOpen = this.handleDeleteDialogOpen.bind(this);
  }

  setInput = (event) => {
    event.persist();
    return this.setState(prevState => ({ title: event.target.value }));
  }

  async updateOptionTitle(oldOption, newTitle, token, poll, index, updatePollState) {
    try {
      oldOption.title = newTitle;
      this.setState({ loadingUpdate: true });
      const option = await updatePollOptionTitle(oldOption, token);
      poll.options[index] = option;
      updatePollState(poll);
      return this.setState({ loadingUpdate: false });
    } catch (error) {
      return this.setState({ loadingUpdate: false });
    }
  }

  async deleteOption(option, token, poll, index, updatePollState) {
    try {
      this.setState({ loadingUpdate: true });
      await deletePollOption(option, token);
      delete poll.options[index];
      poll.options = poll.options.filter(option => option !== null);
      this.setState({
        loadingUpdate: false, deleteDialogOpen: false, expanded: false
      });
      return updatePollState(poll);
    } catch (error) {
      this.setState({ loadingUpdate: false, deleteDialogOpen: false });
      return;
    }
  }

  handleDeleteDialogOpen() {
    return this.setState({ deleteDialogOpen: true });
  }

  handleDeleteDialogClose() {
    this.setState({ deleteDialogOpen: false });
  }

  render() {
    const { classes, token, updatePoll, option, index, poll } = this.props;
    const { loadingDelete, loadingUpdate } = this.state;

    return (
      <Grid item xs={12} sm={12} md={6} lg={6} >
        <Card className={classes.card}>
          <CardHeader
            action={
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ModeEditIcon />
              </IconButton>
            }
            title={`OPTION ${index + 1}`}
            subheader={this.state.title}
          />
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <form id={`option-form-${index}`}>
                <TextField
                  id={`option-${index}`}
                  label="option"
                  placeholder="Enter a option (greater than 5 letters)"
                  className={classes.TextField}
                  margin="normal"
                  required
                  value={this.state.title}
                  onChange={this.setInput}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <Button
                id={`optionDelete-${index}`}
                className={classes.buttonRight}
                color="secondary"
                onClick={this.handleDeleteDialogOpen}
              >
                <ClearIcon /> DELETE OPTION
                {loadingDelete && <CircularProgress size={30} className={classes.buttonProgress} />}
              </Button>

              <Button
                id={`optionUpdate-${index}`}
                className={classes.button}
                color="primary"
                disabled={(option.title === this.state.title) || loadingUpdate}
                onClick={() => this.updateOptionTitle(option, this.state.title, token, poll, index, updatePoll)}
              >
                <AddIcon /> UPDATE OPTION
                {loadingUpdate && <CircularProgress size={30} className={classes.buttonProgress} />}
              </Button>
            </CardActions>
          </Collapse>

        </Card>
        <Dialog
          open={this.state.deleteDialogOpen}
          onClose={this.handleDeleteDialogClose}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">{`Delete Option ${index}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              clicking on delete will completely remove this option from your poll.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteDialogClose} color="primary">
              GO BACK
            </Button>
            <Button
              onClick={() => this.deleteOption(option, token, poll, index, updatePoll)}
              color="secondary"
              autoFocus
            >
              DELETE
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>

    );
  }
}

export default withStyles(Option.styles)(Option);
