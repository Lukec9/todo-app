"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Todo", todoSchema);
