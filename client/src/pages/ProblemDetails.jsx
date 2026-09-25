import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Play,
  ShieldCheck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProblem,
  createAttempt,
} from "../services/api";

function ProblemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    const loadProblem = async () => {
      try {
        const response = await getProblem(id);
        setProblem(response.data);
      } catch (error) {
        console.error("Failed to load problem:", error);
      }
    };

    loadProblem();
  }, [id]);

  const startPractice = async () => {
    try {
      setStarting(true);

      const response = await createAttempt(id);

      navigate(`/practice/${response.data._id}`);
    } catch (error) {
      console.error("Failed to start practice:", error);

      alert(
        error.response?.data?.message ||
          "Failed to start practice."
      );
    } finally {
      setStarting(false);
    }
  };

  if (!problem) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-slate-600 font-medium">
            Loading problem...
          </p>
        </div>
      </div>
    );
  }

  const difficultyStyle =
    problem.difficulty === "Easy"
      ? "bg-green-100 text-green-700 border-green-200"
      : problem.difficulty === "Medium"
      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
      : "bg-red-100 text-red-700 border-red-200";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition"
          >
            <ArrowLeft size={17} />
            Back to problems
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Problem Header */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
              <div>
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                  LLD Practice Problem
                </p>

                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
                  {problem.title}
                </h1>

                <p className="text-slate-500 mt-3 max-w-3xl">
                  Design a clean, extensible object-oriented solution
                  and explain the reasoning behind your design.
                </p>
              </div>

              <span
                className={`self-start px-4 py-2 rounded-full border text-sm font-bold ${difficultyStyle}`}
              >
                {problem.difficulty}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Lightbulb size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Problem
                </h2>

                <p className="text-slate-600 leading-7 mt-3">
                  {problem.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements + Constraints */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Requirements */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Requirements
                </h2>

                <p className="text-sm text-slate-500">
                  What your design should support
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {problem.requirements?.map(
                (requirement, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-green-600 shrink-0 mt-0.5"
                    />

                    <span className="text-sm text-slate-600 leading-relaxed">
                      {requirement}
                    </span>
                  </div>
                )
              )}
            </div>
          </section>

          {/* Constraints */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Constraints
                </h2>

                <p className="text-sm text-slate-500">
                  Things to consider while designing
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {problem.constraints?.map(
                (constraint, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-100"
                  >
                    <p className="text-sm text-slate-600 leading-relaxed">
                      • {constraint}
                    </p>
                  </div>
                )
              )}
            </div>
          </section>
        </div>

        {/* What you'll design */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm mt-6">
          <h2 className="text-xl font-bold text-slate-900">
            What you'll design
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Your solution should describe the main building blocks of
            the system.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-2xl mb-3">📦</div>

              <h3 className="font-bold text-slate-900">
                Classes
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Define objects, fields and responsibilities.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-2xl mb-3">🔗</div>

              <h3 className="font-bold text-slate-900">
                Relationships
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Show how components interact with each other.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-2xl mb-3">💡</div>

              <h3 className="font-bold text-slate-900">
                Reasoning
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Explain trade-offs, patterns and extensibility.
              </p>
            </div>
          </div>
        </section>

        {/* Start Practice */}
        <section className="bg-slate-900 rounded-2xl p-6 md:p-8 mt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Ready to design?
              </h2>

              <p className="text-slate-400 mt-2 max-w-xl">
                Create your classes, interfaces and relationships,
                then explain the decisions behind your design.
              </p>
            </div>

            <button
              type="button"
              onClick={startPractice}
              disabled={starting}
              className="shrink-0 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Play size={18} />

              {starting
                ? "Starting..."
                : "Start Practice"}

              {!starting && (
                <ArrowRight size={18} />
              )}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProblemDetails;