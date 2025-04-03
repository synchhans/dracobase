const codeSubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    languageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
      required: true,
    },
    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language.materials",
      required: true,
    },
    code: {
      type: String, // Kode yang dikirimkan oleh user
      required: true,
    },
    aiAnalysis: {
      type: {
        status: {
          type: String, // Contoh: "success", "error"
          required: true,
        },
        message: {
          type: String, // Pesan dari AI (feedback otomatis)
          required: true,
        },
        suggestions: [
          {
            type: String, // Saran debugging atau perbaikan
          },
        ],
      },
      default: {},
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

codeSubmissionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const CodeSubmission = mongoose.model("CodeSubmission", codeSubmissionSchema);

export default CodeSubmission;
