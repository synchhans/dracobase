import mongoose from "mongoose";

const debuggingSchema = new mongoose.Schema(
  {
    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language.materials",
      required: true,
    },
    error: {
      type: new mongoose.Schema({
        message: { type: String, required: true },
        type: { type: String, required: true },
        lineNumber: { type: Number, default: null },
      }),
      required: true,
    },
    solution: {
      type: String,
    },
    debugLogs: {
      type: [String],
      default: [],
    },
    resolved: {
      type: Boolean,
      required: true,
      default: false,
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

debuggingSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Debugging = mongoose.model("Debugging", debuggingSchema);

export default Debugging;
