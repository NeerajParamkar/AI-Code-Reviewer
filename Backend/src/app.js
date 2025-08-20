import express from 'express'
import aiRoutes from "./Routes/ai.routes.js"
import cors from 'cors';
import {connectMongodb} from '../databaseConnection/connectMongo.js'
import ReviewedData from '../modules/reviewData.js'
const app=express();
app.use(cors());
 connectMongodb()

 
app.use(express.json());
app.get('/',(req,res)=>{
  res.send("hello User")
})
app.post('/ai/data',async (req,res)=>{
 const {fileName,review,code}=req.body;
//  console.log(fileName,review,code)
 res.json({data:{fileName,review,code}})
 const newUser = new ReviewedData({
    reviewName: fileName,
    reviewData: review,
    reviewCode: code
  });

  await newUser.save();
})



app.use('/ai',aiRoutes)


export default app;  