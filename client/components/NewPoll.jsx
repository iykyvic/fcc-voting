import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import PollForm from './forms/Polls.form';

class NewPoll extends Component {

  static styles = theme => ({
    root: {
      flexGrow: 1,
    },
  });

  static propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.func.isRequired,
    createPoll: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
  };

  render () {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container alignItems="center" direction="row" justify="center">
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <PollForm  {...this.props}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(NewPoll.styles)(NewPoll);
