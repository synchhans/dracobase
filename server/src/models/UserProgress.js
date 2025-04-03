const userProgressSchema = new mongoose.Schema(
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
    isCompleted: {
      type: Boolean,
      default: false,
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
    completedMaterials: [
      {
        materialId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Language.materials",
        },
        completedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

userProgressSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const UserProgress = mongoose.model("UserProgress", userProgressSchema);

export default UserProgress;