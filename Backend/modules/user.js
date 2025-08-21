import mongoose from 'mongoose'
import moment from "moment-timezone";

const userSchema=new mongoose.Schema({
  userName:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true,
    unique:true
  },
  password:{
    type:String,
    require:true
  },
  createdAt:{
    type:Date,
    default: () => new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000)), 
  },
  reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"ReviewedData"
    }
  ]
})

const User=mongoose.model("user",userSchema)

export default User