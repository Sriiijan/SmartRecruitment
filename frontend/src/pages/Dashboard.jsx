// Dashboard.jsx

import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import { fetchResumeCount } from "../api/resumeApi";
import { getSavedJobsCount } from "../api/jobApi";

import DashboardResume from "../components/dashboard/DashboardResume";

function Dashboard() {

  const { user } = useAuth();

  const [resumeCount, setResumeCount] = useState(0);

  const [savedJobCount, setSavedJobCount] = useState(0);

  // Resume Count
  useEffect(() => {

    const loadResumeCount = async () => {

      try {

        const data = await fetchResumeCount();

        setResumeCount(data.count);

      } catch (error) {

        console.log(error);
      }
    };

    loadResumeCount();

  }, []);

  // Saved Jobs Count
  useEffect(() => {

    const loadSavedJobsCount = async () => {

      try {

        const response =
          await getSavedJobsCount();

        setSavedJobCount(
          response.data.count
        );

      } catch (error) {

        console.log(error);
      }
    };

    loadSavedJobsCount();

  }, []);

  return (

    <div className="bg-slate-950 min-h-screen">

      {/* Main Content */}
      <div className="p-4 sm:p-6 md:p-10">

        {/* Welcome */}
        <div className="mt-4 sm:mt-6">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">

            Welcome,
            <span className="text-cyan-400">
              {" "}
              {user?.fullName}
            </span>

          </h1>

          <p className="text-slate-400 mt-3 text-sm sm:text-base md:text-lg">

            Your AI recruitment dashboard is ready.

          </p>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mt-10 sm:mt-14">

          {/* Uploaded Resumes */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8">

            <h2 className="text-white text-xl sm:text-2xl font-semibold">
              Uploaded Resumes
            </h2>

            <p className="text-4xl sm:text-5xl font-bold text-cyan-400 mt-5">
              {resumeCount}
            </p>

          </div>

          {/* Saved Jobs */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8">

            <h2 className="text-white text-xl sm:text-2xl font-semibold">
              Saved Jobs
            </h2>

            <p className="text-4xl sm:text-5xl font-bold text-cyan-400 mt-5">
              {savedJobCount}
            </p>

          </div>

          {/* ATS Score */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8">

            <h2 className="text-white text-xl sm:text-2xl font-semibold">
              ATS Score
            </h2>

            <p className="text-4xl sm:text-5xl font-bold text-cyan-400 mt-5">
              92%
            </p>

          </div>

        </div>

        {/* Recent Resumes */}
        <div className="mt-10 sm:mt-14">
          <DashboardResume />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;