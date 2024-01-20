import express from 'express'
import { verifyToken} from '../middleware/auth.js';
import {getEventsUnderCategory,getRegisteredEvents,getUserById,getUserInterests,getUsersRegisteredForEvent,registerForEvent } from '../controllers/user.js';
import { addInterests,removeInterests ,deleteUser} from '../controllers/user.js';

const router=express.Router();

router.put("/:userId/interest",verifyToken,addInterests);
router.delete("/:userId/interest", verifyToken, removeInterests);
router.get("/:userId",verifyToken,getUserById);
router.get("/:userId/interests", verifyToken,getUserInterests);
router.delete("/:userId",verifyToken,deleteUser);
router.get("/:userId/registered-events", verifyToken, getRegisteredEvents);
router.post("/:userId/register-for-event", verifyToken, registerForEvent);
router.get("/events/:eventId/registered-users", verifyToken,getUsersRegisteredForEvent);

router.get("/categories/:categoryId/events", verifyToken, getEventsUnderCategory);

export default router;