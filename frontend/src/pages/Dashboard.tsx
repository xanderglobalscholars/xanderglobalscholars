import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardWidgets from "../components/DashboardWidgets";

const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <DashboardWidgets />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
