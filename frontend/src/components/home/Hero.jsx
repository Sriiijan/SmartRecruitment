import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {

  return (

    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}

      className="
        max-w-7xl
        mx-auto
        px-4 sm:px-6
        py-16 sm:py-20 md:py-24
      "
    >

      <div
        className="
          grid
          lg:grid-cols-2
          gap-12
          items-center
        "
      >

        {/* Left */}
        <div className="text-center lg:text-left">

          <h1
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-bold
              leading-tight
              text-white
            "
          >
            Find Your

            <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              {" "}Dream Job
            </span>

            <br />

            With AI

          </h1>

          <p
            className="
              text-slate-400
              text-base sm:text-lg
              mt-6
              leading-relaxed
              max-w-2xl
              mx-auto lg:mx-0
            "
          >
            Upload resumes, analyze skills,
            discover jobs, and track applications
            smarter with AI-powered recruitment.
          </p>

          <div
            className="
              flex
              flex-col sm:flex-row
              gap-4 sm:gap-5
              mt-8
              justify-center lg:justify-start
            "
          >

            <Link
              to="/"

              className="
                bg-gradient-to-r
                from-indigo-500
                to-cyan-500
                px-7 py-3
                rounded-2xl
                text-white
                font-semibold
                hover:scale-105
                transition
                text-center
              "
            >
              Get Started
            </Link>

            <Link
              to="/jobs"

              className="
                border border-slate-700
                px-7 py-3
                rounded-2xl
                text-white
                hover:border-cyan-400
                transition
                text-center
              "
            >
              Explore Jobs
            </Link>

          </div>

        </div>

        {/* Right */}
        <div className="flex justify-center relative">

          <div
            className="
              w-64 h-64
              sm:w-80 sm:h-80
              md:w-[400px] md:h-[400px]
              rounded-full
              bg-gradient-to-r
              from-indigo-500/30
              to-cyan-500/30
              blur-3xl
              absolute
            "
          />

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

            alt="hero"

            className="
              relative
              w-52
              sm:w-64
              md:w-80
              drop-shadow-2xl
            "
          />

        </div>

      </div>

    </motion.section>
  );
}

export default Hero;