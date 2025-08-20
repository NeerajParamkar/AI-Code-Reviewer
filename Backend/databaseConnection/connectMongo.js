import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config();


export async function connectMongodb(){
  try {
    mongoose.connect(process.env.MONGOdB_URL) 
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Connection error:", err));

  } catch (error) {
    console.log("error in db connection")
  }
}