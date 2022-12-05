import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {type:String, minLength:3, maxLength:30},
    goal: {type:String},
    duration: {type:String},
    amount: {type:String},
    riskScore: {type:Number},
    email: {type:String},
    password: {type:String, minLength:3, maxLength:200},
}, {timestamps:true})

export const User = mongoose.model('User', UserSchema);












