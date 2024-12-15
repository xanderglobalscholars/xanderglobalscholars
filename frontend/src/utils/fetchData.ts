import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Replace with your backend URL

// Fetch Dashboard Data
export const fetchDashboardData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard-data`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return null;
  }
};

// Add more API utilities here if needed
