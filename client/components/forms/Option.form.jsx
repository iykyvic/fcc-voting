import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import AddIcon from 'material-ui-icons/Add';
import SaveIcon from 'material-ui-icons/Save';
import { CircularProgress } from 'material-ui/Progress';
import { createOption } from '../../services/option.service';

class OptionForm extends Component {
  state = {
    option: {
      value: '',
      error: false
    },
    loading: false
  };

  static style = theme => ({
    button: {
      margin: theme.spacing.unit,
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
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    poll: PropTypes.object.isRequired,
    updatePoll: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.saveOption = this.saveOption.bind(this);
    this.resetState = this.resetState.bind(this);
    this.setInput = this.setInput.bind(this);
  }

  setInput(event) {
    event.persist();
    return this.setState(prevState => ({
      [event.target.id]: {
        value: event.target.value,
        error: false
      }
    }));
  }

  isValidTitle(title) {
    return title.length > 5
  }

  async saveOption() {
    try {
      const { token, poll } = this.props;
      this.setState({ loading: true });
      const title = this.state.option.value;
      if (this.isValidTitle(title)) {
        const update = await createOption(title, poll, token);
        this.props.updatePoll(update[1]);
      } else {
        this.setState({ option: { error: true } })
      }

      return this.setState(prevState => ({
        option: {
          value: '',
          error: prevState.option.error
        },
        loading: false,
        success: false
      }));
    } catch(error) {
      return this.setState(prevState => ({
        option: {
          value: '',
          error: true
        },
        loading: false,
        success: false
      }));
    }
  }

  resetState() {
    this.setState({ loading: false, success: false });
    this.props.handleClose();
  }

  render() {
    const { classes, open, handleClose } = this.props;
    const { loading } = this.state;

    return (
      <div>
        <Dialog
          open={open}
          onClose={this.resetState}
          aria-labelledby="option-form-title"
        >
          <DialogTitle id="option-form-title">ADD OPTION</DialogTitle>
          <DialogContent>
            <DialogContentText>
              add a option for your poll and click on the save button
            </DialogContentText>
            <form id="add-option">
              <TextField
                autoFocus
                margin="dense"
                id="option"
                label="option"
                placeholder="Enter a title for your option (greater than 5 letters)"
                error={this.state.option.error}
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.setInput}
                value={this.state.option.value}
                disabled={this.state.loading}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.resetState} color="primary">
              CLOSE
            </Button>

            <Button onClick={this.saveOption} color="primary" disabled={loading}>
              <SaveIcon /> SAVE OPTION
            </Button>
            {loading && <CircularProgress size={68} className={classes.buttonProgress} />}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(OptionForm.style)(OptionForm)
