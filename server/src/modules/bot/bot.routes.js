import Router from 'express';
import controller from './bot.module.js';

const router = Router();

router.post('/start/', controller.gameStart);

export default router;