import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    user: null,
    token: null,
    errors: {},
    users: [],
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: state => {
      state.isAuth = false;
      state.user = null;
      state.token = null;
    },
    adduser: (state, action) => {
      state.users.push(action.payload);
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearErrors: state => {
      state.errors = {};
    },
  },
});
export const { loginSuccess, logout, setErrors, adduser, clearErrors } = authSlice.actions;
export const authReducer = authSlice.reducer;
