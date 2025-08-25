import mongoose, { Schema } from "mongoose";
import ActivityLog from "./activityLogSchema.js";
import User from "./userSchema.js";

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Tasky board'
    },
    description: {
        type: String,
        default: 'This is defalut description, please change it according to your purpose.'
    },
    Stages:{
        type:[String],
        require:true,
        default:'Todo'
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(Date.now())
    },
    admins: {
        type: [Schema.Types.ObjectId],
        ref: User,
        require: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: User,
        require: true,
    },
    canEdit: {
        type: [Schema.Types.ObjectId],
        ref: User,
        require: true,
    }
})

const Board = mongoose.model('Board', boardSchema)

export default Board