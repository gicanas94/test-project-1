// @packages
import { configureStore } from '@reduxjs/toolkit';

// @own
import confirmationModal from './confirmationModal';
import notification from './notification';
import request from './request';

const createStore = () => {
  const thunkArguments = {};

  const customizedMiddleware = (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: thunkArguments,
      },
    });

  const store = configureStore({
    middleware: customizedMiddleware,
    reducer: {
      confirmationModal,
      notification,
      request,
    },
  });

  thunkArguments.store = store;
  return store;
};

export default createStore();
