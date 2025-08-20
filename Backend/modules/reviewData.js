import mongoose from 'mongoose'

const ReviewedDataSchema = new mongoose.Schema({
  reviewName:{
    type:String,
    require:true,
  },
  createdAt: {
  type: Date,
  default: Date.now
  },
  reviewData:{
    type:String,
    require:true
  },
  reviewCode:{
    type:String,
    require:true
  }
})

const ReviewedData = mongoose.model("ReviewedData", ReviewedDataSchema);

export default ReviewedData;