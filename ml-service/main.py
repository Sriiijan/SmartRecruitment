import re
import os
import logging
from contextlib import asynccontextmanager
from functools import lru_cache

import fitz  # PyMuPDF
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

from skills import SKILLS


# ======================================
# Config
# ======================================

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5174").split(",")
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB
ALLOWED_CONTENT_TYPES = {"application/pdf"}

SEMANTIC_WEIGHT = 0.6
SKILL_WEIGHT = 0.4


# ======================================
# Pre-compile skill patterns once
# ======================================

SKILL_PATTERNS: list[tuple[str, re.Pattern]] = [
    (skill, re.compile(r"\b" + re.escape(skill) + r"\b", re.IGNORECASE))
    for skill in SKILLS
]


# ======================================
# Lifespan: load model on startup
# ======================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Loading sentence transformer model...")
    try:
        app.state.model = SentenceTransformer("all-MiniLM-L6-v2")
        logger.info("Model loaded successfully.")
    except Exception as e:
        logger.error(f"Failed to load model: {e}")
        raise
    yield
    logger.info("Shutting down.")


# ======================================
# App Initialization
# ======================================

app = FastAPI(title="Smart Recruitment API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ======================================
# Utility Functions
# ======================================

def extract_text_from_pdf(file_bytes: bytes) -> str:
    try:
        with fitz.open(stream=file_bytes, filetype="pdf") as doc:
            return "".join(page.get_text() for page in doc).strip()
    except Exception as e:
        logger.warning(f"PDF extraction failed: {e}")
        raise HTTPException(status_code=422, detail="Could not parse the uploaded PDF file.")


def extract_skills(text: str) -> set[str]:
    lowered = text.lower()
    return {skill for skill, pattern in SKILL_PATTERNS if pattern.search(lowered)}


def validate_upload(file: UploadFile, data: bytes) -> None:
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported file type '{file.content_type}'. Only PDF is accepted.",
        )
    if len(data) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=413,
            detail=f"File exceeds the {MAX_FILE_SIZE_BYTES // (1024*1024)} MB limit.",
        )


# ======================================
# API Endpoints
# ======================================

@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...),
):
    # Validate and read file
    pdf_bytes = await file.read()
    validate_upload(file, pdf_bytes)

    # Extract text
    resume_text = extract_text_from_pdf(pdf_bytes)

    if not resume_text:
        raise HTTPException(status_code=422, detail="Resume appears to be empty or unreadable.")

    # Rule-based skill extraction
    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(job_description)

    matched_skills = resume_skills & jd_skills
    missing_skills = jd_skills - resume_skills

    skill_match_score = len(matched_skills) / len(jd_skills) if jd_skills else 0.0

    # Semantic similarity (SBERT)
    model: SentenceTransformer = app.state.model
    resume_embedding = model.encode([resume_text])
    jd_embedding = model.encode([job_description])

    # Clamp to [0, 1] — cosine similarity can be negative for dissimilar texts
    semantic_score = float(
        max(0.0, cosine_similarity(resume_embedding, jd_embedding)[0][0])
    )

    # Hybrid score
    final_score = (SEMANTIC_WEIGHT * semantic_score) + (SKILL_WEIGHT * skill_match_score)

    return {
        "semantic_match_percentage": round(semantic_score * 100, 2),
        "skill_match_percentage": round(skill_match_score * 100, 2),
        "final_match_percentage": round(final_score * 100, 2),
        "matched_skills": sorted(matched_skills),
        "missing_skills": sorted(missing_skills),
    }