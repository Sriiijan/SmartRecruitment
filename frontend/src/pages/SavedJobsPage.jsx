import Sidebar
from "../components/Sidebar";

import DashboardHeader
from "../components/dashboard/DashboardHeader";

import JobsHeader
from "../components/job/JobHeader";

import SavedJobs
from "../components/job/SavedJobs";

function SavedJobsPage() {

  return (

    <div className="flex bg-slate-950 min-h-screen">

      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main */}
      <div className="flex-1 p-8 overflow-y-auto">


        {/* Jobs Header */}
        <JobsHeader />

        {/* Saved Jobs Component */}
        <SavedJobs />
      </div>
    </div>
  );
}

export default SavedJobsPage;