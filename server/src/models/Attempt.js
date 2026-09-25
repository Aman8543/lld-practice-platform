import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
  },
  { _id: false }
);

const methodSchema = new mongoose.Schema(
  {
    name: String,
    returnType: String,
    parameters: [String],
  },
  { _id: false }
);

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    fields: [fieldSchema],

    methods: [methodSchema],
  },
  { _id: false }
);

const interfaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    methods: [methodSchema],
  },
  { _id: false }
);

const relationshipSchema = new mongoose.Schema(
  {
    from: String,

    to: String,

    type: {
      type: String,
      enum: [
        "association",
        "aggregation",
        "composition",
        "inheritance",
        "implements",
      ],
    },
  },
  { _id: false }
);

const attemptSchema = new mongoose.Schema(
  {
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    solution: {
      classes: [classSchema],

      interfaces: [interfaceSchema],

      relationships: [relationshipSchema],

      explanation: {
        type: String,
        default: "",
      },
    },

    status: {
      type: String,

      enum: [
        "DRAFT",
        "SUBMITTED",
        "EVALUATING",
        "COMPLETED",
        "EVALUATION_FAILED",
      ],

      default: "DRAFT",
    },
  },

  {
    timestamps: true,
  }
);

const Attempt = mongoose.model(
  "Attempt",
  attemptSchema
);

export default Attempt;