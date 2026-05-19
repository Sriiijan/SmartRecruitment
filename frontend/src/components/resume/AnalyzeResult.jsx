import {
  TrendingUp,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Award
} from "lucide-react";

function AnalyzeResult({ result }) {

  const score =
    Number(result?.final_match_percentage || 0);

  // ======================================
  // Score Label
  // ======================================
  const getScoreLabel = (score) => {

    if (score >= 75)
      return "Excellent Match";

    if (score >= 50)
      return "Good Match";

    return "Needs Improvement";
  };

  // ======================================
  // Score Color
  // ======================================
  const getScoreColor = (score) => {

    if (score >= 75)
      return "#10b981";

    if (score >= 50)
      return "#f59e0b";

    return "#ef4444";
  };

  // ======================================
  // Score Gradient
  // ======================================
  const getScoreBg = (score) => {

    if (score >= 75)
      return "from-emerald-500 to-green-600";

    if (score >= 50)
      return "from-amber-500 to-orange-600";

    return "from-red-500 to-rose-600";
  };

  return (

    <div className="mt-12 space-y-8">

      {/* Overall Match */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

        <div className="flex flex-col md:flex-row items-center gap-10">

          {/* Circular Score */}
          <div className="relative">

            <svg
              className="transform -rotate-90"
              width="220"
              height="220"
            >

              {/* Background */}
              <circle
                cx="110"
                cy="110"
                r="90"
                stroke="#1e293b"
                strokeWidth="16"
                fill="none"
              />

              {/* Progress */}
              <circle
                cx="110"
                cy="110"
                r="90"
                stroke={getScoreColor(score)}
                strokeWidth="16"
                fill="none"
                strokeDasharray={2 * Math.PI * 90}
                strokeDashoffset={
                  2 *
                  Math.PI *
                  90 *
                  (1 - score / 100)
                }
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>

            {/* Percentage */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <span
                className="text-4xl font-black"
                style={{
                  color: getScoreColor(score)
                }}
              >
                {score.toFixed(1)}%
              </span>

              <span className="text-slate-400 text-sm mt-2">
                Match Score
              </span>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 text-center md:text-left">

            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">

              <TrendingUp
                className="text-cyan-400"
                size={32}
              />

              <h2 className="text-4xl font-bold text-white">
                ATS Analysis
              </h2>
            </div>

            <p
              className={`text-5xl font-black mb-4 bg-gradient-to-r ${getScoreBg(score)} bg-clip-text text-transparent`}
            >
              {getScoreLabel(score)}
            </p>

            <div className="space-y-2 text-slate-300 text-lg">

              <p>
                Skill Match:
                {" "}
                {result.skill_match_percentage}%
              </p>

              <p>
                Semantic Match:
                {" "}
                {result.semantic_match_percentage}%
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Matched Skills */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <div className="flex items-center justify-between mb-6">

            <div className="flex items-center gap-3">

              <CheckCircle
                className="text-green-400"
                size={30}
              />

              <h3 className="text-2xl font-bold text-white">
                Matched Skills
              </h3>
            </div>

            <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-xl font-bold">

              {(result.matched_skills || []).length}

            </span>
          </div>

          <div className="flex flex-wrap gap-3">

            {(result.matched_skills || []).map(
              (skill, index) => (

                <span
                  key={index}
                  className="bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-2 rounded-xl font-medium"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <div className="flex items-center justify-between mb-6">

            <div className="flex items-center gap-3">

              <AlertCircle
                className="text-orange-400"
                size={30}
              />

              <h3 className="text-2xl font-bold text-white">
                Missing Skills
              </h3>
            </div>

            <span className="bg-orange-500/20 text-orange-300 px-4 py-2 rounded-xl font-bold">

              {(result.missing_skills || []).length}

            </span>
          </div>

          <div className="flex flex-wrap gap-3">

            {(result.missing_skills || []).map(
              (skill, index) => (

                <span
                  key={index}
                  className="bg-orange-500/10 border border-orange-500/30 text-orange-300 px-4 py-2 rounded-xl font-medium"
                >
                  {skill}
                </span>
              )
            )}
          </div>

          
        </div>
        {/* Recommendations */}
      {/* ====================================== */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

        <div className="flex items-center gap-3 mb-6">

          <BookOpen
            className="text-cyan-400"
            size={30}
          />

          <h3 className="text-2xl font-bold text-white">
            AI Recommendations
          </h3>
        </div>

        {
          (result.recommendations || [])
            .length > 0 ? (

            <div className="space-y-4">

              {
                result.recommendations.map(
                  (
                    recommendation,
                    index
                  ) => (

                    <div
                      key={index}
                      className="flex items-start gap-4 p-5 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl"
                    >

                      <Award
                        className="text-cyan-400 mt-1 flex-shrink-0"
                        size={24}
                      />

                      <p className="text-slate-300 text-lg leading-relaxed">
                        {recommendation}
                      </p>
                    </div>
                  )
                )
              }
            </div>

          ) : (

            <p className="text-slate-500">
              No recommendations available
            </p>
          )
        }
      </div>
      </div>
    </div>
  );
}

export default AnalyzeResult;