import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditPage.css";

const EditJob = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState({ title: "", description: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/vendor/dashboard/job/${jobId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setJob(res.data.job);
        } else {
          setError("Failed to fetch job details");
        }
      } catch (error) {
        setError("Failed to fetch job details");
        console.error("Error fetching job details:", error);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/vendor/dashboard/edit/${jobId}`,
        job,
        { withCredentials: true }
      );
      if (res.data.success) {
        navigate("/vendor/dashboard");
      } else {
        setError("Failed to update job");
      }
    } catch (error) {
      setError("Failed to update job");
      console.error("Error updating job:", error);
    }
  };

  return (
    <div className="edit-job-container">
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Job Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={job.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Job Description:</label>
          <textarea
            id="description"
            name="description"
            value={job.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
