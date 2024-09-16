import React, { useContext, useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import api from '../api/services/axiosInstance';
import ThemeContext from '../ThemeContext';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify

const Card = ({ home, filter }) => {
  const { openModal } = useContext(ThemeContext);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch tasks from the API
  const fetchTasks = async (page = 1) => {
    try {
      const response = await api.get(`tasks/?page=${page}`);
      setTasks(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10)); // Assuming page size is 10
      setCurrentPage(page);
    } catch (error) {
      toast.error('Failed to fetch tasks. Please try again later.');
      console.error('Fetch tasks error:', error);
    }
  };

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage]);

  // Add or Edit Task function
  const handleModalClose = async () => {
    await fetchTasks(currentPage); // Refresh task list after adding/editing a task
    toast.success('Task added/edited successfully!'); // Show success toast
  };

  const handleEdit = (taskId) => {
    openModal(taskId, handleModalClose);
    // Pass handleModalClose as callback
  };

  // Delete Task function
  const handleDelete = async (taskId) => {
    try {
      await api.delete(`tasks/${taskId}/`);
      setTasks(tasks.filter(task => task.id !== taskId)); // Remove task from list
      toast.success('Task deleted successfully!'); // Show success toast
    } catch (error) {
      toast.error('Failed to delete task. Please try again later.'); // Show error toast
      console.error('Delete task error:', error);
    }
  };

  // Toggle Task Status function (Complete/Incomplete)
  const handleToggleStatus = async (task) => {
    try {
      await api.put(`tasks/${task.id}/`, {
        title: task.title,
        description: task.description,
        status: !task.status,
        user: task.user // Ensure the user field is included if required
      });
      fetchTasks(currentPage); // Refresh task list
      toast.success('Task status updated successfully!'); // Show success toast
    } catch (error) {
      toast.error('Failed to update task status. Please try again later.'); // Show error toast
      console.error('Toggle task status error:', error);
    }
  };

  // Filter tasks based on the filter prop
  const filteredTasks = filter !== undefined ? tasks.filter(task => task.status === filter) : tasks;

  // Pagination Controls
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <ToastContainer /> {/* Include ToastContainer in your component */}

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="shadow-md p-4 rounded-lg flex flex-col justify-between border border-gray-300"
          >
            <h3 className="text-lg font-semibold mb-2">{task.title}</h3>

            <div className="mb-4">
              <p className="overflow-hidden text-ellipsis" style={{ maxHeight: '5em' }}>
                {task.description}
              </p>
            </div>

            <div className="flex justify-between items-center mt-auto">
              {/* Completion status button */}
              <button
                onClick={() => handleToggleStatus(task)}
                className={`px-4 py-2 rounded-md text-white ${task.status ? 'bg-green-500' : 'bg-red-400'}`}
              >
                {task.status ? 'Complete' : 'Incomplete'}
              </button>

              <div className="flex space-x-2">
                {/* Edit button */}
                <button onClick={() => handleEdit(task.id)} className="cursor-pointer">
                  <FaEdit size={20} />
                </button>

                {/* Delete button */}
                <button onClick={() => handleDelete(task.id)} className="hover:text-red-700 cursor-pointer">
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {home && (
          <button
            onClick={() => openModal(null, handleModalClose)} // Pass null and handleModalClose callback
            className="shadow-md p-4 rounded-lg flex flex-col items-center justify-center border bg-gray-700 border-gray-500 transition-transform transform hover:scale-105 cursor-pointer"
            key="add-new-task"
          >
            <IoIosAddCircle className="text-4xl mb-4" />
            <h1 className='text-lg font-semibold text-center'>Add New Task</h1>
          </button>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Previous
        </button>
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Card;
