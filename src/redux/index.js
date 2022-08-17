// @packages
import { configureStore } from '@reduxjs/toolkit';

// @own
import confirmationModal from './confirmationModal';
import notification from './notification';

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
    },
  });

  thunkArguments.store = store;
  return store;
};

export default createStore();
