const aiInteractionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    query: {
      type: String, // Pertanyaan atau masalah yang diajukan user
      required: true,
    },
    response: {
      type: String, // Jawaban atau solusi dari AI
      required: true,
    },
    interactionType: {
      type: String, // Contoh: "debugging", "feedback", "question"
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

aiInteractionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const AIInteraction = mongoose.model("AIInteraction", aiInteractionSchema);

export default AIInteraction;
