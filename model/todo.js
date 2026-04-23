
import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ["pending", "in progress", "completed"],
        default: "pending",
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true,
    }

}, { timestamps: true });

export const Todo = mongoose.models.Todo || mongoose.model("Todo", Schema)