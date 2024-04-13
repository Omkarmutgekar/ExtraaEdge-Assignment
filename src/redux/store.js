
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../redux/Slices/usersSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
