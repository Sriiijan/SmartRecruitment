import { useEffect, useState, useRef } from "react";

import Sidebar
from "../../components/Sidebar";

import {
  Sparkles
} from "lucide-react";

import {
  getUserResumes
} from "../../api/resumeApi";

import AnalyzeResult
from "./AnalyzeResult";
import { analyzedScore } from "../../api/analyzeApi";

function AnalyzeResumeJD() {

  const [resumes, setResumes] =
    useState([]);

  const [selectedResume,
    setSelectedResume] =
    useState("");

  const [jobDescription,
    setJobDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [analysisResult,
    setAnalysisResult] =
    useState(null);

  const resultRef = useRef(null);

  setTimeout(() => {
    resultRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);

  // ======================================
  // Fetch resumes
  // ======================================
  useEffect(() => {

    const loadResumes =
      async () => {

        try {

          const data =
            await getUserResumes();

          setResumes(
            data.data
          );

        } catch (error) {

          console.log(error);
        }
      };

    loadResumes();

  }, []);

  // ======================================
  // Analyze Resume
  // ======================================
  const handleAnalyze = async () => {

  try {

    // Validation
    if (!selectedResume) {
      alert("Please select a resume");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter job description");
      return;
    }

    setLoading(true);

    // API CALL
    const response = await analyzedScore(
      selectedResume,
      jobDescription
    );

    console.log(response);

    // Store backend result
    setAnalysisResult(response.data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);
  }
};

  return (

    <div className="flex bg-[#020817] min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 p-10 overflow-y-auto">

        {/* ====================================== */}
        {/* Heading */}
        {/* ====================================== */}
        <div>

          <h1 className="text-5xl font-bold text-white">
            Analyze Resume
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Match your resume against
            a job description using AI.
          </p>
        </div>

        {/* ====================================== */}
        {/* Main Card */}
        {/* ====================================== */}
        <div className="mt-12 bg-slate-900 border border-slate-800 rounded-3xl p-10">

          {/* Resume Selection */}
          <div>

            <label className="text-white text-lg font-semibold mb-3 block">

              Select Resume
            </label>

            <select
              value={selectedResume}

              onChange={(e) =>
                setSelectedResume(
                  e.target.value
                )
              }

              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-500"
            >

              <option value="">
                Choose Resume
              </option>

              {
                resumes.map(
                  (resume) => (

                    <option
                      key={resume._id}

                      value={
                        resume._id
                      }
                    >
                      {
                        resume.title
                      }
                    </option>
                  )
                )
              }
            </select>
          </div>

          {/* ====================================== */}
          {/* Job Description */}
          {/* ====================================== */}
          <div className="mt-8">

            <label className="text-white text-lg font-semibold mb-3 block">

              Paste Job Description
            </label>

            <textarea
              rows={10}

              value={
                jobDescription
              }

              onChange={(e) =>
                setJobDescription(
                  e.target.value
                )
              }

              placeholder="Paste the job description here..."

              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none resize-none focus:border-cyan-500"
            />
          </div>

          {/* ====================================== */}
          {/* Button */}
          {/* ====================================== */}
          <div className="mt-8">

            <button

              onClick={
                handleAnalyze
              }

              disabled={loading}

              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 disabled:opacity-50"
            >

              <Sparkles size={22} />

              {
                loading

                  ? "Analyzing..."

                  : "Analyze Resume"
              }
            </button>
          </div>
        </div>

        {/* ====================================== */}
        {/* Results */}
        {/* ====================================== */}
        {
          analysisResult && (
            <div ref={resultRef}>
              <AnalyzeResult
                result={analysisResult}
              />
            </div>
          )
        }
      </div>
    </div>
  );
}

export default AnalyzeResumeJD;