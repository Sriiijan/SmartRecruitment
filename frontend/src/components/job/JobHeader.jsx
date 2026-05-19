import {
  Search,
  Sparkles,
  Bookmark
} from "lucide-react";

import {
  Link,
  useLocation
} from "react-router-dom";

function JobsHeader() {

  const location =
    useLocation();

  return (

    <div className="mb-10">

      {/* Title */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-white">
          Jobs
        </h1>

        <p className="text-slate-400 mt-2">
          Search, save, and discover
          AI-powered job recommendations
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 overflow-x-auto">

        {/* Search */}
        <Link
          to="/jobs"
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300
            
            ${
              location.pathname ===
              "/jobs"

                ? "bg-cyan-500 text-black"

                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }
          `}
        >

          <Search size={20} />

          Search Jobs
        </Link>

        {/* Recommended */}
        <Link
          to="/recommended-jobs"
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300
            
            ${
              location.pathname ===
              "/recommended-jobs"

                ? "bg-cyan-500 text-black"

                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }
          `}
        >

          <Sparkles size={20} />

          Recommended
        </Link>

        {/* Saved */}
        <Link
          to="/saved-jobs"
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300
            
            ${
              location.pathname ===
              "/saved-jobs"

                ? "bg-cyan-500 text-black"

                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }
          `}
        >

          <Bookmark size={20} />

          Saved Jobs
        </Link>
      </div>
    </div>
  );
}

export default JobsHeader;