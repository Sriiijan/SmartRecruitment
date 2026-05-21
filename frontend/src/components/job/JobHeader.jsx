// JobHeader.jsx

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

    <div className="mb-8 sm:mb-10">

      {/* Title */}
      <div className="mb-6 sm:mb-8">

        <h1
          className="
            text-2xl
            sm:text-3xl
            md:text-4xl
            font-bold
            text-white
            leading-tight
          "
        >
          Jobs
        </h1>

        <p
          className="
            text-slate-400
            mt-2
            text-sm
            sm:text-base
            leading-relaxed
            max-w-2xl
          "
        >
          Search, save, and discover
          AI-powered job recommendations
        </p>

      </div>

      {/* Tabs */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-3
          w-full
        "
      >

        {/* Search Jobs */}
        <Link
          to="/jobs"

          className={`
            flex items-center justify-center
            gap-2 sm:gap-3

            w-full

            px-4 sm:px-5 md:px-6
            py-3

            rounded-xl sm:rounded-2xl

            font-medium
            text-sm sm:text-base

            transition-all duration-300
            
            ${
              location.pathname === "/jobs"

                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"

                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }
          `}
        >

          <Search
            size={18}
            className="flex-shrink-0"
          />

          <span>
            Search Jobs
          </span>

        </Link>

        {/* Recommended */}
        <Link
          to="/recommended-jobs"

          className={`
            flex items-center justify-center
            gap-2 sm:gap-3

            w-full

            px-4 sm:px-5 md:px-6
            py-3

            rounded-xl sm:rounded-2xl

            font-medium
            text-sm sm:text-base

            transition-all duration-300
            
            ${
              location.pathname === "/recommended-jobs"

                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"

                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }
          `}
        >

          <Sparkles
            size={18}
            className="flex-shrink-0"
          />

          <span>
            Recommended
          </span>

        </Link>

        {/* Saved Jobs */}
        <Link
          to="/saved-jobs"

          className={`
            flex items-center justify-center
            gap-2 sm:gap-3

            w-full

            px-4 sm:px-5 md:px-6
            py-3

            rounded-xl sm:rounded-2xl

            font-medium
            text-sm sm:text-base

            transition-all duration-300
            
            ${
              location.pathname === "/saved-jobs"

                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"

                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }
          `}
        >

          <Bookmark
            size={18}
            className="flex-shrink-0"
          />

          <span>
            Saved Jobs
          </span>

        </Link>

      </div>

    </div>
  );
}

export default JobsHeader;