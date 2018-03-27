import React from 'react';
import { createStore } from 'redux';
import { rootReducer } from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage';

export const defaultState = {
  title: 'FCC VOTING',
  pageTitle: 'home',
  auth: false,
  token: '',
  user: {
    data: {
      displayName: 'Anonymous User',
      emails: [],
      photos: [{ value: '' }],
      id: null
    },
    loading: false,
    error: false
  },
  polls: {
    data: [],
    loading: false,
    error: false
  },
  snackbar: <div></div>
};

const devMode = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
export const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, defaultState, devMode);
export const persistor = persistStore(store);
