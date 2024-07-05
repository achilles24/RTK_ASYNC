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

// Async thunk for updating a post
export const updatePost = createAsyncThunk('posts/updatePost', async (updatedPost) => {
  const { id, ...rest } = updatedPost;
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rest),
  });
  if (!response.ok) {
    throw new Error('Failed to update post');
  }
  const data = await response.json();
  return data;
});

// Async thunk for deleting a post
export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete post');
  }
  return postId;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    // Handling fetchPosts
    [fetchPosts.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    // Handling addNewPost
    [addNewPost.pending]: (state) => {
      state.status = 'loading';
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.posts.push(action.payload); // Assuming API returns the newly added post
    },
    [addNewPost.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    // Handling updatePost
    [updatePost.pending]: (state) => {
      state.status = 'loading';
    },
    [updatePost.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      const updatedPost = action.payload;
      const existingPostIndex = state.posts.findIndex(post => post.id === updatedPost.id);
      if (existingPostIndex !== -1) {
        state.posts[existingPostIndex] = updatedPost;
      }
    },
    [updatePost.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    // Handling deletePost
    [deletePost.pending]: (state) => {
      state.status = 'loading';
    },
    [deletePost.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    [deletePost.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default postsSlice.reducer;

// Exporting actions for use in components
export const { } = postsSlice.actions;
