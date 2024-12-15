import React, { useEffect, useState } from "react";
import { fetchDashboardData } from "../utils/fetchData";

interface DashboardData {
  totalApplications: number;
  pendingApplications: number;
  approvedScholarships: number;
}

const DashboardWidgets: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadDashboardData = async () => {
    setLoading(true);
    const result = await fetchDashboardData();
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Failed to load data. Please try again.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          onClick={loadDashboardData}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {/* Widget 1 */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Total Applications</h3>
        <p className="text-4xl font-bold mt-2">{data.totalApplications}</p>
      </div>
      {/* Widget 2 */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Pending Applications</h3>
        <p className="text-4xl font-bold mt-2">{data.pendingApplications}</p>
      </div>
      {/* Widget 3 */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Approved Scholarships</h3>
        <p className="text-4xl font-bold mt-2">{data.approvedScholarships}</p>
      </div>
    </div>
  );
};

export default DashboardWidgets;
