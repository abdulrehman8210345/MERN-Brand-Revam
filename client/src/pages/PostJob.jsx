import React, { useState } from "react";
import axios from "axios";
import "../styles/PostJob.css";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/vendor/post",
        { title, description },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        navigate("/vendor/dashboard");
      }
    } catch (error) {
      console.log("Failed to post job", error);
    } finally {
      toast.success(res.data.message);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="post-job-container">
      <h2>Post a Job</h2>
      <form onSubmit={handlePostJob}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="post-button">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostJob;
