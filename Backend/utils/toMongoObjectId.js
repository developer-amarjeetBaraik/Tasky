import mongoose from "mongoose"
import AppError from "../errors/appError.js";

const toMongoObjectId = (stringMongoId, nameOfTheIdForErrorReferance = 'Id')=>{
    if(!mongoose.Types.ObjectId.isValid(stringMongoId)) throw new AppError(`Wrong '${nameOfTheIdForErrorReferance}', provided: '${stringMongoId}'`)
    return new mongoose.Types.ObjectId(stringMongoId)
}

export default toMongoObjectId; 