import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true, 
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default: new Date(Date.now())
    },
    updatedAt:{
        type:Date,
        default:new Date(Date.now()) 
    },
    isOnline:{
        type:Boolean,
        default:false
    },
})

userSchema.methods.toSafeObject = function (){
    const {_id, name, email, isOnline} = this;
    return {_id, name, email, isOnline};
}

const User = mongoose.model('User', userSchema)

export default User