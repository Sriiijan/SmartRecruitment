import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { fetchResumeCount } from "../api/resumeApi";
import { useEffect } from "react";
import DashboardResume from "../components/dashboard/DashboardResume";
import { getSavedJobsCount } from "../api/jobApi";

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
      }
      catch (error) {
        console.log(error);
      }
    };
    loadResumeCount();

  }, []);

  // Saved Jobs Count
  useEffect(() => {

    const loadSavedJobsCount =
      async () => {

        try {

          const response =
            await getSavedJobsCount();

          console.log(response);

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
    <div className="flex bg-slate-950 min-h-screen">

      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <div className="flex-1 p-10">

        {/* Header */}
        {/* <DashboardHeader /> */}

        {/* Welcome Section */}
        <div className="mt-10">

          <h1 className="text-5xl font-bold text-white">
            Welcome,
            <span className="text-cyan-400">
              {" "}
              {user?.fullName}
            </span>
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Your AI recruitment dashboard is ready.
          </p>

        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-14">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h2 className="text-white text-2xl font-semibold">
              Uploaded Resumes
            </h2>

            <p className="text-5xl font-bold text-cyan-400 mt-5">
              {resumeCount}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h2 className="text-white text-2xl font-semibold">
              Saved Jobs
            </h2>

            <p className="text-5xl font-bold text-cyan-400 mt-5">
              {savedJobCount}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h2 className="text-white text-2xl font-semibold">
              ATS Score
            </h2>

            <p className="text-5xl font-bold text-cyan-400 mt-5">
              92%
            </p>
          </div>

        </div>
        <div className="mt-14"><DashboardResume /></div>
      </div>
      
    </div>
    
  );
}

export default Dashboard;