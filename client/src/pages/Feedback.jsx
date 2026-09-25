import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getAttempt, createAttempt } from "../services/api";

function Feedback() {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getAttempt(attemptId);
        setData(response.data);
      } catch (error) {
        console.error("Failed to load attempt:", error);
      }
    };

    load();
  }, [attemptId]);

  const handleTryAgain = async () => {
    try {
      setRetrying(true);

      const problemId =
        typeof data.attempt.problemId === "object"
          ? data.attempt.problemId._id
          : data.attempt.problemId;

      if (!problemId) {
        alert("Problem ID is missing.");
        return;
      }

      const response = await createAttempt(problemId);

      navigate(`/practice/${response.data._id}`);
    } catch (error) {
      console.error("Try Again Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to start a new attempt."
      );
    } finally {
      setRetrying(false);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">
            Loading your feedback...
          </p>
        </div>
      </div>
    );
  }

  const evaluation = data.evaluation;

  if (!evaluation) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center max-w-md shadow-sm">
          <div className="text-4xl mb-4">⏳</div>

          <h2 className="text-xl font-bold text-slate-900">
            Evaluation is processing
          </h2>

          <p className="text-slate-500 mt-2">
            Your solution is being evaluated. Please check again
            shortly.
          </p>

          <Link
            to="/history"
            className="inline-block mt-6 px-5 py-2.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            View History
          </Link>
        </div>
      </div>
    );
  }

  const finalScore = evaluation.finalScore;
  const structuralScore = evaluation.deterministic.score;
  const aiScore = evaluation.ai.score;

  const getScoreStyle = (score) => {
    if (score >= 80) {
      return {
        text: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
      };
    }

    if (score >= 60) {
      return {
        text: "text-yellow-600",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
      };
    }

    return {
      text: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    };
  };

  const finalScoreStyle = getScoreStyle(finalScore);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                Evaluation Complete
              </p>

              <h1 className="text-4xl font-bold text-slate-900 mt-2">
                Design Feedback
              </h1>

              <p className="text-slate-500 mt-2">
                Review your design, understand the issues, and improve
                your solution.
              </p>
            </div>

            <div
              className={`rounded-2xl border px-8 py-5 text-center ${finalScoreStyle.bg} ${finalScoreStyle.border}`}
            >
              <p className="text-sm font-semibold text-slate-600">
                Final Score
              </p>

              <p
                className={`text-4xl font-bold mt-1 ${finalScoreStyle.text}`}
              >
                {finalScore}
                <span className="text-lg text-slate-400">/100</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Score Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Structural Score */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Structural Evaluation
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  {structuralScore}/100
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
                🧩
              </div>
            </div>

            <div className="mt-5 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{
                  width: `${structuralScore}%`,
                }}
              />
            </div>

            <p className="text-sm text-slate-500 mt-3">
              Checks the structure and completeness of your design.
            </p>
          </div>

          {/* AI Score */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  AI Design Evaluation
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  {aiScore}/100
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-xl">
                ✨
              </div>
            </div>

            <div className="mt-5 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all"
                style={{
                  width: `${aiScore}%`,
                }}
              />
            </div>

            <p className="text-sm text-slate-500 mt-3">
              Evaluates responsibilities, abstraction, coupling,
              extensibility and reasoning.
            </p>
          </div>
        </section>

        {/* Structural Checks */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-8">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">
              Structural Evaluation
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Automated checks performed on your submitted design.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {evaluation.deterministic.checks.map(
              (check, index) => (
                <div
                  key={index}
                  className="px-6 py-5 flex gap-4"
                >
                  <div
                    className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-bold ${
                      check.passed
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {check.passed ? "✓" : "✕"}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {check.name}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      {check.message}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* AI Feedback */}
        <section className="mb-8">
          <div className="mb-5">
            <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
              AI Feedback
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Design Review
            </h2>

            <p className="text-slate-500 mt-1">
              Detailed feedback on your LLD reasoning and design
              decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  ✓
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Strengths
                  </h3>

                  <p className="text-xs text-slate-500">
                    What you did well
                  </p>
                </div>
              </div>

              {evaluation.ai.strengths.length > 0 ? (
                <ul className="space-y-3">
                  {evaluation.ai.strengths.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm text-slate-600"
                      >
                        <span className="text-green-600 font-bold">
                          ✓
                        </span>

                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">
                  No strengths were identified.
                </p>
              )}
            </div>

            {/* Issues */}
            <div className="bg-white border border-red-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  !
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Issues
                  </h3>

                  <p className="text-xs text-slate-500">
                    Areas that need improvement
                  </p>
                </div>
              </div>

              {evaluation.ai.issues.length > 0 ? (
                <ul className="space-y-3">
                  {evaluation.ai.issues.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm text-slate-600"
                      >
                        <span className="text-red-500 font-bold">
                          !
                        </span>

                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">
                  No major issues were identified.
                </p>
              )}
            </div>

            {/* Suggestions */}
            <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  💡
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Suggestions
                  </h3>

                  <p className="text-xs text-slate-500">
                    How you can improve
                  </p>
                </div>
              </div>

              {evaluation.ai.suggestions.length > 0 ? (
                <ul className="space-y-3">
                  {evaluation.ai.suggestions.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm text-slate-600"
                      >
                        <span className="text-blue-600 font-bold">
                          →
                        </span>

                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">
                  No suggestions available.
                </p>
              )}
            </div>

            {/* Interview Questions */}
            <div className="bg-white border border-purple-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  ?
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Interview Questions
                  </h3>

                  <p className="text-xs text-slate-500">
                    Questions to test your understanding
                  </p>
                </div>
              </div>

              {evaluation.ai.questions.length > 0 ? (
                <ol className="space-y-4">
                  {evaluation.ai.questions.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm text-slate-600"
                      >
                        <span className="font-bold text-purple-600">
                          {index + 1}.
                        </span>

                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ol>
              ) : (
                <p className="text-sm text-slate-500">
                  No interview questions generated.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="bg-slate-900 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                Ready to improve your design?
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Try the problem again and apply the feedback you
                received.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleTryAgain}
                disabled={retrying}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {retrying ? "Starting..." : "Try Again →"}
              </button>

              <Link
                to="/history"
                className="px-5 py-2.5 bg-white/10 text-white border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition"
              >
                View History
              </Link>

              <Link
                to="/"
                className="px-5 py-2.5 text-slate-300 hover:text-white font-medium transition"
              >
                All Problems
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Feedback;