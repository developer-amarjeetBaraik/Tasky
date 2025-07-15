import mongoose, { Schema } from "mongoose";
import User from "./userSchema.js";
import Task from "./taskSchema.js";
import Board from "./boardSchema.js";

const activityLogSchema = new mongoose.Schema({
    boardId: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
        require: true,
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
    },
    action: {
        type: String,
        required: true,
        enum: ["create", "update", "delete", "assign", "re-assign", "drag", "status-change", "priority-change", "conflict-resolve"]
    },
})

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema)

export default ActivityLog

// {
//   _id: ObjectId,
//   taskId: ObjectId, // ref to tasks._id
//   userId: ObjectId, // ref to users._id
//   action: "create" | "update" | "delete" | "assign" | "drag" | "status-change" | "conflict-resolve",
//   description: String, // human-readable log (e.g., "John moved 'Task A' to Done")
//   timestamp: Date
// }
