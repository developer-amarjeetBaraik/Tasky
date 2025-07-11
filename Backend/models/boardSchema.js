import mongoose from "mongoose";
import ActivityLog from "./activityLogSchema";

const boardSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        require:true,
        default:new Date(Date.now())
    },
    description:{
        type:String
    },
    activityLog:[ActivityLog]
})

const TaskyBoard = mongoose.model('TaskyBoard',boardSchema)

export default TaskyBoard

// {
//   _id: ObjectId,
//   name: "Main Team Board",
//   createdAt: Date,
//   createdBy: ObjectId,
//   description: String
// }
