import express from "express"
import { jobDetails, myjobs, postJob, updateJob } from "../controllers/jobController.js";

const router = express.Router();

router.get("/myjobs",myjobs)
router.post("/post",postJob);
router.put("/edit/:id",updateJob)
router.put("/job/:id",jobDetails)

export default router;