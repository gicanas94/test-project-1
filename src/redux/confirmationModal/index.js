// @packages
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: '',
  status: {
    confirmed: false,
    declined: false,
    open: false,
  },
  title: '',
};

const slice = createSlice({
  initialState,
  name: 'confirmationModal',
  reducers: {
    openConfirmationModal: (state, action) => {
      state.content = action.payload.content;
      state.status.confirmed = false;
      state.status.declined = false;
      state.status.open = true;
      state.title = action.payload.title;
    },
    confirmConfirmationModal: (state) => {
      state.content = '';
      state.status.confirmed = true;
      state.status.open = false;
      state.title = '';
    },
    declineConfirmationModal: (state) => {
      state.content = '';
      state.status.declined = true;
      state.status.open = false;
      state.title = '';
    },
  },
});

export const {
  confirmConfirmationModal,
  declineConfirmationModal,
  openConfirmationModal,
} = slice.actions;

export default slice.reducer;
