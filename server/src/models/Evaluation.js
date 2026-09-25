import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema(
  {
    attemptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attempt",
      required: true,
      unique: true,
    },

    deterministic: {
      score: {
        type: Number,
        default: 0,
      },

      checks: [
        {
          name: String,
          passed: Boolean,
          message: String,
        },
      ],
    },

    ai: {
      score: {
        type: Number,
        default: 0,
      },

      strengths: [String],

      issues: [String],

      suggestions: [String],

      questions: [String],
    },

    finalScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Evaluation = mongoose.model(
  "Evaluation",
  evaluationSchema
);

export default Evaluation;