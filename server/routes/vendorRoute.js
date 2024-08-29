import express from "express"
import { myjobs, postJob, updateJob } from "../controllers/jobController.js";

const router = express.Router();

router.get("/myjobs",myjobs)
router.post("/post",postJob);
router.put("/job/:id",updateJob)

export default router;