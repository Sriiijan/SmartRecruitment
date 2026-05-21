import axios from "axios";
import FormData from "form-data";
import { Resume } from "../models/resume.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const FASTAPI_URL = process.env.FASTAPI_URL ?? "http://127.0.0.1:8000";
const FASTAPI_TIMEOUT_MS = 120_000;

// ======================================
// Analyze Resume
// ======================================

const analyzeResume = asyncHandler(async (req, res) => {
    const { resumeId, jobDescription } = req.body;

    // =========================
    // Validation
    // =========================
    if (!resumeId || !jobDescription) {
        throw new ApiError(400, "Resume ID and Job Description are required");
    }

    // =========================
    // Find Resume
    // =========================
    const resume = await Resume.findById(resumeId);

    if (!resume) {
        throw new ApiError(404, "Resume not found");
    }

    console.log("resumeUrl:", resume.resumeUrl);

    if (!resume.resumeUrl) {
        throw new ApiError(422, "Resume does not have an associated file URL");
    }

    // =========================
    // Download PDF from Cloudinary
    // =========================
    let pdfBuffer;
    try {
        const pdfResponse = await axios.get(resume.resumeUrl, {
            responseType: "arraybuffer",
            timeout: FASTAPI_TIMEOUT_MS,
        });
        pdfBuffer = Buffer.from(pdfResponse.data);
    } catch (err) {
    console.error("Cloudinary fetch failed:");
    console.error("  status :", err.response?.status);
    console.error("  code   :", err.code);          // e.g. ECONNREFUSED, ETIMEDOUT
    console.error("  message:", err.message);
    throw new ApiError(502, "Failed to download resume file from storage");
}

    // =========================
    // Build FormData and call FastAPI
    // =========================
    const formData = new FormData();

    formData.append("file", pdfBuffer, {
        filename: resume.originalName || "resume.pdf",
        contentType: "application/pdf",
    });

    formData.append("job_description", jobDescription);

    let analysisData;
    try {
        const { data } = await axios.post(
            `${FASTAPI_URL}/analyze`,
            formData,
            {
                headers: formData.getHeaders(),
                maxBodyLength: Infinity,
                timeout: FASTAPI_TIMEOUT_MS,
            }
        );
        analysisData = data;
    } catch (error) {
        console.log("FULL ERROR:", error);
        console.log("ERROR MESSAGE:", error.message);
        console.log("ERROR RESPONSE:", error.response?.data);

        throw new ApiError(
            503,
            "Analysis service is currently unavailable"
        );
    }

    // =========================
    // Increment Analysis Count (only on success)
    // =========================
    resume.analysisCount += 1;
    await resume.save();

    // =========================
    // Response
    // =========================
    return res.status(200).json(
        new ApiResponse(200, analysisData, "Resume analyzed successfully")
    );
});

export { analyzeResume };