import mongoose, { Schema } from "mongoose";
import User from "./userSchema.js";
import Board from "./boardSchema.js";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    boardId:{
        type:Schema.Types.ObjectId,
        ref:'Board',
        require:true,
    },
    status: {
        type: String,
        required: true,
        default: 'Todo',
        enum: ['Todo', 'In Progress', 'Done']
    },
    priority: {
        type: String,
        required: true,
        default: 'Medium',
        enum: ['Low', 'Medium', 'High']
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: User,
        require:true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(Date.now())
    },
    updatedAt: {
        type: Date,
        required: true,
        default: new Date(Date.now())
    },
    lastEditedBy: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    position: {
        type: Number,
        required: true,
    },
    conflict: {
        isConflicted: {
            type: Boolean,
        },
        versionA: {
            userId: Schema.Types.ObjectId,
            title: String,
            description: String,
            timestamp: Date,
        },
        versionB: {
            userId: Schema.Types.ObjectId,
            title: String,
            description: String,
            timestamp: Date,
        },
        resolvedBy:Schema.Types.ObjectId
    }
})

const Task = mongoose.model('Task',taskSchema)

export default Task

//   conflict: {
//     isConflicted: Boolean,
//     versionA: {
//       userId: ObjectId,
//       title: String,
//       description: String,
//       timestamp: Date,
//     },
//     versionB: {
//       userId: ObjectId,
//       title: String,
//       description: String,
//       timestamp: Date,
//     },
//     resolvedBy: ObjectId, // null if unresolved
//   }



//   _id: ObjectId,
//   title: String, // must be unique per board
//   description: String,
//   status: "Todo" | "In Progress" | "Done",
//   priority: "Low" | "Medium" | "High",
//   assignedTo: ObjectId, // ref to users._id
//   createdBy: ObjectId, // ref to users._id
//   createdAt: Date,
//   updatedAt: Date,
//   lastEditedBy: ObjectId, // ref to users._id
//   position: Number, // to help sort within a column (for drag-drop)