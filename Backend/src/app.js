import express from 'express'
import cookieParser from "cookie-parser";
import aiRoutes from "./Routes/ai.routes.js"
import cors from 'cors';
import {connectMongodb} from '../databaseConnection/connectMongo.js'
import ReviewedData from '../modules/reviewData.js'
import User  from "../modules/user.js";
import {Createprofile, getData, LoginProfile, storeData} from './Controllers/UserController.js'
import authMiddleware from '../middleware/authMiddleware.js';
const app=express();


connectMongodb()
app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true
}));

 
app.use(express.json());
app.get('/',(req,res)=>{
  res.send("hello User")
})

app.post('/profie',Createprofile)
app.post('/login',LoginProfile)
app.post('/ai/data',authMiddleware,storeData)
app.use('/ai',aiRoutes)



app.get("/getdata",authMiddleware,getData)
export default app;  
