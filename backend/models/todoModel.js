const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Must be provided todo title"],
      maxlength: [30, "name must be less than 30 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Must be provided todo description"],
    },
    completed: {
      type: Boolean,
      default: false,
      required: [true, "Must be provided todo completion"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
