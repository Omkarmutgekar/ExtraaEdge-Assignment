// // redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import usersReducer from './reducers/usersSlice';
// import avatarsReducer from './reducers/avatarsSlice';

// const store = configureStore({
//   reducer: {
//     users: usersReducer,
//     avatars: avatarsReducer,
//   },
// });

// export default store;
// store.js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../redux/Slices/usersSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
