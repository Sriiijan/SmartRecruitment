import Sidebar from "../components/Sidebar";

import ResumeUpload from "../components/resume/ResumeUpload";

function UploadResumePage() {

  return (

    <div className="flex bg-slate-950 min-h-screen">

      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-10">

        <ResumeUpload />

      </div>

    </div>
  );
}

export default UploadResumePage;