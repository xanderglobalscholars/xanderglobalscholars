import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Xander Scholars Portal</h1>
      <div>
        <Link to="/dashboard" className="text-lg px-4 hover:text-gray-200">Dashboard</Link>
        <Link to="/profile" className="text-lg px-4 hover:text-gray-200">Profile</Link>
        {/* Add more links as needed */}
      </div>
    </nav>
  );
};

export default Navbar;
