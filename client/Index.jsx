import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CircularProgress } from 'material-ui/Progress';
/* eslint-disable sort-imports */
import { store, persistor } from './store/storeConfiguration';
import App from './components/Vote.jsx';
import './public/scss/main.scss';

render(
  <Provider store={store}>
    <PersistGate loading={<CircularProgress thickness={7} />} persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>,
  document.getElementById('vote')
);
