import mongoose from "mongoose";

const aiFeedbackSchema = new mongoose.Schema(
  {
    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language.materials",
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
    feedbackType: {
      type: String,
      enum: ["debugging", "explanation", "suggestion", "other"],
      required: true,
    },
    confidenceScore: {
      type: Number,
      min: 0,
      max: 1,
      default: 0,
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

aiFeedbackSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const AIFeedback = mongoose.model("AIFeedback", aiFeedbackSchema);

export default AIFeedback;
