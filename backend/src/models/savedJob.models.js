import mongoose from "mongoose";

const savedJobSchema =
  new mongoose.Schema(

    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      jobId: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      company: {
        type: String,
        required: true,
        trim: true,
      },

      logoUrl: {
        type: String,
        default: "",
      },

      location: {
        type: String,
        default: "Not specified",
      },

      employmentType: {
        type: String,
        default: "Full-time",
      },

      isRemote: {
        type: Boolean,
        default: false,
      },

      applyLink: {
        type: String,
        required: true,
      },

      salary: {
        type: String,
        default: "Not disclosed",
      },

      postedAt: {
        type: String,
        default: "",
      },

      source: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },

      status: {
        type: String,

        enum: [
          "saved",
          "applied",
          "interview",
          "rejected"
        ],

        default: "saved",
      },

      appliedAt: {
        type: Date,
        default: null,
      },
    },

    {
      timestamps: true
    }
  );

// Prevent duplicates
savedJobSchema.index(
  {
    userId: 1,
    jobId: 1
  },
  {
    unique: true
  }
);

export const SavedJob =
  mongoose.model(
    "SavedJob",
    savedJobSchema
  );