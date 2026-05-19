import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { getUserResumes } from "../../api/resumeApi";

function DashboardResume() {
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        const loadResumes = async () => {
        try {
            const data = await getUserResumes();
            // Latest 3 resumes
            setResumes(data.data.slice(0, 3));
        }
        catch (error) {
            console.log(error);
        }
        };

    loadResumes();
  }, []);

  return (
    <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-3xl px-8 py-5">
      {/* Recent Resumes */}
      <div className="mt-12 bg-slate-900/60 border border-slate-800 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Recent Resumes</h2>
        </div>

        <div className="space-y-5">
          {resumes.length > 0 ? (
            resumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 hover:scale-[1.01]"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div className="bg-cyan-500/10 p-4 rounded-2xl">
                    <FileText size={28} className="text-cyan-400" />
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-semibold">
                      {resume.originalName}
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {resume.skills?.slice(0, 50).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-cyan-500/10 text-cyan-400 text-xs px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* <p className="text-slate-400 text-sm mt-1">
                        Uploaded Resume
                    </p> */}

                    <p className="text-slate-500 text-xs mt-1">
                      {new Date(resume.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex gap-3">
                  <a
                    href={resume.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-xl transition"
                    className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-white px-5 py-2 rounded-xl transition-all duration-300"
                  >
                    View
                  </a>

                  <a
                    href={resume.resumeUrl}
                    download
                    className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2 rounded-xl transition"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
              <p className="text-slate-400 text-lg">No resumes uploaded yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardResume;
