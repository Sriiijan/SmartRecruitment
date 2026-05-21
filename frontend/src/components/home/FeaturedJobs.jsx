import {
  MapPin,
  BriefcaseBusiness,
  IndianRupee
} from "lucide-react";

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

    <section
      className="
        max-w-7xl
        mx-auto
        px-4 sm:px-6
        py-16 sm:py-24
      "
    >

      {/* Heading */}
      <div className="text-center mb-12 sm:mb-16">

        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Featured Jobs
        </h2>

        <p className="text-slate-400 mt-4 text-sm sm:text-base">
          Explore trending opportunities powered by AI.
        </p>

      </div>

      {/* Cards */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6 sm:gap-8
        "
      >

        {jobs.map((job, index) => (

          <div
            key={index}

            className="
              bg-slate-900
              border border-slate-800
              rounded-3xl
              p-6 sm:p-8
              hover:border-cyan-400
              transition
              hover:-translate-y-2
            "
          >

            <div className="flex items-start gap-3 mb-6">

              <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 p-3 rounded-2xl">

                <BriefcaseBusiness className="text-white" />

              </div>

              <div>

                <h3 className="text-white text-lg sm:text-xl font-semibold">
                  {job.title}
                </h3>

                <p className="text-slate-400 text-sm sm:text-base">
                  {job.company}
                </p>

              </div>

            </div>

            <div className="space-y-3 text-slate-300 text-sm sm:text-base">

              <div className="flex items-center gap-2">
                <MapPin size={18} />
                {job.location}
              </div>

              <div className="flex items-center gap-2">
                <IndianRupee size={18} />
                {job.salary}
              </div>

            </div>

            <button
              className="
                mt-8
                w-full
                bg-gradient-to-r
                from-indigo-500
                to-cyan-500
                py-3
                rounded-2xl
                text-white
                font-semibold
                hover:opacity-90
                transition
              "
            >
              Apply Now
            </button>

          </div>
        ))}

      </div>

    </section>
  );
}

export default FeaturedJobs;