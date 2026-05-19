import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
            Find Your
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              {" "}Dream Job
            </span>
            <br />
            With AI
          </h1>

          <p className="text-slate-400 text-lg mt-6 leading-relaxed">
            Upload resumes, analyze skills, discover jobs,
            and track applications smarter with AI-powered recruitment.
          </p>

          <div className="flex gap-5 mt-8">
            <button className="bg-gradient-to-r from-indigo-500 to-cyan-500 px-7 py-3 rounded-2xl text-white font-semibold hover:scale-105 transition">
              <Link
                to="/"
              >
                Get Started
              </Link>
            </button>

            <button className="border border-slate-700 px-7 py-3 rounded-2xl text-white hover:border-cyan-400 transition">
              <Link
                to="/jobs"
              >
                Explore Jobs
              </Link>
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center relative">
          <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-r from-indigo-500/30 to-cyan-500/30 blur-3xl absolute"></div>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="hero"
            className="relative w-[320px] drop-shadow-2xl"
          />
        </div>

      </div>
    </motion.section>
  );
}

export default Hero;