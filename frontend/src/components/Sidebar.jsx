import {
  LayoutDashboard,
  Upload,
  BriefcaseBusiness,
  User,
  LogOut,
  Sparkles,
  X,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
  Link
} from "react-router-dom";

import { useAuth }
from "../context/AuthContext";

function Sidebar({
  openSidebar,
  setOpenSidebar
}) {

  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {

    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if (!confirmLogout) return;

    logout();

    navigate("/login");

    setOpenSidebar(false);
  };

  return (

    <>
      {/* Overlay */}
      {
        openSidebar && (

          <div
            onClick={() =>
              setOpenSidebar(false)
            }

            className="
              fixed
              inset-0

              bg-black/50

              z-40

              md:hidden
            "
          />
        )
      }

      {/* Sidebar */}
      <div
        className={`
          fixed
          top-0
          left-0

          h-screen
          w-72

          bg-slate-900
          border-r border-slate-800

          overflow-y-auto

          flex
          flex-col  

          z-50

          transform
          transition-transform
          duration-300
          ease-in-out

          ${
            openSidebar
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >

        {/* Header */}
        <Link
          to="/"
          
          className="
            h-16

            flex
            items-center
            justify-between

            px-6

            border-b
            border-slate-800
          "
        >

          <h1 className="text-2xl font-bold text-white">

            Smart

            <span className="text-cyan-400">
              Recruitment
            </span>

          </h1>

          {/* Close Button Mobile */}
          <button
            onClick={() =>
              setOpenSidebar(false)
            }

            className="
              md:hidden
              text-white
            "
          >
            <X size={24} />
          </button>

        </Link>

        {/* Navigation */}
        <div className="flex flex-col gap-3 p-4 mt-4">

          {/* Dashboard */}
          <NavLink
            to="/dashboard"

            onClick={() =>
              setOpenSidebar(false)
            }

            className={({ isActive }) =>
              `
                flex items-center gap-4

                px-5 py-4

                rounded-2xl

                transition-all duration-300

                ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                }
              `
            }
          >

            <LayoutDashboard size={22} />

            Dashboard

          </NavLink>

          {/* Upload Resume */}
          <NavLink
            to="/upload-resume"

            onClick={() =>
              setOpenSidebar(false)
            }

            className={({ isActive }) =>
              `
                flex items-center gap-4

                px-5 py-4

                rounded-2xl

                transition-all duration-300

                ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                }
              `
            }
          >

            <Upload size={22} />

            Upload Resume

          </NavLink>

          {/* Analyze Resume */}
          <NavLink
            to="/analyze-resume"

            onClick={() =>
              setOpenSidebar(false)
            }

            className={({ isActive }) =>
              `
                flex items-center gap-4

                px-5 py-4

                rounded-2xl

                transition-all duration-300

                ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                }
              `
            }
          >

            <Sparkles size={22} />

            Analyze Resume

          </NavLink>

          {/* Jobs */}
          <NavLink
            to="/jobs"

            onClick={() =>
              setOpenSidebar(false)
            }

            className={({ isActive }) =>
              `
                flex items-center gap-4

                px-5 py-4

                rounded-2xl

                transition-all duration-300

                ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                }
              `
            }
          >

            <BriefcaseBusiness size={22} />

            Jobs

          </NavLink>

          {/* Profile */}
          <NavLink
            to="/profile"

            onClick={() =>
              setOpenSidebar(false)
            }

            className={({ isActive }) =>
              `
                flex items-center gap-4

                px-5 py-4

                rounded-2xl

                transition-all duration-300

                ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                }
              `
            }
          >

            <User size={22} />

            Profile

          </NavLink>

          {/* Logout */}
          <button
            onClick={handleLogout}

            className="
              flex items-center gap-4

              text-red-400

              hover:bg-red-500/10

              px-5 py-4

              rounded-2xl

              transition-all duration-300

              mt-4
            "
          >

            <LogOut size={22} />

            Logout

          </button>

        </div>

        

      </div>
    </>
  );
}

export default Sidebar;