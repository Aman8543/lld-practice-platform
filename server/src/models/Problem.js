import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    requirements: [
      {
        type: String,
      },
    ],

    constraints: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;