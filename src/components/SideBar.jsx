import React, { useContext } from 'react';
import ThemeContext from '../ThemeContext';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const data = [
    { title: 'All Tasks', link: '/' },
    { title: 'Favourite Tasks', link: '/favouritetasks' },
    { title: 'Completed Tasks', link: '/completetasks' },
    { title: 'Incomplete Tasks', link: '/incompletetasks' },
  ];

  return (
    <div className="p-4">
      {/* User Info Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Jishnuraj</h2>
        <h4 className="font-light text-gray-400">aara@gmail.com</h4>
        <hr className={`my-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} />
      </div>

      {/* Task Menu */}
      <nav className="mb-6 space-y-4">
        {data.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className={`block p-2 rounded-lg hover:font-semibold transition-colors ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
          >
            {item.title}
          </Link>
        ))}
      </nav>

      {/* Theme Toggle and Logout */}
      <div className="space-y-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full"
        >
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
        <button className="bg-red-500 w-full p-2 rounded-lg text-white hover:bg-red-600 transition">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
