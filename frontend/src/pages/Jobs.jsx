import { useState } from "react";

// Components
import Sidebar from "../components/Sidebar";

import DashboardHeader
from "../components/dashboard/DashboardHeader";

import JobHeader from "../components/job/JobHeader";

import JobSearch
from "../components/job/JobSearch";

import RecommendedJobs
from "../components/job/RecommendedJobs";
import SavedJobsPage from "./SavedJobsPage";
import RecommendedJobsPage from "./RecommendedJobsPage";

// import SavedJobs
// from "../components/job/SavedJobs";

function JobsPage() {

  const [activeTab, setActiveTab] =
    useState("search");

  return (

    <div className="flex bg-slate-950 min-h-screen">

      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main */}
      <div className="flex-1 p-8 overflow-y-auto">

        {/* Top Navbar
        <DashboardHeader /> */}

        {/* Jobs Header */}
        <JobHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* ========================= */}
        {/* Tab Content */}
        {/* ========================= */}

        {activeTab === "search" && (
          <JobSearch />
        )}

        {activeTab === "recommended" && (
          <RecommendedJobsPage />
        )}

        {activeTab === "saved" && (
          <SavedJobsPage />
        )}
      </div>
    </div>
  );
}

export default JobsPage;