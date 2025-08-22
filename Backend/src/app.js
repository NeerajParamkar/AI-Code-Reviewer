import express from 'express'
import cookieParser from "cookie-parser";
import aiRoutes from "./Routes/ai.routes.js"
import cors from 'cors';
import {connectMongodb} from '../databaseConnection/connectMongo.js'
import ReviewedData from '../modules/reviewData.js'
import User  from "../modules/user.js";
import {Createprofile, DeleteData, getData, LoginProfile, LogoutUser, storeData} from './Controllers/UserController.js'
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
app.get('/', authMiddleware, async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id)
    let uname=user.userName
    return res.json({ message: "server started", uname });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/profie',Createprofile)
app.post('/login',LoginProfile)
app.post('/ai/data',authMiddleware,storeData)
app.use('/ai',aiRoutes)
app.post("/logout", LogoutUser);
app.post("/deletedata", DeleteData);


app.get("/getdata",authMiddleware,getData)
export default app;  
