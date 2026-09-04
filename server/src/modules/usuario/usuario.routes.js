import Router from 'express';
import controller from './usuario.module.js';

const router = Router();

router.post('/teste/', controller.teste);
router.get('/', controller.listar);

export default router;