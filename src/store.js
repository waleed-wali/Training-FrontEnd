import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './components/users/usersSlice';
import { authReducer } from './components/Login/LoginSlices';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
  },
});

export default store;
