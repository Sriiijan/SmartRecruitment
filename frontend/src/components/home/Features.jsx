import {
  FileSearch,
  BriefcaseBusiness,
  BrainCircuit,
  BadgeCheck,
} from "lucide-react";

import { motion } from "framer-motion";

function Features() {

  const features = [
    {
      icon: <BrainCircuit size={40} />,
      title: "AI Resume Analysis",
      desc: "Analyze resumes using AI and improve job matching.",
    },
    {
      icon: <BriefcaseBusiness size={40} />,
      title: "Smart Job Search",
      desc: "Find jobs based on your skills and interests.",
    },
    {
      icon: <FileSearch size={40} />,
      title: "Application Tracking",
      desc: "Track all your job applications in one dashboard.",
    },
    {
      icon: <BadgeCheck size={40} />,
      title: "Skill Matching",
      desc: "Get AI-powered skill match scores instantly.",
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

      <div className="text-center mb-12 sm:mb-16">

        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Powerful Features
        </h2>

        <p className="text-slate-400 mt-4 text-sm sm:text-base">
          Everything you need to accelerate your career.
        </p>

      </div>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-6 sm:gap-8
        "
      >

        {features.map((feature, index) => (

          <motion.div
            key={index}

            initial={{ opacity: 0, y: 40 }}

            whileInView={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.5,
              delay: index * 0.2
            }}

            viewport={{ once: true }}

            className="
              bg-slate-900
              border border-slate-800
              rounded-3xl
              p-6 sm:p-8
              hover:border-cyan-400
              transition
            "
          >

            <div className="text-cyan-400 mb-5">
              {feature.icon}
            </div>

            <h3 className="text-white text-lg sm:text-xl font-semibold mb-3">
              {feature.title}
            </h3>

            <p className="text-slate-400 text-sm sm:text-base">
              {feature.desc}
            </p>

          </motion.div>
        ))}

      </div>

    </section>
  );
}

export default Features;