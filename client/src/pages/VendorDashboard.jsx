import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/VendorDashboard.css";

const VendorDashboard = () => {
  const [vendorJobs, setVendorJobs] = useState([]);

  useEffect(() => {
    const fetchVendorJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/vendor/dashboard/myjobs",
          {
            withCredentials: true,
          }
        );
        setVendorJobs(res.data.jobs); // Adjust this line if the response structure is different
      } catch (error) {
        console.log("Failed to fetch jobs", error);
      }
    };

    fetchVendorJobs();
  }, []);

  return (
    <div className="vendor-dashboard-container">
      <h2>Dashboard</h2>
      <h3>All Jobs</h3>
      <Link to="/vendor/dashboard/post" className="post-job-button">
        Post
      </Link>
      <div className="jobs-list">
        {vendorJobs.length === 0 ? (
          <p>No job posted</p>
        ) : (
          vendorJobs.map((job) => (
            <div key={job._id} className="job-card">
              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <Link
                to={`/vendor/dashboard/job/${job._id}`}
                className="view-job-link"
              >
                View Job
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
