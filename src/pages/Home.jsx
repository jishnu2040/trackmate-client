import React from 'react';
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router';

const Home = () => {
  return (
    <div className="flex h-[98vh] gap-4">
      {/* Sidebar Section */}
      <div className="w-1/6 border border-gray-500 rounded-lg p-4 flex flex-col justify-between  ">
        <SideBar />
      </div>

      {/* Main Content Section */}
      <div className="w-5/6 border border-gray-500 rounded-lg p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
