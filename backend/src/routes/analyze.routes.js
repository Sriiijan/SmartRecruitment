import { Router }
from "express";

import {
  analyzeResume
} from "../controllers/analyze.controller.js";

import {
  verifyJWT
} from "../middlewares/auth.middleware.js";

const router = Router();

// ======================================
// Analyze Resume with JD
// ======================================
router.route("/")
.post(
  verifyJWT,
  analyzeResume
);

export default router;