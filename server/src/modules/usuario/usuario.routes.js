import Router from 'express';
import controller from './usuario.module.js';

const router = Router();

router.post('/teste/', controller.teste);

export default router;