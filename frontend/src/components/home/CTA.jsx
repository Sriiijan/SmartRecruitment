import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">

        {/* Glow Effect */}
        <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-[-80px] left-[-80px]"></div>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Ready to Land Your
            <br />
            Dream Job?
          </h2>

          <p className="text-white/80 text-lg mt-6 max-w-2xl mx-auto">
            Upload your resume, discover AI-powered opportunities,
            and track your applications smarter than ever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
            <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
              <Link
                to="/upload-resume"
              >
                Upload Resume
              </Link>
            </button>

            <button className="border border-white/40 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition">
              <Link
                to="/jobs"
              >
                Explore Jobs
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;