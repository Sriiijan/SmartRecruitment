import {
  Menu,
  BriefcaseBusiness,
  User,
  LogOut,
  X
} from "lucide-react";

import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { useAuth }
from "../../context/AuthContext";

import Sidebar
from "../Sidebar";

function Navbar() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const { user, logout } =
    useAuth();

  const navigate =
    useNavigate();

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
      {/* Navbar */}
      <nav
        className="
          fixed top-0 left-0
          w-full
          z-50

          bg-slate-950/95
          backdrop-blur-md

          border-b border-slate-800
        "
      >

        <div className="w-full px-4 sm:px-6">

          <div className="flex items-center justify-between h-16">

            {/* Left */}
            <div className="flex items-center gap-3">

              {/* Mobile Sidebar Button */}
              {
                user && (

                  <button
                    onClick={() =>
                      setSidebarOpen(true)
                    }

                    className="
                      md:hidden
                      text-white
                    "
                  >
                    <Menu size={24} />
                  </button>
                )
              }

              {/* Logo */}
              <Link
                to="/"

                className="
                  flex items-center gap-2

                  text-white

                  text-lg sm:text-2xl

                  font-bold
                "
              >

                <div
                  className="
                    bg-gradient-to-r
                    from-indigo-500
                    to-cyan-500

                    p-2

                    rounded-xl
                  "
                >

                  <BriefcaseBusiness size={22} />

                </div>

                <span>
                  Smart

                  <span className="text-cyan-400">
                    Recruitment
                  </span>
                </span>

              </Link>

            </div>

            {/* Right */}
            <div className="flex items-center gap-3">

              {
                user ? (

                  <>
                    {/* Profile */}
                    <Link
                      to="/profile"

                      className="
                        hidden sm:flex
                        items-center gap-2

                        text-slate-300

                        hover:text-cyan-400

                        transition
                      "
                    >

                      <User size={20} />

                      Profile

                    </Link>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}

                      className="
                        flex items-center gap-2

                        bg-red-500/10
                        text-red-400

                        hover:bg-red-500/20

                        px-4 py-2

                        rounded-xl

                        transition-all duration-300
                      "
                    >

                      <LogOut size={18} />

                      <span className="hidden sm:block">
                        Logout
                      </span>

                    </button>
                  </>

                ) : (

                  <Link
                    to="/login"

                    className="
                      bg-gradient-to-r
                      from-indigo-500
                      to-cyan-500

                      px-5 py-2

                      rounded-xl

                      text-white

                      hover:scale-105

                      transition-all duration-300
                    "
                  >
                    Login
                  </Link>

                )
              }

            </div>

          </div>

        </div>

      </nav>

      {/* Mobile Overlay */}
      {
        sidebarOpen && (

          <div
            onClick={() =>
              setSidebarOpen(false)
            }

            className="
              fixed inset-0

              bg-black/50

              z-40

              md:hidden
            "
          />
        )
      }

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed
          top-0
          left-0

          z-50

          transform
          transition-transform
          duration-300
          ease-in-out

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:hidden
        `}
      >

        {/* Close Button */}
        <button
          onClick={() =>
            setSidebarOpen(false)
          }

          className="
            absolute
            top-5
            right-5

            text-white

            z-50
          "
        >
          <X size={24} />
        </button>

        <Sidebar
          openSidebar={sidebarOpen}
          setOpenSidebar={setSidebarOpen}
        />

      </div>
    </>
  );
}

export default Navbar;