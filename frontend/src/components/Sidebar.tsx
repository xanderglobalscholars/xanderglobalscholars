import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-blue-800 text-white h-full p-4">
      <h2 className="text-3xl font-bold mb-8">Xander Scholars</h2>
      <ul>
        <li className="mb-4">
          <Link to="/dashboard" className="text-lg hover:text-gray-400">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/profile" className="text-lg hover:text-gray-400">Profile</Link>
        </li>
        <li className="mb-4">
          <Link to="/applications" className="text-lg hover:text-gray-400">Applications</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
