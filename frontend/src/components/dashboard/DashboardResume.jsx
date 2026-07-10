import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { getUserResumes } from "../../api/resumeApi";

function DashboardResume() {

  const [resumes, setResumes] = useState([]);

  useEffect(() => {

    const loadResumes = async () => {

      try {

        const data = await getUserResumes();

        setResumes(data.data.slice(0, 3));

      } catch (error) {

        console.log(error);
      }
    };

    loadResumes();

  }, []);

  return (

    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">

      {/* Heading */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Recent Resumes
        </h2>

      </div>

      {/* Resume List */}
      <div className="space-y-4 sm:space-y-5">

        {
          resumes.length > 0 ? (

            resumes.map((resume) => (

              <div
                key={resume._id}
                className="
                  bg-slate-900
                  border border-slate-800
                  rounded-2xl
                  p-4 sm:p-6
                  flex flex-col lg:flex-row
                  lg:items-center
                  lg:justify-between
                  gap-5
                  hover:scale-[1.01]
                  transition-all
                "
              >

                {/* Left */}
                <div className="flex gap-4">

                  <div className="bg-cyan-500/10 p-3 sm:p-4 rounded-2xl h-fit">
                    <FileText
                      size={26}
                      className="text-cyan-400"
                    />
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-white text-base sm:text-lg font-semibold break-words">
                      {resume.title}
                    </h3>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mt-3">

                      {resume.skills?.slice(0, 8).map((skill, index) => (

                        <span
                          key={index}
                          className="
                            bg-cyan-500/10
                            text-cyan-400
                            text-xs
                            px-3 py-1
                            rounded-full
                            break-words
                          "
                        >
                          {skill}
                        </span>

                      ))}

                    </div>

                    {/* Date */}
                    <p className="text-slate-500 text-xs mt-3">
                      {new Date(
                        resume.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

                  <a
                    href={resume.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      bg-cyan-500/20
                      text-cyan-400
                      hover:bg-cyan-500
                      hover:text-white
                      px-5 py-2.5
                      rounded-xl
                      transition-all duration-300
                      text-center
                      w-full sm:w-auto
                    "
                  >
                    View
                  </a>

                  <a
                    href={resume.resumeUrl}
                    download
                    className="
                      bg-slate-700
                      hover:bg-slate-600
                      text-white
                      px-5 py-2.5
                      rounded-xl
                      transition
                      text-center
                      w-full sm:w-auto
                    "
                  >
                    Download
                  </a>

                </div>

              </div>

            ))

          ) : (

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center">

              <p className="text-slate-400 text-base sm:text-lg">
                No resumes uploaded yet
              </p>

            </div>

          )
        }

      </div>

    </div>
  );
}

export default DashboardResume;