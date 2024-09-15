import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  // Function to mark task as completed
  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to remove a task
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

      {/* Input field to add a new task */}
      <div className="w-full max-w-md flex space-x-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
          placeholder="Add a new task"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </div>

      {/* Task list */}
      <ul className="w-full max-w-md">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-2 mb-2 rounded border ${
                task.completed ? "bg-green-100 border-green-300" : "bg-white border-gray-300"
              }`}
            >
              <span className={`flex-1 ${task.completed ? "line-through text-gray-500" : ""}`}>
                {task.text}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => toggleTask(index)}
                  className={`px-2 py-1 rounded ${
                    task.completed ? "bg-yellow-500 text-white" : "bg-green-500 text-white"
                  }`}
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => removeTask(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No tasks added yet.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
