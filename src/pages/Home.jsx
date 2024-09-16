import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router';

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const token = localStorage.getItem('access'); // Check for a token in localStorage
    if (!token) {
      navigate('/login'); // Redirect to login if no token is found
    }
  }, [navigate]); // Include navigate in the dependency array

  return (
    <div className="flex flex-col lg:flex-row h-screen gap-4">
      <div className="w-full lg:w-1/6 border border-gray-500 rounded-lg lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <SideBar />
      </div>
      <div className="w-full lg:w-5/6 border border-gray-500 rounded-lg p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
