import Job from "../models/jobModel.js";

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json({
    success: true,
    jobs,
  });
};

export const myjobs = async (req, res) => {
  const user = req.user;

  const myJobs = await Job.find({ postedBy: user._id });
  res.status(200).json({ success: true, myJobs });
};

export const postJob = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all required fields" });
    }
    const jobPostedBy = req.user._id;

    const job = await Job.create({ title, description, postedBy: jobPostedBy });

    res.status(200).json({
      success: true,
      message: "Job Posted successfully",
      job,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to post job", error });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const isJobExist = await Job.findById(id);
    if (!isJobExist) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Job Updated successfully",
      updatedJob,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update job", error });
  }
};
