class EvaluationService {
  constructor(evaluators) {
    this.evaluators = evaluators;
  }

  async evaluate(submission, problem) {
    const results = await Promise.all(
      this.evaluators.map((evaluator) =>
        evaluator.evaluate(submission, problem)
      )
    );

    return {
      ruleResult: results[0],
      aiResult: results[1],
    };
  }
}

export default EvaluationService;