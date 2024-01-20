import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getEvents ,getEventsByCity} from '../controllers/event.js';
const router=express.Router();

router.get('/',verifyToken,getEvents)
router.get('/city',verifyToken,getEventsByCity)
export default router;