import { MapPin, BriefcaseBusiness, IndianRupee } from "lucide-react";

function FeaturedJobs() {
  const jobs = [
    {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore",
      salary: "12 LPA",
    },
    {
      title: "Backend Developer",
      company: "Microsoft",
      location: "Hyderabad",
      salary: "15 LPA",
    },
    {
      title: "AI Engineer",
      company: "OpenAI",
      location: "Remote",
      salary: "20 LPA",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">
          Featured Jobs
        </h2>

        <p className="text-slate-400 mt-4">
          Explore trending opportunities powered by AI.
        </p>
      </div>

      {/* Job Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-cyan-400 transition hover:-translate-y-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 p-3 rounded-2xl">
                <BriefcaseBusiness className="text-white" />
              </div>

              <div>
                <h3 className="text-white text-xl font-semibold">
                  {job.title}
                </h3>

                <p className="text-slate-400">
                  {job.company}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-slate-300">

              <div className="flex items-center gap-2">
                <MapPin size={18} />
                {job.location}
              </div>

              <div className="flex items-center gap-2">
                <IndianRupee size={18} />
                {job.salary}
              </div>

            </div>

            <button className="mt-8 w-full bg-gradient-to-r from-indigo-500 to-cyan-500 py-3 rounded-2xl text-white font-semibold hover:opacity-90 transition">
              Apply Now
            </button>
          </div>
        ))}

      </div>
    </section>
  );
}

export default FeaturedJobs;