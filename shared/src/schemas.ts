import { z } from "zod";
import sanitize from "sanitize-html";
import mongoose from "mongoose";

export const todoModelSchema = new mongoose.Schema(
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
      required: true,
    },
  },
  { timestamps: true }
);

// Custom extension for Zod to escape HTML
const escapeHTML = (value: string) => {
  const clean = sanitize(value, {
    allowedTags: [],
    allowedAttributes: {},
  });
  return clean;
};

// Todo Schema
export const todoSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(30)
    .trim()
    .transform((value) => escapeHTML(value)), // Sanitize title
  description: z
    .string()
    .min(1)
    .transform((value) => escapeHTML(value)), // Sanitize description
  completed: z.boolean(),
  author: z.string(), // Assuming author is a string (ID of the user)
});

// User Schema
// export const userSchema = z.object({
//   email: z.string()
//     .email()
//     .refine(value => {
//       const clean = escapeHTML(value);
//       return clean === value;
//     }, {
//       message: "Email must not include HTML!",
//     }),
//   todos: z.array(z.string()).optional(),
// });
