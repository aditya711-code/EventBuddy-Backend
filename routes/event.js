import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getEvents ,getEventsByCity,getEventById} from '../controllers/event.js';
const router=express.Router();

router.get('/',verifyToken,getEvents)
router.get('/city',verifyToken,getEventsByCity)
router.get('/:eventId',verifyToken,getEventById)
export default router;