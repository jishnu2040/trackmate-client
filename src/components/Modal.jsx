import React, { useState } from 'react';
import api from '../api/services/axiosInstance';

const Modal = ({ isOpen, closeModal, refreshTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false); // Default: Incomplete (false)
  const [error, setError] = useState(null);  // For error handling

  if (!isOpen) return null; // If modal is not open, don't render anything

  const submitHandler = async (taskData) => {
    // Retrieve user_id from localStorage
    const userId = localStorage.getItem('user_id');
    
    // Add user_id to taskData
    const taskDataWithUserId = { ...taskData, user: userId };

    try {
      const response = await api.post('tasks/', taskDataWithUserId); // Use Axios instance for API call
      console.log('Task created:', response.data);

      // Refresh the task list after successfully creating a task
      if (refreshTasks) {
        refreshTasks();
      }
      
      // Reset state variables
      setTitle('');
      setDescription('');
      setStatus(false);
      setError(null);
      
      closeModal(); // Close modal after submission

    } catch (error) {
      setError(error.response?.data?.detail || error.message); // Display specific error message
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitHandler({ title, description, status }); // Pass status along with title and description
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-60">
      <div className="bg-white dark:bg-gray-700 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Task</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 text-black rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 text-black rounded-lg"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value === 'true')} // Set status based on selection
              className="w-full p-2 border border-gray-300 text-black rounded-lg"
              required
            >
              <option value="false">Incomplete</option>
              <option value="true">Complete</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
