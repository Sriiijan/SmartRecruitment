import { Router } from "express";
import { addResume, getUserResumes, deleteResume, getResumeCount } from "../controllers/resume.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Upload Resume
router.post(
    "/add-resume",
    verifyJWT,
    upload.single("resume"),
    addResume
);

// Get All User Resumes
router.get(
    "/",
    verifyJWT,
    getUserResumes
);

router.delete("/delete/:id",
    verifyJWT,
    deleteResume
);

router.get(
    "/count",
    verifyJWT,
    getResumeCount
);

export default router;