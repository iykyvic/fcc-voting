import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
    minHeight: 300
  },
  grid: {
    position: 'absolute',
    top: '30%'
  },
  icon: {
    display: 'block',
    margin: '0 auto',
  },
  heading: {
    textAlign: 'center',
    margin: theme.spacing.unit * 2,
  },
  button: {
    display: 'block',
    margin: '0 auto',
    width: '145px'
  }
});


const NoPoll = (props) => {
  const { classes } = props;

  return <Grid container alignItems="center" direction="row" justify="center" className={classes.grid}>
    <Grid item xs={12} sm={12} md={6 } lg={4}>
      <Paper className={classes.control}>
        <Icon className={classes.icon} color="inherit" style={{ fontSize: '10em', textAlign: 'center' }}>note_add</Icon>
        <Typography className={classes.heading} variant="headline" component="h3">
          NO POLL FOUND
        </Typography>
        <Button href="/poll/new" variant="raised" color="secondary" className={classes.button}>
          ADD A NEW POLL
        </Button>
      </Paper>
    </Grid>
  </Grid>

}

NoPoll.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoPoll)
