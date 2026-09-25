import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Send,
  CheckCircle2,
  Lightbulb,
  Boxes,
  GitBranch,
  FileText,
} from "lucide-react";

import ClassEditor from "../components/ClassEditor";
import InterfaceEditor from "../components/InterfaceEditor";
import RelationshipEditor from "../components/RelationshipEditor";

import {
  getAttempt,
  updateAttempt,
  submitAttempt,
} from "../services/api";

function Practice() {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const [attempt, setAttempt] = useState(null);

  const [classes, setClasses] = useState([]);
  const [interfaces, setInterfaces] = useState([]);
  const [relationships, setRelationships] = useState([]);

  const [explanation, setExplanation] = useState("");

  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadAttempt = async () => {
      try {
        const response = await getAttempt(attemptId);

        const data = response.data;

        setAttempt(data.attempt);

        const solution = data.attempt.solution || {};

        setClasses(solution.classes || []);
        setInterfaces(solution.interfaces || []);
        setRelationships(solution.relationships || []);
        setExplanation(solution.explanation || "");
      } catch (error) {
        console.error(error);
      }
    };

    loadAttempt();
  }, [attemptId]);

  const components = useMemo(() => {
    return [
      ...classes.map((item) => item.name).filter(Boolean),
      ...interfaces.map((item) => item.name).filter(Boolean),
    ];
  }, [classes, interfaces]);

  const solution = {
    classes,
    interfaces,
    relationships,
    explanation,
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await updateAttempt(attemptId, solution);

      alert("Draft saved successfully.");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to save draft."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      await updateAttempt(attemptId, solution);

      const response = await submitAttempt(attemptId);

      console.log("Evaluation:", response.data);

      navigate(`/feedback/${attemptId}`);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Submission failed."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!attempt) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-slate-600 font-medium">
            Loading editor...
          </p>
        </div>
      </div>
    );
  }

  const problem = attempt.problemId;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left */}
            <div>
              <button
                type="button"
                onClick={() =>
                  navigate(`/problem/${problem._id}`)
                }
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition mb-2"
              >
                <ArrowLeft size={16} />
                Back to problem
              </button>

              <div className="flex items-center gap-3">
                <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                  {problem.title}
                </h1>

                <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                  LLD Practice
                </span>
              </div>

              <p className="text-sm text-slate-500 mt-1">
                Design your solution and explain your decisions.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || submitting}
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
              >
                <Save size={17} />

                {saving ? "Saving..." : "Save Draft"}
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || saving}
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50"
              >
                <Send size={17} />

                {submitting
                  ? "Evaluating..."
                  : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress / Guide */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-2 text-blue-600 font-semibold">
              <CheckCircle2 size={18} />
              Problem
            </div>

            <span className="text-slate-300">→</span>

            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <Boxes size={18} />
              Classes
            </div>

            <span className="text-slate-300">→</span>

            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <GitBranch size={18} />
              Relationships
            </div>

            <span className="text-slate-300">→</span>

            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <FileText size={18} />
              Explanation
            </div>

            <span className="text-slate-300">→</span>

            <div className="text-blue-600 font-semibold">
              Submit
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Lightbulb size={20} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Problem
                </h2>

                <p className="text-sm text-slate-500">
                  Understand the requirements before designing.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-slate-700 leading-relaxed">
              {problem.description}
            </p>

            {problem.requirements?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-bold text-slate-900 mb-3">
                  Requirements
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {problem.requirements.map(
                    (requirement, index) => (
                      <div
                        key={index}
                        className="flex gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-green-600 shrink-0 mt-0.5"
                        />

                        <span className="text-sm text-slate-600">
                          {requirement}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {problem.constraints?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-bold text-slate-900 mb-3">
                  Constraints
                </h3>

                <div className="space-y-2">
                  {problem.constraints.map(
                    (constraint, index) => (
                      <p
                        key={index}
                        className="text-sm text-slate-600"
                      >
                        • {constraint}
                      </p>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CLASSES */}
        <section className="mb-8">
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Boxes size={20} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Classes
                </h2>

                <p className="text-sm text-slate-500">
                  Define domain objects and their responsibilities.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <ClassEditor
              classes={classes}
              setClasses={setClasses}
            />
          </div>
        </section>

        {/* INTERFACES */}
        <section className="mb-8">
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <GitBranch size={20} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Interfaces
                </h2>

                <p className="text-sm text-slate-500">
                  Define abstractions for behavior that may have
                  multiple implementations.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <InterfaceEditor
              interfaces={interfaces}
              setInterfaces={setInterfaces}
            />
          </div>
        </section>

        {/* RELATIONSHIPS */}
        <section className="mb-8">
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <GitBranch size={20} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Relationships
                </h2>

                <p className="text-sm text-slate-500">
                  Connect classes and interfaces to describe the
                  domain structure.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <RelationshipEditor
              relationships={relationships}
              setRelationships={setRelationships}
              components={components}
            />

            {components.length === 0 && (
              <div className="mt-4 p-4 rounded-lg bg-amber-50 border border-amber-200">
                <p className="text-sm text-amber-700">
                  Add at least one class or interface before
                  creating relationships.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* EXPLANATION */}
        <section className="mb-8">
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                <FileText size={20} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Design Explanation
                </h2>

                <p className="text-sm text-slate-500">
                  Explain why you designed the system this way.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <textarea
              value={explanation}
              onChange={(e) =>
                setExplanation(e.target.value)
              }
              placeholder="Explain your design decisions, responsibilities, relationships, patterns, extensibility and trade-offs..."
              rows={12}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-y"
            />

            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-slate-400">
                Explain your reasoning clearly. Your explanation
                will be reviewed by the evaluator.
              </p>

              <p className="text-xs text-slate-400">
                {explanation.length} characters
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM ACTIONS */}
        <section className="bg-slate-900 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-xl font-bold text-white">
                Ready to submit?
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Save your draft or submit it for structural and AI
                evaluation.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || submitting}
                className="flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/20 transition disabled:opacity-50"
              >
                <Save size={17} />

                {saving ? "Saving..." : "Save Draft"}
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || saving}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500 transition disabled:opacity-50"
              >
                <Send size={17} />

                {submitting
                  ? "Evaluating..."
                  : "Submit for Evaluation"}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Practice;