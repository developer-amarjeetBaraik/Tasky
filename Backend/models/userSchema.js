import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        Type:String,
        require:true,
    },
    email:{
        Type:String,
        require:true,
        unique:true,
    },
    password:{
        Type:String,
        require:true,
    },
    createdAt:{
        Type:Date,
        require:true,
        default: new Date(Date.now())
    },
    updatedAt:{
        Type:Date,
    },
    isOnline:{
        Type:Boolean,
    }
})

userSchema.methods.toSafeObject = function (){
    const {_id, name, email, isOnline} = this;
    return {_id, name, email, isOnline};
}

const User = mongoose.model('User', userSchema)

export default User