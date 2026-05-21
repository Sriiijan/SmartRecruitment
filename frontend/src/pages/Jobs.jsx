import { useState } from "react";
import JobHeader from "../components/job/JobHeader";
import JobSearch from "../components/job/JobSearch";
import SavedJobsPage from "./SavedJobsPage";
import RecommendedJobsPage from "./RecommendedJobsPage";

function JobsPage() {

  const [activeTab, setActiveTab] =
    useState("search");

  return (

    <div className="bg-slate-950 min-h-screen">

      {/* Main */}
      <div className="p-4 sm:p-6 md:p-8 overflow-y-auto">

        {/* Jobs Header */}
        <JobHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Tab Content */}
        <div className="mt-6 sm:mt-8">

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

    </div>
  );
}

export default JobsPage;