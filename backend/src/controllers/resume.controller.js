import fs from "fs";
import pdf from "pdf-parse-new";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary, uploadResumeOnCloudinary } from "../utils/cloudinary.js";
import { Resume } from "../models/resume.models.js";
import { extractSkills } from "../utils/extractSkills.js";



// ======================================
// Upload Resume
// ======================================
const addResume = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new ApiError(400, "Resume file is required");
    }

    const resumeLocalPath = req.file.path;

    // Get title from request body
    let title = req.body.title?.trim();

    // If title is empty, use file name (without extension)
    if (!title) {
        title = path.parse(req.file.originalname).name;
    }

    // Extract PDF text
    let extractedText = "";

    try {
        const dataBuffer = fs.readFileSync(resumeLocalPath);
        const pdfData = await pdf(dataBuffer);
        extractedText = pdfData.text;
    } catch (error) {
        throw new ApiError(400, "Unable to parse PDF");
    }

    const skills = extractSkills(extractedText);

    const uploadedResume = await uploadResumeOnCloudinary(resumeLocalPath);

    if (!uploadedResume?.secure_url) {
        throw new ApiError(400, "Error uploading resume");
    }

    const resume = await Resume.create({
        userId: req.user._id,
        title,
        resumeUrl: uploadedResume.secure_url,
        originalName: req.file.originalname,
        extractedText,
        skills,
    });

    return res.status(201).json(
        new ApiResponse(201, resume, "Resume uploaded successfully")
    );
});



// ======================================
// Get User Resumes
// ======================================
const getUserResumes = asyncHandler(async (req, res) => {

    const resumes = await Resume.find({
        userId: req.user?._id
    }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            resumes,
            "Resumes fetched successfully"
        )
    );
});



// ======================================
// Delete Resume
// ======================================
const deleteResume = asyncHandler(async (req, res) => {

    const resume = await Resume.findById(
        req.params.id
    );

    if (!resume) {
        throw new ApiError(404, "Resume not found");
    }

    // ownership check
    if (
        resume.userId.toString() !==
        req.user?._id.toString()
    ) {
        throw new ApiError(
            403,
            "Unauthorized to delete this resume"
        );
    }

    await Resume.findByIdAndDelete(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Resume deleted successfully"
        )
    );
});

const getResumeCount = asyncHandler(async (req, res) => {

    const count = await Resume.countDocuments({
        userId: req.user._id
    });

    res.status(200).json({
        success: true,
        count
    });
});





export {
    addResume,
    getUserResumes,
    deleteResume,
    getResumeCount
};