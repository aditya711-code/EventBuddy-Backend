import express from 'express'
import { verifyToken} from '../middleware/auth.js';
import { addInterests,removeInterests ,deleteUser} from '../controllers/user.js';

const router=express.Router();
router.put("/:userId/interest",verifyToken,addInterests);
router.delete("/:userId/interest", verifyToken, removeInterests);
router.delete("/:userId",verifyToken,deleteUser);
export default router;