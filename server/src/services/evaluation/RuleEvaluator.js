import Evaluator from "./Evaluator.js";

class RuleEvaluator extends Evaluator {
  async evaluate(submission, problem) {
    const checks = [];

    const classes = submission.classes || [];
    const interfaces = submission.interfaces || [];
    const relationships = submission.relationships || [];

    // Check 1: At least one class
    checks.push({
      name: "Classes present",
      passed: classes.length > 0,
      message:
        classes.length > 0
          ? "Solution contains classes."
          : "Solution must contain at least one class.",
    });

    // Check 2: Duplicate classes
    const classNames = classes.map((c) =>
      c.name.trim().toLowerCase()
    );

    const uniqueClassNames = new Set(classNames);

    const noDuplicates =
      classNames.length === uniqueClassNames.size;

    checks.push({
      name: "No duplicate classes",
      passed: noDuplicates,
      message: noDuplicates
        ? "No duplicate class names found."
        : "Duplicate class names found.",
    });

    // Check 3: Explanation
    const explanation =
  submission.explanation || "";

const hasExplanation =
  explanation.trim().length >= 20;

    checks.push({
      name: "Design explanation",
      passed: hasExplanation,
      message: hasExplanation
        ? "Design explanation provided."
        : "Please provide a meaningful design explanation.",
    });

    // Check 4: Relationships
    const allNames = new Set([
      ...classes.map((c) => c.name),
      ...interfaces.map((i) => i.name),
    ]);

    const validRelationships = relationships.every(
      (relationship) =>
        allNames.has(relationship.from) &&
        allNames.has(relationship.to)
    );

    checks.push({
      name: "Valid relationships",
      passed: validRelationships,
      message: validRelationships
        ? "All relationships reference valid components."
        : "Some relationships reference unknown components.",
    });

    const passed = checks.filter(
      (check) => check.passed
    ).length;

    const score = Math.round(
      (passed / checks.length) * 100
    );

    return {
      score,
      checks,
    };
  }
}

export default RuleEvaluator;