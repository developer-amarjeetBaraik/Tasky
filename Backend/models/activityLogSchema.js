import mongoose, { Schema } from "mongoose";
import User from "./userSchema";
import Task from "./taskSchema";

const activityLogSchema = new mongoose.Schema({
    taskId: {
        type: Schema.Types.ObjectId,
        ref: Task,
        require: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: User,
        require: true,
    },
    action: {
        type: String,
        require: true,
        enum: ["create", "update", "delete", "assign", "re-assign", "drag", "status-change", "priority-change", "conflict-resolve"]
    },
    description: {
        type: String,
        require: true
    },
    timestamp: {
        type: Date,
        require: true,
    }
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
