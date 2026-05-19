import { useEffect, useState }
from "react";

import JobCard
from "./JobCard";

import {
  getSavedJobs
} from "../../api/jobApi";

function SavedJobs() {

  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // ======================================
  // Fetch Saved Jobs
  // ======================================
  useEffect(() => {

    const fetchJobs =
      async () => {

        try {

          setLoading(true);

          const response =
            await getSavedJobs();

          console.log(response);

          setJobs(
            response.data || []
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchJobs();

  }, []);

  return (

    <div>

      {/* ========================= */}
      {/* Title */}
      {/* ========================= */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          Saved Jobs
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your bookmarked jobs
        </p>
      </div>

      {/* ========================= */}
      {/* Loading */}
      {/* ========================= */}
      {loading && (

        <div className="text-center text-cyan-400 text-lg mt-20">
          Loading saved jobs...
        </div>
      )}

      {/* ========================= */}
      {/* Jobs Grid */}
      {/* ========================= */}
      {!loading &&
        jobs.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {jobs.map((job) => (

              <JobCard
                key={job._id}

                job={{

                  // Existing DB fields
                  ...job,

                  // Normalize for JobCard
                  logo:
                    job.logoUrl,

                  employmentType:
                    job.employmentType,

                  // Saved state
                  saved: true,

                  savedJobId:
                    job._id
                }}
              />
            ))}
          </div>
        )}

      {/* ========================= */}
      {/* Empty State */}
      {/* ========================= */}
      {!loading &&
        jobs.length === 0 && (

          <div className="text-center mt-20">

            <h2 className="text-2xl font-semibold text-white">
              No Saved Jobs
            </h2>

            <p className="text-slate-400 mt-3">
              Save jobs to access them later
            </p>
          </div>
        )}
    </div>
  );
}

export default SavedJobs;