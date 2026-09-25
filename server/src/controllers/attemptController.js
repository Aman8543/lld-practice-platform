import Attempt from "../models/Attempt.js";
import Evaluation from "../models/Evaluation.js";
import Problem from "../models/Problem.js";

import RuleEvaluator from "../services/evaluation/RuleEvaluator.js";
import AIEvaluator from "../services/evaluation/AIEvaluator.js";
import EvaluationService from "../services/evaluation/EvaluationService.js";

const evaluationService =
  new EvaluationService([
    new RuleEvaluator(),
    new AIEvaluator(),
  ]);

export const createAttempt = async (req, res) => {
  try {
    const { problemId } = req.body;

    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    const attempt = await Attempt.create({
      problemId,
      solution: {
        classes: [],
        interfaces: [],
        relationships: [],
        explanation: "",
      },
      status: "DRAFT",
    });

    res.status(201).json(attempt);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateAttempt = async (req, res) => {
  try {
    const attempt = await Attempt.findById(
      req.params.id
    );

    if (!attempt) {
      return res.status(404).json({
        message: "Attempt not found",
      });
    }

    attempt.solution = req.body.solution;

    await attempt.save();

    res.json(attempt);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const submitAttempt = async (req, res) => {
  try {
    const attempt = await Attempt.findById(
      req.params.id
    );

    if (!attempt) {
      return res.status(404).json({
        message: "Attempt not found",
      });
    }

    const problem = await Problem.findById(
      attempt.problemId
    );

    attempt.status = "EVALUATING";
    await attempt.save();

    const result =
      await evaluationService.evaluate(
        attempt.solution,
        problem
      );

    const finalScore = Math.round(
      result.ruleResult.score * 0.4 +
      result.aiResult.score * 0.6
    );

    const evaluation =
      await Evaluation.findOneAndUpdate(
        { attemptId: attempt._id },
        {
          attemptId: attempt._id,

          deterministic: {
            score: result.ruleResult.score,
            checks: result.ruleResult.checks,
          },

          ai: result.aiResult,

          finalScore,
        },
        {
          upsert: true,
          new: true,
        }
      );

    attempt.status = "COMPLETED";

    await attempt.save();

    res.json({
      attempt,
      evaluation,
    });
  } catch (error) {
    console.error(error);

    await Attempt.findByIdAndUpdate(
      req.params.id,
      {
        status: "EVALUATION_FAILED",
      }
    );

    res.status(500).json({
      message: "Evaluation failed",
      error: error.message,
    });
  }
};








export const getAttempt = async (req, res) => {
  try {
    const attempt = await Attempt.findById(
      req.params.id
    ).populate("problemId");

    if (!attempt) {
      return res.status(404).json({
        message: "Attempt not found",
      });
    }

    const evaluation =
      await Evaluation.findOne({
        attemptId: attempt._id,
      });

    res.json({
      attempt,
      evaluation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};






// export const getAttempts = async (req, res) => {
//   try {
//     const attempts = await Attempt.find()
//       .populate("problemId")
//       .sort({ createdAt: -1 });

//     const result = await Promise.all(
//       attempts.map(async (attempt) => {
//         const evaluation =
//           await Evaluation.findOne({
//             attemptId: attempt._id,
//           });

//         return {
//           ...attempt.toObject(),
//           evaluation,
//         };
//       })
//     );

//     res.json(result);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

export const getAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find()
      .populate("problemId")
      .sort({ createdAt: -1 })
      .lean();

    const evaluations = await Evaluation.find({
      attemptId: {
        $in: attempts.map((attempt) => attempt._id),
      },
    }).lean();

    const evaluationMap = new Map(
      evaluations.map((evaluation) => [
        evaluation.attemptId.toString(),
        evaluation,
      ])
    );

    const result = attempts.map((attempt) => ({
      ...attempt,
      evaluation:
        evaluationMap.get(attempt._id.toString()) ||
        null,
    }));

    res.json(result);
  } catch (error) {
    console.error("Failed to get attempts:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};