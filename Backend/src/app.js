const express= require('express');
const aiRoutes=require("./Routes/ai.routes")
const cors=require('cors');

const app=express();
app.use(cors());

app.use(express.json());
app.get('/',(req,res)=>{
  res.send("hello User")
})
app.use('/ai',aiRoutes)

module.exports=app;