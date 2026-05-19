import { Menu, X, BriefcaseBusiness } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function Navbar() {

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const { user } = useAuth();

  return (

    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">

      <div className="w-full px-4">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white text-2xl font-bold"
          >

            <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 p-2 rounded-xl">

              <BriefcaseBusiness size={22} />

            </div>

            <span>
              Smart
              <span className="text-cyan-400">
                Recruitment
              </span>
            </span>

          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className="text-slate-300 hover:text-cyan-400 transition"
            >
              Home
            </Link>

            <Link
              to="/jobs"
              className="text-slate-300 hover:text-cyan-400 transition"
            >
              Jobs
            </Link>

            <Link
              to="/analyze-resume"
              className="text-slate-300 hover:text-cyan-400 transition"
            >
              Resume Analyzer
            </Link>

            {/* Conditional Button */}
            {
              user ? (

                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2 rounded-xl text-white hover:scale-105 transition-all duration-300"
                >
                  Dashboard
                </Link>

              ) : (

                <Link
                  to="/login"
                  className="bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2 rounded-xl text-white hover:scale-105 transition-all duration-300"
                >
                  Login
                </Link>

              )
            }

          </div>

          {/* Mobile Icon */}
          <button
            className="md:hidden text-white"
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
          >
            {
              mobileMenu
                ? <X />
                : <Menu />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        {
          mobileMenu && (

            <div className="md:hidden flex flex-col gap-4 pb-4 text-white">

              <Link
                to="/"
                onClick={() =>
                  setMobileMenu(false)
                }
              >
                Home
              </Link>

              <Link
                to="/jobs"
                onClick={() =>
                  setMobileMenu(false)
                }
              >
                Jobs
              </Link>

              <Link
                to="/analyze-resume"
                onClick={() =>
                  setMobileMenu(false)
                }
              >
                Resume Analyzer
              </Link>

              {
                user ? (

                  <Link
                    to="/dashboard"
                    onClick={() =>
                      setMobileMenu(false)
                    }
                    className="bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2 rounded-xl text-white text-center"
                  >
                    Dashboard
                  </Link>

                ) : (

                  <Link
                    to="/login"
                    onClick={() =>
                      setMobileMenu(false)
                    }
                    className="bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2 rounded-xl text-white text-center"
                  >
                    Login
                  </Link>

                )
              }

            </div>
          )
        }

      </div>
    </nav>
  );
}