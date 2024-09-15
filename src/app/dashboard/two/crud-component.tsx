'use client';
import { useState } from 'react';
import axiosInstance, { endpoints } from '../../../utils/axios';

const CreatePost = () => {
  const [name, setName] = useState('');
  const [createdById, setCreatedById] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axiosInstance.post(endpoints.post.create, {
        name,
        createdById,
      });

      if (response.status !== 201) {
        throw new Error('Failed to create post');
      }

      const newPost = response.data;
      setSuccess(`Post created successfully with ID: ${newPost.id}`);
      setName('');
      setCreatedById('');
    } catch (err) {
      setError('Failed to create post');
      console.error('Error creating post:', err);
    }
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Post Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="createdById">Created By ID:</label>
          <input
            type="text"
            id="createdById"
            value={createdById}
            onChange={(e) => setCreatedById(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default CreatePost;
