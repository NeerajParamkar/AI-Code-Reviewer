const { response } = require("../app");
const aiService=require("../services/ai.service")

module.exports.getReview= async (req,res)=>{
  const code=req.body.code;
  if(!code){
    return res.status(400).send("Prompt is required")
  }
  const response=await aiService.GetInfoResponse(code);
  res.send(response)
}
