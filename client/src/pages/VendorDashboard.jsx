import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/VendorDashboard.css";

const VendorDashboard = () => {
  const [vendorJobs, setVendorJobs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendorJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/vendor/dashboard/myjobs",
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setVendorJobs(res.data.myJobs); // Ensure this matches your response structure
        } else {
          setError("Failed to fetch jobs");
        }
      } catch (error) {
        setError("Failed to fetch jobs");
        console.error("Failed to fetch jobs", error);
      }
    };

    fetchVendorJobs();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("authToken");
      localStorage.removeItem("userType");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="vendor-dashboard-container">
      <div className="header">
        <h2>Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h3>All Jobs</h3>
      <Link to="/vendor/dashboard/post" className="post-job-button">
        Post
      </Link>
      <div className="jobs-list">
        {error && <p>{error}</p>}
        {vendorJobs.length === 0 ? (
          <p>No job posted</p>
        ) : (
          vendorJobs.map((job) => (
            <div key={job._id} className="job-card">
              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <Link
                to={`/vendor/dashboard/edit/${job._id}`}
                className="edit-job-link"
              >
                Edit Job
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
