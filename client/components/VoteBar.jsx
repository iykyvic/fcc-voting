import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Toolbar, Typography } from 'material-ui';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ViewListIcon from 'material-ui-icons/ViewList';
import MenuIcon from 'material-ui-icons/Menu';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    margin: theme.spacing.unit * 2,
  },
});

const VoteBar = (props) => {
  const { classes } = props;
  return (
    <Toolbar >
      <Typography variant="subheading" color="textSecondary" className={classes.flex}>
        {props.pageTitle.toUpperCase()}
      </Typography>

      { props.auth ?
        <span>
          <Button href="/polls" color="inherit" className={classes.menuButton}>
            <ViewListIcon /> View Your Polls
          </Button>
          <Button href="/poll/new" color="inherit" className={classes.menuButton}>
            <AddIcon /> Add New Poll
          </Button>
        </span>
        : ''
      }
    </Toolbar>
  )
};

VoteBar.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  auth: PropTypes.bool.isRequired
};

export default withStyles(styles)(VoteBar);
