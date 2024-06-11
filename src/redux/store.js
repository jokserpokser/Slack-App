import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';

const store = configureStore({
  reducer: {
    chat: chatReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true
    })
});

export default store;
