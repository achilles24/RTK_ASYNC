// store.js or index.js
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice'; // Import your reducer(s) here

const store = configureStore({
  reducer: {
    posts: postsReducer, // Add your reducer(s) to the root reducer
    // Add other reducers as needed
  },
});

export default store;
