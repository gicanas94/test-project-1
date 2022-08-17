// @packages
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isConfirmed: false,
  isDeclined: false,
  isOpened: false,
};

const slice = createSlice({
  initialState,
  name: 'confirmationModal',
  reducers: {
    openConfirmationModal: (state) => {
      state.isConfirmed = false;
      state.isDeclined = false;
      state.isOpened = true;
    },
    confirmConfirmationModal: (state) => {
      state.isConfirmed = true;
      state.isOpened = false;
    },
    declineConfirmationModal: (state) => {
      state.isDeclined = true;
      state.isOpened = false;
    },
  },
});

export const {
  confirmConfirmationModal,
  declineConfirmationModal,
  openConfirmationModal,
} = slice.actions;

export default slice.reducer;
