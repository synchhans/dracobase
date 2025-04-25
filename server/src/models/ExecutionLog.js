import mongoose from "mongoose";

const executionLogSchema = new mongoose.Schema(
  {
    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language.materials",
    },
    input: {
      type: String,
    },
    output: {
      type: String,
    },
    error: {
      type: {
        message: { type: String },
        type: { type: String },
        lineNumber: { type: Number, default: null },
      },
    },
    executedAt: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

executionLogSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const ExecutionLog = mongoose.model("ExecutionLog", executionLogSchema);

export default ExecutionLog;
