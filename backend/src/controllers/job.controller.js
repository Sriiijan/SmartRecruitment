import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SavedJob } from "../models/savedJob.models.js";
import { Resume } from "../models/resume.models.js";



// Search Jobs
const searchJobs = asyncHandler(async (req, res) => {

    const { q, country = "in", page = 1 } = req.query;

    if (!q) {
        throw new ApiError(400, "Search query is required");
    }

    const options = {
        method: "GET",

        url: "https://jsearch.p.rapidapi.com/search-v2",

        params: {
            query: q,
            page: page.toString(),
            num_pages: "1",
            country,
            date_posted: "all"
        },

        headers: {
            "x-rapidapi-key": process.env.RAPIDAPI_KEY,
            "x-rapidapi-host": "jsearch.p.rapidapi.com",
            "Content-Type": "application/json"
        }
    };

    const response = await axios.request(options);

    const formattedJobs = response.data.data.jobs.map((job) => ({
        jobId: job.job_id,
        title: job.job_title,
        company: job.employer_name,
        logo: job.employer_logo,
        location: job.job_location,
        employmentType: job.job_employment_type,
        isRemote: job.job_is_remote,
        applyLink: job.job_apply_link,
        description: job.job_description,
        salary: job.job_salary_string,
        postedAt: job.job_posted_at,
        source: job.job_publisher
    }));

    return res.status(200).json(
        new ApiResponse(
            200,
            formattedJobs,
            "Jobs fetched successfully"
        )
    );
});


// Get Recommended Jobs By Selected Resume
const getRecommendedJobs = asyncHandler(async (req, res) => {

    // =========================
    // Get resumeId from frontend
    // =========================
    const { resumeId } = req.body;

    if (!resumeId) {
        throw new ApiError(
            400,
            "Resume ID is required"
        );
    }

    // =========================
    // Find selected resume
    // =========================
    const selectedResume = await Resume.findOne({
        _id: resumeId,
        userId: req.user?._id
    });

    if (!selectedResume) {
        throw new ApiError(
            404,
            "Resume not found"
        );
    }

    // =========================
    // Get skills
    // =========================
    const skills = selectedResume.skills;

    if (!skills || skills.length === 0) {
        throw new ApiError(
            400,
            "No skills found in resume"
        );
    }

    // =========================
    // Generate search query
    // =========================
    const query =
        skills.slice(0, 5).join(" ") + " developer";

    console.log("Generated Query:", query);

    // =========================
    // JSearch API
    // =========================
    const options = {

        method: "GET",

        url: "https://jsearch.p.rapidapi.com/search-v2",

        params: {
            query,
            page: "1",
            num_pages: "1",
            country: "in",
            date_posted: "all"
        },

        headers: {
            "x-rapidapi-key":
                process.env.RAPIDAPI_KEY,

            "x-rapidapi-host":
                "jsearch.p.rapidapi.com",

            "Content-Type":
                "application/json"
        }
    };

    const response =
        await axios.request(options);

    // =========================
    // Format jobs
    // =========================
    const formattedJobs =
        response.data.data.jobs.map((job) => ({

            jobId: job.job_id,

            title: job.job_title,

            company: job.employer_name,

            logo: job.employer_logo,

            location: job.job_location,

            employmentType:
                job.job_employment_type,

            isRemote:
                job.job_is_remote,

            applyLink:
                job.job_apply_link,

            salary:
                job.job_salary_string,

            postedAt:
                job.job_posted_at,

            source:
                job.job_publisher
        }));


    return res.status(200).json(

        new ApiResponse(
            200,
            {
                query,
                skills,
                jobs: formattedJobs
            },
            "Recommended jobs fetched successfully"
        )
    );
});


// Save Job
const saveJob = asyncHandler(async (req, res) => {

    const {

      jobId,

      title,

      company,

      logo,

      location,

      employmentType,

      isRemote,

      applyLink,

      salary,

      postedAt,

      source,

      description

    } = req.body;

    // =========================
    // Validation
    // =========================
    if (
      !jobId ||
      !title ||
      !company ||
      !applyLink
    ) {

      throw new ApiError(
        400,
        "Required fields missing"
      );
    }

    // =========================
    // Prevent duplicate save
    // =========================
    const existingJob =
      await SavedJob.findOne({

        userId:
          req.user?._id,

        jobId
      });

    if (existingJob) {

      throw new ApiError(
        400,
        "Job already saved"
      );
    }

    // =========================
    // Save Job
    // =========================
    const savedJob =
      await SavedJob.create({

        userId:
          req.user?._id,

        jobId,

        title,

        company,

        logoUrl: logo,

        location,

        employmentType,

        isRemote,

        applyLink,

        salary,

        postedAt,

        source,

        description
      });

    return res.status(201).json(

      new ApiResponse(
        201,
        savedJob,
        "Job saved successfully"
      )
    );
});


// Get Saved Jobs
const getSavedJobs = asyncHandler(async (req, res) => {

    const jobs = await SavedJob.find({
        userId: req.user?._id
    }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            jobs,
            "Saved jobs fetched successfully"
        )
    );
});

// Get Saved Jobs Count
const getSavedJobsCount = asyncHandler(
  async (req, res) => {

    // Count saved jobs
    const count =
      await SavedJob.countDocuments({

        userId: req.user?._id
      });

    // Response
    return res.status(200).json(

      new ApiResponse(
        200,
        {
          count
        },
        "Saved jobs count fetched successfully"
      )
    );
  }
);


// Delete Saved Job
const deleteSavedJob = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const job = await SavedJob.findById(id);

    if (!job) {
        throw new ApiError(404, "Saved job not found");
    }

    // ownership check
    if (job.userId.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    await SavedJob.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Saved job deleted successfully"
        )
    );
});



// Update Job Status
const updateJobStatus = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const { status } = req.body;

    const allowedStatus = [
        "saved",
        "applied",
        "interview",
        "rejected"
    ];

    if (!allowedStatus.includes(status)) {
        throw new ApiError(400, "Invalid status");
    }

    const job = await SavedJob.findById(id);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    // ownership check
    if (job.userId.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    job.status = status;

    if (status === "applied") {
        job.appliedAt = new Date();
    }

    await job.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            job,
            "Job status updated successfully"
        )
    );
});



export {
    searchJobs,
    getRecommendedJobs,
    saveJob,
    getSavedJobs,
    getSavedJobsCount,
    deleteSavedJob,
    updateJobStatus
};