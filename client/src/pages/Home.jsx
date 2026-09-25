import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProblems } from "../services/api";

function Home() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProblems = async () => {
      try {
        const response = await getProblems();
        setProblems(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">
            Loading problems...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-5">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              Low-Level Design Practice
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Master LLD by
              <span className="text-blue-600"> designing systems</span>
            </h1>

            <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-relaxed">
              Practice real-world Low-Level Design problems, build your
              classes and interfaces, submit your solution, and get
              actionable feedback.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#problems"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Start Practicing →
              </a>

              <Link
                to="/history"
                className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition"
              >
                View History
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section
        id="problems"
        className="max-w-7xl mx-auto px-6 py-14"
      >
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              Practice Problems
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              Choose a problem
            </h2>

            <p className="text-slate-600 mt-2">
              Pick a problem and start designing your solution.
            </p>
          </div>

          <div className="hidden md:block text-sm text-slate-500">
            {problems.length} problems available
          </div>
        </div>

        {problems.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
            <h3 className="text-lg font-semibold text-slate-800">
              No problems available
            </h3>

            <p className="text-slate-500 mt-2">
              Please check again later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem) => (
              <div
                key={problem._id}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    {problem.title}
                  </h3>

                  <span
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
                      problem.difficulty === "Easy"
                        ? "bg-green-100 text-green-700"
                        : problem.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mt-4 line-clamp-4">
                  {problem.description}
                </p>

                {/* Requirements */}
                {problem.requirements?.length > 0 && (
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-slate-800 mb-2">
                      What you'll practice
                    </p>

                    <ul className="space-y-1">
                      {problem.requirements
                        .slice(0, 3)
                        .map((requirement, index) => (
                          <li
                            key={index}
                            className="text-sm text-slate-500 flex gap-2"
                          >
                            <span className="text-blue-600">✓</span>
                            <span>{requirement}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Button */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <Link
                    to={`/problem/${problem._id}`}
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
                  >
                    View Problem
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              Simple Workflow
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              Practice → Design → Improve
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                number: "01",
                title: "Choose",
                text: "Select an LLD problem.",
              },
              {
                number: "02",
                title: "Design",
                text: "Create classes, interfaces and relationships.",
              },
              {
                number: "03",
                title: "Submit",
                text: "Submit your design for evaluation.",
              },
              {
                number: "04",
                title: "Improve",
                text: "Review feedback and try again.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="border border-slate-200 rounded-xl p-6 bg-slate-50"
              >
                <div className="text-blue-600 font-bold text-sm mb-4">
                  {step.number}
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;