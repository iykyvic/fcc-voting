import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {
  AppBar, Avatar, Button, IconButton, Switch, Toolbar, Typography
} from 'material-ui';
import { BrowserRouter, Link } from 'react-router-dom'
import Facebook from 'material-ui-next-community-icons/icons/facebook-box';
import AccountCircle from 'material-ui-next-community-icons/icons/account-circle';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import MenuIcon from 'material-ui-icons/Menu';
import VoteBar from './VoteBar';

class Nav extends Component {
  static styles = {
    root: {
      flexGrow: 1,
    },
    flex: {
      flex: 1,
    },
    extra: {
      display: 'flex',
      position: 'relative',
      'align-items': 'center'
    },
    avatar: {
      margin: 10,
      width: 30,
      height: 30,
    },
    rightIcon: {
      marginLeft: 10,
    },
    links: {
      'text-decoration': 'none',
      color: 'inherit'
    },
    navspan: {
      color: '#ffffff'
    },
    displayname: {
      color: '#ffffff',
      'margin-right': '20px',
      'font-family': '"Roboto", "Helvetica", "Arial", sans-serif',
      'font-size': '0.875rem',
      'font-weight': '400',
      'line-height': '1.46429em'
    }
  };
  static LoginLink = props => <a href={ "/api/v1/auth/facebook" } {...props}/>;
  static propTypes = {
    title: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    auth: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.shape()
  };
  static defaultProps = {
    title: 'FCC VOTING',
    auth: 'false',
    user: {
      displayName: 'Anonymous User',
      photos: [{value: ''}],
    }
  }

  render() {
    const UserAvatar = () => {
      const { displayName, photos: [ { value }] } = this.props.user;
      return <Avatar
        alt={displayName}
        src={value}
        className={this.props.classes.avatar}
      />
    };
    const LogoutToggle = () => <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={this.props.auth}
            onChange={this.props.logout.bind(this)}
            aria-label="LoginSwitch"
          />
        }
        label={
          this.props.auth ?
          <span className={this.props.classes.navspan} >Logout</span>
          : <span className={this.props.classes.navspan} >Login</span>
        }
      />
    </FormGroup>;
    const LoginButton = (
      <Button component={Nav.LoginLink} color="inherit">
        Login
        <Facebook className={this.props.classes.rightIcon} />
      </Button>
    );

    return (
      <div className={this.props.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={this.props.classes.flex}>
              <Link className={this.props.classes.links} to="/">{this.props.title} </Link>
            </Typography>
            { this.props.auth ?
              <div className={this.props.classes.extra} >
                <span className={this.props.classes.displayname}>
                  Hi! {this.props.user.displayName.split(' ')[0]}
                </span>
                <LogoutToggle />
                <UserAvatar />
              </div> : LoginButton
            }
          </Toolbar>
        </AppBar>
        <VoteBar pageTitle={this.props.pageTitle} auth={this.props.auth}/>
      </div>
    );
  }
}

export default withStyles(Nav.styles)(Nav);
