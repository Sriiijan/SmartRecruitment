import Sidebar from "../components/Sidebar";

import ResumeUpload from "../components/resume/ResumeUpload";

function UploadResumePage() {

  return (

    <div
      className="
        flex
        bg-slate-950
        min-h-screen
        overflow-x-hidden
      "
    >

      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <div
        className="
          flex-1
          flex
          items-center
          justify-center
          px-4
          sm:px-6
          md:px-10
          py-6
          sm:py-10
        "
      >

        <ResumeUpload />

      </div>

    </div>
  );
}

export default UploadResumePage;