import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/CustomerDashboard.css";

const Dashboard = () => {
  const [allJobs, setAllJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/customer/dashboard/jobs",
          {
            withCredentials: true,
          }
        );
        // console.log(res.data);
        setAllJobs(res.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", {}, {
        withCredentials: true,
      });
      localStorage.removeItem("authToken");
      localStorage.removeItem("userType");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="logout-button-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
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
