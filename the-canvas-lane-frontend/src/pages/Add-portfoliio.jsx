import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext'; // Import useAuth to access the token

const AddPortfolio = () => {
  const { token } = useAuth(); // Access the token from AuthContext
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    toolsUsed: '',
    media: null,
  });
  const [status, setStatus] = useState(null);

  // Input handler for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // File handler for media input
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      media: e.target.files,
    }));
  };

  // Submit handler for creating a portfolio
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.media || !token) {
      setStatus('Error: Media files or session token is missing.');
      return;
    }

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('tags', formData.tags);
    form.append('toolsUsed', formData.toolsUsed);
    Array.from(formData.media).forEach((file) => {
      form.append('media', file);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/portfolios/create`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        setStatus('Portfolio created successfully!');
        console.log('Portfolio created:', response.data);
      } else {
        setStatus(`Error creating portfolio: ${response.data.message}`);
      }
    } catch (error) {
      setStatus('An error occurred during file upload.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Create a Portfolio</h1>
      {status && <p className={`text-center ${status.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>{status}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Portfolio Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">Tags (comma-separated):</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="toolsUsed" className="block text-gray-700 font-bold mb-2">Tools Used:</label>
          <input
            type="text"
            id="toolsUsed"
            name="toolsUsed"
            value={formData.toolsUsed}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="media" className="block text-gray-700 font-bold mb-2">Upload Media (Images/Videos):</label>
          <input
            type="file"
            id="media"
            name="media"
            multiple
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Portfolio
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPortfolio;
