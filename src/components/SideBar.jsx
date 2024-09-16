import React, { useContext } from 'react';
import ThemeContext from '../ThemeContext';
import { Link } from 'react-router-dom';
import { FaTasks, FaStar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io'; 
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'; 

const SideBar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  // Fetch username and email from localStorage
  const username = localStorage.getItem('username') || 'User';
  const email = localStorage.getItem('email') || 'email@example.com';

  const data = [
    { title: 'All Tasks', link: '/', icon: <FaTasks /> },
    { title: 'Favourite Tasks', link: '/favouritetasks', icon: <FaStar /> },
    { title: 'Completed Tasks', link: '/completetasks', icon: <FaCheckCircle /> },
    { title: 'Incomplete Tasks', link: '/incompletetasks', icon: <FaTimesCircle /> },
  ];

  return (
    <div className="flex flex-col justify-between h-full rounded-lg p-4 bg-gray-100 dark:bg-gray-900">

      <div className="mb-6">
        <h2 className="text-xl font-semibold">{username}</h2>
        <h4 className="font-light text-gray-400">{email}</h4>
        <hr className={`my-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} />
      </div>

      <nav className="mb-6 space-y-3">
        {data.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className={`flex items-center space-x-2 p-2 rounded-lg hover:font-semibold transition-colors ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Section: Theme Toggle and Logout */}
      <div className="space-y-4">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full"
        >
          {isDarkMode ? (
            <>
              <BsFillSunFill size={18} />
              <span>Switch to Light Mode</span>
            </>
          ) : (
            <>
              <BsFillMoonFill size={18} />
              <span>Switch to Dark Mode</span>
            </>
          )}
        </button>
        
        <button className="flex items-center justify-center space-x-2 bg-red-400 p-2 rounded-lg text-white hover:bg-red-600 transition w-full">
          <IoMdLogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
