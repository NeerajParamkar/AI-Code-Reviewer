import express from 'express';
const router=express.Router();
import aiController from "../Controllers/ai.controller.js";


router.post('/get-review',aiController.getReview)

export default router; 