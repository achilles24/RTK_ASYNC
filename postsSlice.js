// postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  status: 'idle', // or 'loading', 'succeeded', 'failed'
  error: null,
};

// Async thunk for fetching posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    throw error;
  }
});

// Async thunk for adding a new post
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(initialPost),
  });
  if (!response.ok) {
    throw new Error('Failed to add post');
  }
  const data = await response.json();
  return data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Handling addNewPost
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(action.payload); // Assuming API returns the newly added post
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;

// Exporting actions for use in components
export const { } = postsSlice.actions;
