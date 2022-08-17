// @packages
import { createAsyncThunk } from '@reduxjs/toolkit';

// @own
import { openConfirmationModal } from 'redux/confirmationModal';

// eslint-disable-next-line import/prefer-default-export
export const openConfirmationModalThunk = createAsyncThunk(
  'confirmationModal/openConfirmationModal',
  async (_, thunkApi) => {
    const {
      dispatch,
      extra: { store },
    } = thunkApi;

    dispatch(openConfirmationModal());

    return new Promise((resolve) => {
      const unsubscribe = store.subscribe(() => {
        const state = store.getState();

        if (state.confirmationModal.isConfirmed) {
          unsubscribe();
          resolve(true);
        }

        if (state.confirmationModal.isDeclined) {
          unsubscribe();
          resolve(false);
        }
      });
    });
  }
);
