const express=require('express');
const router=express.Router();
const aiController=require("../Controllers/ai.controller")

router.post('/get-review',aiController.getReview)

module.exports=router