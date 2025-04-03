const challengeSubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
    },
    code: {
      type: String, // Kode yang dikirimkan oleh user
      required: true,
    },
    results: [
      {
        testCaseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Challenge.testCases",
        },
        passed: {
          type: Boolean, // Apakah uji coba berhasil?
          required: true,
        },
        output: {
          type: String, // Output dari kode user
        },
      },
    ],
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

challengeSubmissionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const ChallengeSubmission = mongoose.model(
  "ChallengeSubmission",
  challengeSubmissionSchema
);

export default ChallengeSubmission;