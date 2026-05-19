import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import DashboardHeader
from "../components/dashboard/DashboardHeader";

import JobsHeader
from "../components/job/JobsHeader";

function JobsLayout() {

  return (

    <div className="flex bg-slate-950 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 p-8 overflow-y-auto">

        Top Header
        <DashboardHeader />

        {/* Jobs Header */}
        <JobsHeader />

        {/* Dynamic Content */}
        <Outlet />
      </div>
    </div>
  );
}

export default JobsLayout;