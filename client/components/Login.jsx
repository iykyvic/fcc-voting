import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fecthCurrentUser } from '../services/user.service';

export default class Login extends Component {
  async componentWillMount() {
    const { auth, loading, location, currentUser, login } = this.props;
    if(!auth) {
      const token = new URLSearchParams(location.search).get('token');
      loading(true, 'user');
      const user = await fecthCurrentUser(token);
      currentUser(user);
      if (!user.error) {
        return login(token);
      }
    }
  }

  static propTypes = {
    auth: PropTypes.bool.isRequired
  };

  componentDidMount() {
    return this.props.history.push('/');
  }

  render() {
    return null;
  }
}
