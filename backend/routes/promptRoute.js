import express from 'express';
import { SendPrompt } from '../controllers/promptController.js';
import userMiddleware from '../middleware/userMiddleware.js';

const router = express.Router();

router.post('/prompt', userMiddleware, SendPrompt);

export default router;