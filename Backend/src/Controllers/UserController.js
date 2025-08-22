import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import User from "../../modules/user.js";
import ReviewedData from "../../modules/reviewData.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const Createprofile = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const getUser = await User.findOne({ email });
    if (getUser) {
      return res.json({ message: "User with given Email exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ userName, email, password: hashedPassword });
    await user.save();

   const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

    res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
});


    // Send response
    res.json({ message: "User has been created", user: { userName, email } , success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const LoginProfile= async (req,res)=>{
  try {
    const {email,password} = req.body;
  const getUser = await User.findOne({ email });

if (!getUser) {
  return res.json({ message: "User not Found", success: false });
}
  const isMatch = await bcrypt.compare(password, getUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials", success: false });
    }

     const token=jwt.sign({id:getUser._id},process.env.JWT_SECRET,{expiresIn:'7d'});

    res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
res.status(200).json({ message: "Login successful", success: true,getUser,token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", success: false });
  }
}
export const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully 🚀",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};

export const storeData =async (req,res)=>{

  try {
      const id=req.user.id
      
  const user = await User.findById(id);
if (!user) {
  return res.status(404).json({ message: "User not found" });
}

const userId =user._id; 

 const {fileName,review,code}=req.body;
 const newUser = new ReviewedData({
    reviewName: fileName,
    reviewData: review,
    reviewCode: code,
    user: user._id,
  });

  await newUser.save();
  await User.findByIdAndUpdate(
  userId,
  { $push: { reviews: newUser._id } },
  { new: true }
);

  res.json({success:true,message:"responce saved"})
  } catch (error) {
    res.json({message:error.message,success:false})
  }

}
export const DeleteData =async (req,res) =>{
  const {reid,usid}=req.body
  await User.findByIdAndUpdate(
  usid,
  { $pull: { reviews: reid } },  
  { new: true } 
);
await ReviewedData.findByIdAndDelete(reid)
  res.json({message:"Reponce Deleted"})
}
export const getData=async (req,res)=>{
  const id=req.user.id
  const user = await User.findById(id).populate("reviews");
  // console.log("User with files:", user);
  if(!user) console.log("User not found")
  res.json({message:"The data is here",user})
  return;
}
