import express from 'express'
import { verifyToken} from '../middleware/auth.js';
import { addInterests,getUserById,getUserInterests,removeInterests } from '../controllers/user.js';

const router=express.Router();

router.put("/:userId/interest",verifyToken,addInterests);
router.delete("/:userId/interest", verifyToken, removeInterests);
router.get("/:userId",verifyToken,getUserById);
router.get("/:userId/interests", verifyToken,getUserInterests);

export default router;