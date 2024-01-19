import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getEvents } from '../controllers/event.js';
const router=express.Router();

router.get('/',verifyToken,getEvents)
export default router;