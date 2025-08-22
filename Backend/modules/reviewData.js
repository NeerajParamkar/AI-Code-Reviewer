import mongoose from 'mongoose'
import moment from "moment-timezone";

const ReviewedDataSchema = new mongoose.Schema({
  reviewName:{
    type:String,
    require:true,
  },
  createdAt: {
  type: Date,
   default: () => new Date(new Date().getTime()), 
  },
  reviewData:{
    type:String,
    require:true
  },
  reviewCode:{
    type:String,
    require:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

})

const ReviewedData = mongoose.model("ReviewedData", ReviewedDataSchema);

export default ReviewedData;