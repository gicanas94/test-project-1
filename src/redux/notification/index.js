// @packages
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'notification',
  initialState: {},
  reducers: {
    openNotification: (state, action) => {
      state.duration = action.payload.duration;
      state.message = action.payload.message;
      state.open = true;
      state.type = action.payload.type;
    },
    closeNotification: (state) => {
      state.open = false;
    },
  },
});

export const { openNotification, closeNotification } = slice.actions;
export default slice.reducer;
