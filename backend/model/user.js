import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true
    },
    isVerified:{
        type: Boolean,
        default:true
    },
    setPasswordToken: String,
    resetPasswordExpiresAt:Date,
    verificationToken: String,
    verificationTokenExpiresAt:Date,
},
        {
            versionKey:false
        }
)

export const User = mongoose.model("List",userSchema)
