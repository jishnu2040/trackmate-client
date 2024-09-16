import React, { useContext, useState, useEffect } from 'react';
import api from '../api/services/axiosInstance';
import ThemeContext from '../ThemeContext';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify components

const Modal = ({ closeModal }) => {
  const { isModalOpen, taskId } = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchTaskDetails = async () => {
      if (taskId) {
        try {
          const response = await api.get(`tasks/${taskId}/`);
          const { title, description, status } = response.data;
          setTitle(title);
          setDescription(description);
          setStatus(status);
          
        } catch (error) {
          setError(error.response?.data?.detail || error.message);
          toast.error('Failed to fetch task details.'); // Show error toast
        }
      } else {
        setTitle('');
        setDescription('');
        setStatus(false);
      }
    };

    if (isModalOpen) {
      fetchTaskDetails();
    }
  }, [taskId, isModalOpen]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('user_id'); // Assuming user_id is stored in localStorage
    const taskData = { title, description, status, user: userId };
    window.location.reload();

    try {
      if (taskId) {
        const result = await api.put(`tasks/${taskId}/`, taskData);
        toast.success('Task updated successfully!');

      } else {
        await api.post('tasks/', taskData);
        toast.success('Task created successfully!'); // Show success toast
      }

      closeModal();
    } catch (error) {
      setError(error.response?.data?.detail || error.message);
      toast.error('Failed to save task.'); // Show error toast
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-60">
      <div className="bg-white text-black dark:bg-gray-700 rounded-lg p-6 w-full max-w-md">
        <ToastContainer /> {/* Include ToastContainer in your modal */}
        <h2 className="text-xl font-semibold mb-4">
          {taskId ? 'Edit Task' : 'Add New Task'}
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-2">Task Title</label>
            <input
              type="text"
              id="title"
              className="w-full border border-gray-300 p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-2">Task Description</label>
            <textarea
              id="description"
              className="w-full border border-gray-300 p-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
              />
              <span className="ml-2">Completed</span>
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {taskId ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
