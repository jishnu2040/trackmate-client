import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import { IoIosAddCircle } from "react-icons/io";
import api from '../api/services/axiosInstance';

const Card = ({ home, openModal }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await api.get('tasks/');
      setTasks(response.data.results);  // Updated to access 'results' from API response
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Edit Task function
  const handleEdit = (task) => {
    openModal(task); // Pass the task to the modal for editing
  };

  // Star/Unstar Task function
  const handleStar = async (task) => {
    try {
      await api.patch(`tasks/${task.id}/`, { is_starred: !task.is_starred });
      fetchTasks();  // Update the tasks list
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete Task function
  const handleDelete = async (taskId) => {
    try {
      await api.delete(`tasks/${taskId}/`);
      setTasks(tasks.filter(task => task.id !== taskId));  // Update the tasks list after deletion
    } catch (error) {
      setError(error.message);
    }
  };

  // Toggle Task Status function (Complete/Incomplete)
  const handleToggleStatus = async (task) => {
    try {
      // Toggle the status in the task object
      const updatedTask = { ...task, status: !task.status };

      // Update the backend
      await api.patch(`tasks/${task.id}/`, { status: updatedTask.status });

      // Update the tasks list with the updated task status
      setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="shadow-md p-4 rounded-lg flex flex-col justify-between border border-gray-300"
          >
            <h3 className="text-lg font-semibold mb-2">{task.title}</h3>

            <div className="mb-4">
              <p className="overflow-hidden text-ellipsis" style={{ maxHeight: '6em' }}>
                {task.description}
              </p>
            </div>

            <div className="flex justify-between items-center mt-auto">
              {/* Completion status button */}
              <button
                onClick={() => handleToggleStatus(task)}  // Call the function to toggle task status
                className={`px-4 py-2 rounded-md text-white ${task.status ? 'bg-green-500' : 'bg-red-400'}`}
              >
                {task.status ? 'Complete' : 'Incomplete'}
              </button>

              {/* Icon buttons */}
              <div className="flex space-x-2">
                {/* Edit button */}
                <button onClick={() => handleEdit(task)} className="cursor-pointer">
                  <FaEdit size={20} />
                </button>

                {/* Star/Unstar button */}
                <button onClick={() => handleStar(task)} className={`cursor-pointer ${task.is_starred ? 'text-yellow-700' : ''}`}>
                  <FaStar size={20} />
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
            onClick={openModal}
            className="shadow-md p-4 rounded-lg flex flex-col items-center justify-center border border-gray-300 transition-transform transform hover:scale-105 cursor-pointer"
            key="add-new-task"
          >
            <IoIosAddCircle className="text-4xl mb-4" />
            <h1 className='text-lg font-semibold text-center'>Add New Task</h1>
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
