import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './components/users/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
