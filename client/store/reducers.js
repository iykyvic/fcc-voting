import {
  LOGIN,
  LOGOUT,
  FETCH_CURRENT_USER,
  LOADING,
  FETCH_POLLS,
  FETCH_POLL,
  CREATE_POLL,
  API_CALL_STATUS,
  UPDATE_POLL,
  DELETE_POLL
} from './actions';
import { defaultState } from './storeConfiguration';

export const rootReducer = (prevState = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...prevState, auth: true, token: action.data.token };
    case LOGOUT:
      return { ...defaultState, polls: prevState.polls };
    case API_CALL_STATUS:
      return { ...prevState, snackbar: action.data.component };
    case FETCH_CURRENT_USER:
      return { ...prevState, user: action.data }
    case LOADING:
      const { loading, key } = action.data;
      const newState = { ...prevState };
      newState[key].loading = loading;
      return newState;
    case FETCH_POLLS:
      return { ...prevState, polls: action.data };
    case FETCH_POLL:
      const { polls: { data: allPolls } } = prevState;
      const position = allPolls
        .map((poll, index) => (poll._id === action.data._id ? index : null))
        .filter(index => index !== null)[0];
      if(position) {
        return { ...prevState };
      }
      return { ...prevState, poll: action.data, polls: { data: [action.data, ...prevState.polls.data] } };
    case CREATE_POLL:
      return { ...prevState, polls: { data: [action.data, ...prevState.polls.data] } };
    case UPDATE_POLL:
      const { polls: { data: polls } } = prevState;
      const index = polls
      .map((poll, index) => (poll._id === action.data._id ? index : null))
      .filter(index => index !== null)[0];
      const newPolls = [...polls];
      newPolls[index] = action.data;
      return { ...prevState, polls: { data: newPolls.filter(poll => poll !== null) } };
    case DELETE_POLL:
      const { polls: { data: thePolls } } = prevState;
      const pollIndex = thePolls
      .map((poll, index) => (poll._id === action.data._id ? index : null))
      .filter(index => index !== null)[0];
      const theNewPolls = [...thePolls];
      delete theNewPolls[pollIndex];
      return { ...prevState, polls: { data: theNewPolls.filter(poll => poll !== null) } };
    default:
      return prevState;
  }
};

