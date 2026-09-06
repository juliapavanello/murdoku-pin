import Router from 'express';

//ARQUIVOS DE ROTAS:
import botRoutes from './modules/bot/bot.routes.js';

const router = Router();

//DEFINIÇÃO DAS ROTAS
router.use('/bot', botRoutes);

export default router;