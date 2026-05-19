import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resumeUrl: {
      type: String,
      required: true,
    },

    originalName: {
      type: String,
    },

    title: {
      type: String,
      default: "My Resume",
    },

    extractedText: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    analysisCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Resume = mongoose.model("Resume", resumeSchema); 