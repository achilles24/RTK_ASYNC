// PostList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, addNewPost, updatePost, deletePost } from './postsSlice';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddPost = () => {
    const newPost = {
      title: 'New Post Title',
      body: 'New Post Body',
      userId: 1, // Example userId
    };
    dispatch(addNewPost(newPost));
  };

  const handleUpdatePost = (postId) => {
    const updatedPost = {
      id: postId,
      title: 'Updated Post Title',
      body: 'Updated Post Body',
    };
    dispatch(updatePost(updatedPost));
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Posts</h2>
      <button onClick={handleAddPost}>Add New Post</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => handleUpdatePost(post.id)}>Update</button>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
