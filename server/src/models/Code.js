import mongoose from "mongoose";

const codeSchema = new mongoose.Schema(
  {
    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language.materials",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    editorSettings: {
      type: {
        theme: { type: String, default: "vs-light" },
        fontSize: { type: Number, default: 14 },
        tabSize: { type: Number, default: 4 },
        lineNumbers: { type: Boolean, default: true },
        wordWrap: { type: String, default: "off" },
      },
      default: {},
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

codeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Code = mongoose.model("Code", codeSchema);

export default Code;
