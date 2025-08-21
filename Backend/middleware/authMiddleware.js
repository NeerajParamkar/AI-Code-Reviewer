import dotenv from 'dotenv';
dotenv.config();

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, Please login" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); 
  } catch (err) {
    console.error("❌ Auth error:", err.message);
    return res.status(401).json({ message: "Unauthorized, token invalid" });
  }
};

export default authMiddleware;
