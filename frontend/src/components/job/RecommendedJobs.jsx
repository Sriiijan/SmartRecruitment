import { useEffect, useState } from "react";
import {recommendedJobs} from "../../api/jobApi";
import JobCard from "../../components/job/JobCard";
import {getUserResumes} from "../../api/resumeApi";

function RecommendedJobs() {

  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [resumes, setResumes] =
    useState([]);

  const [selectedResumeId,
    setSelectedResumeId] =
    useState("");

  const [skills, setSkills] =
    useState([]);

  // Fetch resumes
  useEffect(() => {

    const loadResumes =
      async () => {

        try {

          const data =
            await getUserResumes();

          setResumes(data.data);

        } catch (error) {

          console.log(error);
        }
      };

    loadResumes();

  }, []);

  // Fetch Recommended Jobs
  const fetchRecommendedJobs =
    async () => {

      if (!selectedResumeId)
        return;

      try {

        setLoading(true);

        const response =
          await recommendedJobs(
            selectedResumeId
          );

        setJobs(
          response.data.jobs || []
        );

        setSkills(
          response.data.skills || []
        );

      } catch (error) {

        console.log(error);

        setJobs([]);

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen bg-slate-950">

      {/* Container */}
      <div className="p-4 sm:p-6 md:p-8">

        {/* Heading */}
        <div className="mb-8">

          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Recommended Jobs
          </h1>

          <p className="text-slate-400 mt-2 text-sm sm:text-base leading-relaxed">
            Get AI-powered job recommendations
            based on your selected resume
          </p>

        </div>

        {/* Resume Selection */}
        <div
          className="
            bg-slate-900
            border border-slate-800
            rounded-2xl
            p-4 sm:p-6
            mb-8
          "
        >

          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Select Resume
          </h2>

          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-4
            "
          >

            <select
              value={selectedResumeId}

              onChange={(e) =>
                setSelectedResumeId(
                  e.target.value
                )
              }

              className="
                flex-1
                bg-slate-800
                border border-slate-700
                text-white
                px-4 py-3
                rounded-xl
                outline-none
                text-sm sm:text-base
              "
            >

              <option value="">
                Choose Resume
              </option>

              {resumes.map((resume) => (

                <option
                  key={resume._id}
                  value={resume._id}
                >
                  {resume.originalName}
                </option>
              ))}

            </select>

            <button
              onClick={fetchRecommendedJobs}

              className="
                bg-cyan-500
                hover:bg-cyan-400
                text-black
                font-semibold
                px-6 py-3
                rounded-xl
                transition-all duration-300
                w-full sm:w-auto
              "
            >
              Generate
            </button>

          </div>

        </div>

        {/* Skills */}
        {skills.length > 0 && (

          <div className="mb-8">

            <h3 className="text-white font-semibold mb-3 text-sm sm:text-base">
              Detected Skills
            </h3>

            <div className="flex flex-wrap gap-2 sm:gap-3">

              {skills.map((skill, index) => (

                <span
                  key={index}

                  className="
                    bg-cyan-500/10
                    text-cyan-400
                    px-3 sm:px-4
                    py-2
                    rounded-full
                    text-xs sm:text-sm
                  "
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>
        )}

        {/* Loading */}
        {loading && (

          <div className="text-center text-cyan-400 text-base sm:text-lg mt-20">
            Loading recommended jobs...
          </div>
        )}

        {/* Jobs Grid */}
        {!loading &&
          jobs.length > 0 && (

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
                gap-4 sm:gap-6
              "
            >

              {jobs.map((job) => (

                <JobCard
                  key={job.jobId}
                  job={job}
                />
              ))}

            </div>
          )}

        {/* Empty State */}
        {!loading &&
          jobs.length === 0 && (

            <div className="text-center mt-20 px-4">

              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                No Jobs Yet
              </h2>

              <p className="text-slate-400 mt-3 text-sm sm:text-base">
                Select a resume and generate
                recommended jobs
              </p>

            </div>
          )}

      </div>

    </div>
  );
}

export default RecommendedJobs;