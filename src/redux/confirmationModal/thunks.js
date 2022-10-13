// @packages
import { createAsyncThunk } from '@reduxjs/toolkit';

// @own
import { openConfirmationModal } from 'redux/confirmationModal';
import {
  selectConfirmationModalIsConfirmed,
  selectConfirmationModalIsDeclined,
} from 'redux/confirmationModal/selectors';

export const openConfirmationModalThunk = createAsyncThunk(
  'confirmationModal/openConfirmationModal',
  async (payload, thunkApi) => {
    const {
      dispatch,
      extra: { store },
    } = thunkApi;

    dispatch(openConfirmationModal(payload));

    return new Promise((resolve) => {
      const unsubscribe = store.subscribe(() => {
        const state = store.getState();

        if (selectConfirmationModalIsConfirmed(state)) {
          unsubscribe();
          resolve(true);
        }

        if (selectConfirmationModalIsDeclined(state)) {
          unsubscribe();
          resolve(false);
        }
      });
    });
  }
);
