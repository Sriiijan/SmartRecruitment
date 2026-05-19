import {
  MapPin,
  Briefcase,
  Clock,
  ExternalLink,
  Building2,
  Bookmark,
} from "lucide-react";

import { useState } from "react";

import { saveJob, deleteSavedJob } from "../../api/jobApi";

function JobCard({ job }) {

  const [saved, setSaved] = useState(job?.saved || false);

const [savedJobId, setSavedJobId] = useState(job?.savedJobId || null);

const [loading, setLoading] = useState(false);

  // ======================================
  // Handle Save/Delete Job
  // ======================================
  const handleSaveJob = async () => {

    try {

      setLoading(true);

      // =========================
      // DELETE SAVED JOB
      // =========================
      if (saved && savedJobId) {

        await deleteSavedJob(
          savedJobId
        );

        setSaved(false);

        setSavedJobId(null);

        return;
      }

      // =========================
      // SAVE JOB
      // =========================
      const jobData = {

        jobId: job.jobId,

        title: job.title,

        company: job.company,

        logo: job.logo,

        location: job.location,

        employmentType:
          job.employmentType,

        isRemote:
          job.isRemote,

        applyLink:
          job.applyLink,

        salary:
          job.salary,

        postedAt:
          job.postedAt,

        source:
          job.source,

        description:
          job.title
      };

      const response =
        await saveJob(jobData);

      console.log(response);

      setSaved(true);

      setSavedJobId(
        response.data._id
      );

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Action failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500 transition-all duration-300 shadow-lg h-full flex flex-col justify-between">

      {/* Top */}
      <div>

        <div className="flex items-start gap-4">

          {/* Logo */}
          <img
            src={
              job.logo ||
              "https://via.placeholder.com/60"
            }
            alt={job.company}
            className="w-16 h-16 rounded-xl object-cover bg-white p-1"
          />

          {/* Info */}
          <div className="flex-1">

            <div className="min-h-[120px]">

              <h2 className="text-2xl font-semibold text-white leading-snug line-clamp-4">
                {job.title}
              </h2>

              <div className="flex items-center gap-2 text-slate-400 mt-3">

                <Building2 size={16} />

                <span>
                  {job.company}
                </span>
              </div>
            </div>
          </div>

          {/* Remote */}
          {job.isRemote && (

            <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full whitespace-nowrap">
              Remote
            </span>
          )}
        </div>

        {/* Details */}
        <div className="mt-6 space-y-4">

          <div className="flex items-center gap-3 text-slate-300">

            <MapPin size={18} />

            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-300">

            <Briefcase size={18} />

            <span>
              {job.employmentType}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300">

            <Clock size={18} />

            <span>
              {job.postedAt ||
                "Recently posted"}
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6 flex flex-wrap gap-2">

          {["React", "Node.js", "JavaScript"].map(
            (skill, index) => (

              <span
                key={index}
                className="bg-cyan-500/10 text-cyan-400 text-sm px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between">

        {/* Source */}
        <span className="text-sm text-slate-500">
          via {job.source}
        </span>

        {/* Buttons */}
        <div className="flex items-center gap-3">

          {/* Save */}
          <button
            onClick={handleSaveJob}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300
              
              ${
                saved
                  ? "bg-red-500 text-white hover:bg-red-400"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }
            `}
          >

            <Bookmark size={18} />

            {loading
              ? "Please wait..."
              : saved
              ? "Remove"
              : "Save"}
          </button>

          {/* Apply */}
          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-2 rounded-xl transition-all duration-300"
          >
            Apply

            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default JobCard;