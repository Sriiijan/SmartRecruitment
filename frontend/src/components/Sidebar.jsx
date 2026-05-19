import {
  LayoutDashboard,
  Upload,
  BriefcaseBusiness,
  User,
  LogOut,
} from "lucide-react";

import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sparkles } from "lucide-react";

function Sidebar() {

    const navigate = useNavigate();

    const { logout } = useAuth();

    const handleLogout = () => {
      logout();

      navigate("/login");
    };


  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-64px)] w-72 bg-slate-900 border-r border-slate-800 overflow-hidden">

      {/* Logo */}
      {/* <Link
            to="/" className="text-3xl font-bold text-white mb-12">
        Smart<span className="text-cyan-400">Recruitment</span>
      </Link> */}

      {/* Navigation */}
      <div className="flex flex-col gap-4 mt-8">

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-4 rounded-2xl transition
            ${
              isActive
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
            }`
          }
        >
          <LayoutDashboard size={22} />
          Dashboard
        </NavLink>
      
        {/* Upload Resume */}
        <NavLink
          to="/upload-resume"
          className={({ isActive }) =>
          `flex items-center gap-4 px-5 py-4 rounded-2xl transition
          ${
            isActive
              ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
              : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
          }`
        }
        >
          <Upload size={22} />
          Upload Resume
        </NavLink>
        
        {/* Resume Analysis */}
        <NavLink
          to="/analyze-resume"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-4 rounded-2xl transition
            ${
              isActive
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
            }`
          }
        >
          <Sparkles size={22} />

          <span className="font-medium">
            Analyze Resume
          </span>
        </NavLink>

        {/* Jobs */}
        <NavLink
          to="/jobs"
          className={() => {

            const active =

              window.location.pathname === "/jobs" ||

              window.location.pathname === "/recommended-jobs" ||

              window.location.pathname === "/saved-jobs";

            return `flex items-center gap-4 px-5 py-4 rounded-2xl transition
              
              ${
                active
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
              }`;
          }}
        >
          <BriefcaseBusiness size={22} />
          Jobs
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
          `flex items-center gap-4 px-5 py-4 rounded-2xl transition
          ${
            isActive
              ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
              : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
          }`
        }
        >
          <User size={22} />
          Profile
        </NavLink>

      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-4 text-red-400 hover:bg-red-500/10 px-5 py-4 rounded-2xl transition mt-16 w-full"
       >
        <LogOut size={22} />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;