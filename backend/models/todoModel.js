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
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
