import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { MuiThemeProvider, darkBaseTheme } from 'material-ui/styles';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import {
  LOGIN,
  LOGOUT,
  FETCH_CURRENT_USER,
  LOADING,
  FETCH_POLLS,
  FETCH_POLL,
  CREATE_POLL,
  UPDATE_POLL,
  DELETE_POLL,
} from '../store/actions';
import Nav from './Nav';
import Login from './Login';
import Polls from './Polls';
import Poll from './Poll';
import NewPoll from './NewPoll';
import EditPoll from './EditPoll';

const Vote = props => {
  return <BrowserRouter>
    <MuiThemeProvider theme={createMuiTheme(darkBaseTheme)}>
      <Nav title={props.title} pageTitle={props.pageTitle} auth={props.auth} logout={props.logout}  user={props.user}/>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            (
              <Polls
                loading={props.loading}
                user={props.user}
                polls={props.polls}
                fetchPolls={props.fetchPolls}
                status='PUBLISHED'
              />
            )
          }
        />
        <Route
          exact
          path="/login"
          render={routerProps => <Login
            auth={props.auth}
            login={props.login}
            currentUser={props.currentUser}
            loading={props.loading}
            {...routerProps}
          />}
        />
        <Route
          exact
          path="/polls"
          render={
            routerProps => props.auth ?
            <Polls
              loading={props.loading}
              user={props.user}
              polls={props.polls}
              fetchPolls={props.fetchPolls}
            /> :
              <Redirect to={{pathname: '/', state: {from: props.location}}}/>
          }
        />
        <Route
          exact
          path="/poll/new"
          render={
            routerProps => props.auth ?
              <NewPoll
                createPoll={props.createPoll}
                token={props.token}
                loading={props.loading}
                user={props.user}
                {...routerProps}
              /> :
              <Redirect to={{pathname: '/', state: {from: props.location}}}/>
          }
        />
        <Route
          exact
          path="/poll/:id"
          render={
            routerProps => (<Poll
              token={props.token}
              updatePoll={props.updatePoll}
              fetchPoll={props.fetchPoll}
              user={props.user}
              poll={props.polls.filter(poll => poll._id === routerProps.match.params.id)[0]}
              {...routerProps}
            />)
          }
        />
        <Route
          exact
          path="/poll/:id/edit"
          render={
            routerProps => {
              return props.auth ?
              <EditPoll
                token={props.token}
                updatePoll={props.updatePoll}
                deletePoll={props.deletePoll}
                fetchPoll={props.fetchPoll}
                user={props.user}
                poll={props.polls.filter(poll => poll._id === routerProps.match.params.id)[0]}
                {...routerProps}
              /> :
              <Redirect to={{pathname: '/', state: {from: props.location}}}/>
            }
          }
        />
      </Switch>
      {props.snackbar}
    </MuiThemeProvider>
  </BrowserRouter>
};

Vote.propTypes = {
  title: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  auth: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  currentUser: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  polls: PropTypes.array.isRequired,
  fetchPolls: PropTypes.func.isRequired,
  createPoll: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  snackbar: PropTypes.object.isRequired,
  updatePoll: PropTypes.func.isRequired,
  fetchPoll: PropTypes.func.isRequired,
  deletePoll: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  title: state.title,
  pageTitle: state.pageTitle,
  auth: state.auth,
  user: state.user.data,
  polls: state.polls.data,
  token: state.token,
  snackbar: state.snackbar
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: LOGOUT, token: '' }),
  login: token => dispatch({ type: LOGIN, data: { token } }),
  currentUser: user => dispatch({ type: FETCH_CURRENT_USER, data: user }),
  loading: (loading, key) => dispatch({ type: LOADING, data: { loading, key } }),
  fetchPolls: polls => dispatch({ type: FETCH_POLLS, data: polls }),
  fetchPoll: poll => dispatch({ type: FETCH_POLL, data: poll }),
  createPoll: poll => dispatch({ type: CREATE_POLL, data: poll }),
  updatePoll: poll => dispatch({ type: UPDATE_POLL, data: poll }),
  deletePoll: poll => dispatch({ type: DELETE_POLL, data: poll }),
});

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Vote);

export default App;
