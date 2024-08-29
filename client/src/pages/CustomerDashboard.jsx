import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CustomerDashboard.css";

const Dashboard = () => {
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/customer/dashborad/jobs"
        );
        setAllJobs(res.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <h2>All Jobs</h2>
      {allJobs.length === 0 ? (
        <p>No job posted</p>
      ) : (
        <div className="jobs-grid">
          {allJobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
