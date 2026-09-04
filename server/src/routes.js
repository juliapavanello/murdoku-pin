import Router from 'express';

//ARQUIVOS DE ROTAS:
import usuarioRoutes from './modules/usuario/usuario.routes.js';

const router = Router();

//DEFINIÇÃO DAS ROTAS
router.use('/usuario', usuarioRoutes);

export default router;