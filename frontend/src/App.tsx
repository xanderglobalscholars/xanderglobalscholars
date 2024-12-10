import React from "react";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold">Welcome to Xander Global Scholars</h1>
        <p className="text-lg">Manage your student journey effortlessly!</p>
      </div>
    </div>
  );
};

export default App;
