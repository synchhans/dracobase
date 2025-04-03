const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    languageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
      required: true,
    },
    difficulty: {
      type: String, // Contoh: "easy", "medium", "hard"
      required: true,
    },
    testCases: [
      {
        input: {
          type: String, // Input untuk uji coba
          required: true,
        },
        expectedOutput: {
          type: String, // Output yang diharapkan
          required: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

challengeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Challenge = mongoose.model("Challenge", challengeSchema);

export default Challenge;