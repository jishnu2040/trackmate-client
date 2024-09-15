import React, { useState } from 'react';
import { FaEdit, FaTrash, FaStar, FaPlus } from 'react-icons/fa';

const Card = () => {
  // Dummy data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "This task involves completing the initial setup for the project. Ensure that all necessary dependencies are installed and the environment is correctly configured. This includes setting up the development server, configuring build tools, and creating initial components.",
      isComplete: false,
    },
    {
      id: 2,
      title: "Task 2",
      description: "Conduct a thorough review of the project's requirements and specifications. Document any ambiguities or questions and schedule a meeting with the stakeholders to clarify these points. This task will ensure that all team members are aligned with the project goals and deliverables.",
      isComplete: false,
    },
    {
      id: 3,
      title: "Task 3",
      description: "Implement the core features of the application as specified in the project requirements. This includes developing the main user interface components, setting up state management, and integrating any necessary APIs. Make sure to write tests for each feature to ensure functionality and stability.",
      isComplete: false,
    },
    {
      id: 4,
      title: "Task 4",
      description: "Perform comprehensive testing of the application to identify and fix any bugs or issues. This includes unit testing, integration testing, and user acceptance testing. Ensure that the application performs well under different conditions and meets the quality standards set by the project.",
      isComplete: false,
    },
    {
      id: 5,
      title: "Task 5",
      description: "Prepare the application for deployment by configuring the production environment and setting up necessary deployment scripts. This involves optimizing the codebase, setting up build processes, and ensuring that the application is secure and performs well in a production setting.",
      isComplete: false,
    },
  ]);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="shadow-md p-4 rounded-lg flex flex-col justify-between border border-gray-300"
          >
            {/* Title */}
            <h3 className="text-lg font-semibold mb-2">{task.title}</h3>

            {/* Description */}
            <div className="mb-4">
              <p className="overflow-hidden text-ellipsis" style={{ maxHeight: '6em' }}>
                {task.description}
              </p>
            </div>

            {/* Bottom section with status and icons */}
            <div className="flex justify-between items-center mt-auto">
              {/* Completion status */}
              <button
                className={`px-4 py-2 rounded-md text-white ${
                  task.isComplete ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {task.isComplete ? 'Complete' : 'Incomplete'}
              </button>

              {/* Icon buttons */}
              <div className="flex space-x-2">
                <button className=" cursor-pointer">
                  <FaEdit size={20} />
                </button>
                <button className=" hover:text-yellow-700 cursor-pointer">
                  <FaStar size={20} />
                </button>
                <button className=" hover:text-red-700 cursor-pointer">
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Task Card */}
        <div
          className="shadow-md p-4 rounded-lg flex flex-col items-center justify-center border border-gray-300 transition-transform transform hover:scale-105 cursor-pointer"
          key="add-new-task"
        >
          <FaPlus className="text-4xl mb-4" />
          <h1 className='text-lg font-semibold text-center'>Add New Task</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
