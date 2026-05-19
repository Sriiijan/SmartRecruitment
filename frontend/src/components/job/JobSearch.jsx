import { useState } from "react";

import Sidebar from "../Sidebar";

import JobCard from "../job/JobCard";
import JobSearchBar from "../job/JobSearchBar";

import { searchJobs } from "../../api/jobApi";

function JobSearch() {

  const [jobs, setJobs] = useState([]);

  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);

  // Fetch Jobs
  const fetchJobs = async () => {

  if (!query.trim()) return;

  try {

    setLoading(true);

    const response =
      await searchJobs(query);

    setJobs(response.data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);
  }
};



  return (

    <div className="flex bg-slate-950 min-h-screen">

      {/* Main */}
      <div className="flex-1 p-10">

        {/* Heading */}
        <div>

          <h1 className="text-5xl font-bold text-white">
            Job Search
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Discover AI-powered job opportunities.
          </p>

        </div>

        {/* Search */}
        <div className="mt-10">

          <JobSearchBar
            query={query}
            setQuery={setQuery}
            handleSearch={fetchJobs}
          />

        </div>

        {/* Jobs */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-12">

          {
            loading ? (

              <p className="text-white">
                Loading jobs...
              </p>

            ) : jobs.length > 0 ? (

              jobs.map((job, index) => (
                <JobCard
                  key={index}
                  job={job}
                />
              ))

            ) : (

              <p className="text-slate-400 text-lg">
                Search for jobs to get started.
              </p>

            )
          }

        </div>

      </div>
    </div>
  );
}

export default JobSearch;