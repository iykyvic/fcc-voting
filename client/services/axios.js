import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import { default as axiosHttp } from 'axios';
import { store } from '../store/storeConfiguration';
import { API_CALL_STATUS, LOGOUT } from '../store/actions';

export const axiosSnackBar  = axiosHttp.create({
  baseURL: API_URL,
  timeout: 1000,
  transformResponse: [function (data) {
    let { status, message = 'successfully done' } = JSON.parse(data);

    if (/jwt/.test(message)) {
      message = 'you need to login';
      store.dispatch({ type: LOGOUT });
    }
    const handleClose = () => store.dispatch({ type: API_CALL_STATUS, data: { component: <div></div> } });

    const Snack = (props) => {
      return <Snackbar
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        open={true}
        autoHideDuration={2000}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{props.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={props.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
        onClose={props.handleClose}
      />
    };

    store.dispatch({
      type: API_CALL_STATUS,
      data: {
        component: <Snack message={message} handleClose={handleClose}/>
      }
    });

    if(status === 'fail') {
      throw new Error(message);
    }

    return JSON.parse(data);
  }]
});

const axios  = axiosHttp.create({
  baseURL: API_URL,
  timeout: 1000,
  transformResponse: [function (data) {
    let { status, message = 'successfully created' } = JSON.parse(data);

    if (/jwt/.test(message)) {
      message = 'you need to login';
      store.dispatch({ type: LOGOUT });
    }

    if(status === 'fail') {
      throw new Error(message);
    }

    return JSON.parse(data);
  }]
});

export default axios;
