import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAttempts } from "../services/api";

function History() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await getAttempts();
        setAttempts(response.data);
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const getScoreStyle = (score) => {
    if (score >= 80) {
      return "bg-green-100 text-green-700";
    }

    if (score >= 60) {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "SUBMITTED":
        return "bg-blue-100 text-blue-700";

      case "EVALUATING":
        return "bg-yellow-100 text-yellow-700";

      case "EVALUATION_FAILED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-slate-600 font-medium">
            Loading attempt history...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                Your Progress
              </p>

              <h1 className="text-4xl font-bold text-slate-900 mt-2">
                Attempt History
              </h1>

              <p className="text-slate-500 mt-2">
                Review your previous LLD attempts and track your
                improvement.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Practice a Problem →
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats */}
        {attempts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Total Attempts
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-1">
                {attempts.length}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Completed
              </p>

              <p className="text-3xl font-bold text-green-600 mt-1">
                {
                  attempts.filter(
                    (attempt) => attempt.status === "COMPLETED"
                  ).length
                }
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Average Score
              </p>

              <p className="text-3xl font-bold text-blue-600 mt-1">
                {(() => {
                  const evaluated = attempts.filter(
                    (attempt) => attempt.evaluation
                  );

                  if (evaluated.length === 0) {
                    return "—";
                  }

                  const average =
                    evaluated.reduce(
                      (total, attempt) =>
                        total +
                        attempt.evaluation.finalScore,
                      0
                    ) / evaluated.length;

                  return Math.round(average);
                })()}
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {attempts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-3xl">
              📝
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-5">
              No attempts yet
            </h2>

            <p className="text-slate-500 mt-2 max-w-md mx-auto">
              Start solving an LLD problem and your attempts will
              appear here.
            </p>

            <Link
              to="/"
              className="inline-flex mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Start Practicing →
            </Link>
          </div>
        ) : (
          <>
            {/* Section Heading */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Your Attempts
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Most recent attempts appear first.
                </p>
              </div>
            </div>

            {/* Attempts */}
            <div className="space-y-4">
              {attempts.map((attempt) => {
                const score =
                  attempt.evaluation?.finalScore;

                return (
                  <div
                    key={attempt._id}
                    className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                      {/* Problem Info */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-bold text-slate-900">
                            {attempt.problemId?.title ||
                              "Unknown Problem"}
                          </h3>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                              attempt.status
                            )}`}
                          >
                            {attempt.status}
                          </span>
                        </div>

                        <p className="text-sm text-slate-500 mt-2">
                          Attempted{" "}
                          {new Date(
                            attempt.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>

                      {/* Score */}
                      <div className="flex items-center gap-6">
                        <div className="text-left lg:text-right">
                          <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
                            Score
                          </p>

                          {score !== undefined ? (
                            <span
                              className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-bold ${getScoreStyle(
                                score
                              )}`}
                            >
                              {score}/100
                            </span>
                          ) : (
                            <p className="text-sm text-slate-400 mt-1">
                              Not evaluated
                            </p>
                          )}
                        </div>

                        {/* Review */}
                        {attempt.status === "COMPLETED" && (
                          <Link
                            to={`/feedback/${attempt._id}`}
                            className="px-5 py-2.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
                          >
                            Review →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default History;