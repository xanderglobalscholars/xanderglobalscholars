import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get('/api/applications', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredApplications = applications.filter((app) =>
    app.studentName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Search by Student Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date Applied</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map((app) => (
            <tr key={app.id}>
              <td className="border p-2">{app.studentName}</td>
              <td className="border p-2">{app.status}</td>
              <td className="border p-2">{app.dateApplied}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable;
