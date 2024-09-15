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
  author: z.string().optional(), // Assuming author is a string (ID of the user)
});

export const userSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .refine(
      (value) => {
        const clean = escapeHTML(value);
        return clean === value;
      },
      {
        message: "Email must not include HTML!",
      }
    ),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .refine(
      (password) => {
        const strength = passwordStrengthMeter(password);
        return strength >= 3;
      },
      {
        message: "Password is too weak",
      }
    ),
});

function passwordStrengthMeter(password: string) {
  let strength = 0;

  if (password.length >= 8) {
    strength += 1;
  }

  if (/[A-Z]/.test(password)) {
    strength += 1;
  }

  if (/[a-z]/.test(password)) {
    strength += 1;
  }

  if (/[0-9]/.test(password)) {
    strength += 1;
  }

  if (/[!@#$%^&*]/.test(password)) {
    strength += 1;
  }

  return strength;
}
