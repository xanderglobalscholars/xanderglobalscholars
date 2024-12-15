import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import ResetPassword from "./components/Auth/ResetPassword";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Example protected route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div>Welcome to the Dashboard!</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
