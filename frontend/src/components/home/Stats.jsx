function Stats() {
  const stats = [
    {
      number: "10K+",
      title: "Active Jobs",
    },
    {
      number: "5K+",
      title: "Registered Users",
    },
    {
      number: "95%",
      title: "AI Match Accuracy",
    },
    {
      number: "24/7",
      title: "Smart Support",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center hover:border-cyan-400 transition"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              {item.number}
            </h2>

            <p className="text-slate-400 mt-3">
              {item.title}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}

export default Stats;