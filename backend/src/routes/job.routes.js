// routes/job.routes.js

import { Router } from "express";

import {
    searchJobs,
    getRecommendedJobs,
    saveJob,
    getSavedJobs,
    deleteSavedJob,
    updateJobStatus,
    getSavedJobsCount
} from "../controllers/job.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


// Search Jobs
router.route("/search").get(verifyJWT, searchJobs);

// recomended jobs
router.route("/recommended")
.post(
    verifyJWT,
    getRecommendedJobs
);


// Save Job
router.route("/save").post(verifyJWT, saveJob);


// Get Saved Jobs
router.route("/saved").get(verifyJWT, getSavedJobs);


// Count saved Jobs
router.route("/saved/count").get(verifyJWT, getSavedJobsCount);


// Delete Saved Job
router.route("/:id").delete(verifyJWT, deleteSavedJob);


// 🔄 Update Job Status
router.route("/:id/status").patch(verifyJWT, updateJobStatus);


export default router;