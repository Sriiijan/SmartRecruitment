import Sidebar from "../components/Sidebar";

import DashboardHeader
from "../components/dashboard/DashboardHeader";

import JobsHeader
from "../components/job/JobHeader";

import RecommendedJobs
from "../components/job/RecommendedJobs";

function RecommendedJobsPage() {

  return (

    <div className="flex bg-slate-950 min-h-screen">

      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main */}
      <div className="flex-1 p-8 overflow-y-auto">

        {/* Jobs Header */}
        <JobsHeader />

        {/* Recommended Jobs */}
        <RecommendedJobs />
      </div>
    </div>
  );
}

export default RecommendedJobsPage;