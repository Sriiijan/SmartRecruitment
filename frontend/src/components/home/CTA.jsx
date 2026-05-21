import { Link } from "react-router-dom";

function CTA() {

  return (

    <section
      className="
        max-w-7xl
        mx-auto
        px-4 sm:px-6
        py-16 sm:py-24
      "
    >

      <div
        className="
          bg-gradient-to-r
          from-indigo-600
          to-cyan-500
          rounded-3xl sm:rounded-[40px]
          p-8 sm:p-12 md:p-20
          text-center
          relative
          overflow-hidden
        "
      >

        <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-[-80px] left-[-80px]" />

        <div className="relative z-10">

          <h2
            className="
              text-3xl
              sm:text-4xl
              md:text-6xl
              font-bold
              text-white
              leading-tight
            "
          >
            Ready to Land Your
            <br />
            Dream Job?
          </h2>

          <p
            className="
              text-white/80
              text-sm sm:text-lg
              mt-6
              max-w-2xl
              mx-auto
              leading-relaxed
            "
          >
            Upload your resume, discover AI-powered
            opportunities, and track your applications
            smarter than ever.
          </p>

          <div
            className="
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              gap-4 sm:gap-5
              mt-10
            "
          >

            <Link
              to="/upload-resume"

              className="
                w-full sm:w-auto
                bg-white
                text-slate-900
                px-8 py-4
                rounded-2xl
                font-semibold
                hover:scale-105
                transition
                text-center
              "
            >
              Upload Resume
            </Link>

            <Link
              to="/jobs"

              className="
                w-full sm:w-auto
                border border-white/40
                text-white
                px-8 py-4
                rounded-2xl
                font-semibold
                hover:bg-white/10
                transition
                text-center
              "
            >
              Explore Jobs
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CTA;