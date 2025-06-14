import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    toast: {
      message: '',
      type: 'info',
      pos: '',
    },
  },
  reducers: {
    setToast: (state, action) => {
      state.toast = action.payload;
    },
    clearToast: (state) => {
      state.toast = {
        message: '',
        type: 'info',
      };
    },
  },
});

export const { setToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
