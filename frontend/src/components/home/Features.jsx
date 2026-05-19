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
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">
          Powerful Features
        </h2>

        <p className="text-slate-400 mt-4">
          Everything you need to accelerate your career.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-cyan-400 transition"
          >
            <div className="text-cyan-400 mb-5">
              {feature.icon}
            </div>

            <h3 className="text-white text-xl font-semibold mb-3">
              {feature.title}
            </h3>

            <p className="text-slate-400">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;