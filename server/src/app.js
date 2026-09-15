import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import routes from './routes.js';

import errorMiddleware from './infrastructure/middlewares/error.middleware.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendRoot = process.env.FRONTEND_ROOT || path.resolve(__dirname, '..', '..');

app.use(cors());
app.use(express.json());

app.use('/api/v1',routes);

app.use('/assets', express.static(path.join(frontendRoot, 'assets')));
app.use('/css', express.static(path.join(frontendRoot, 'css')));
app.use('/js', express.static(path.join(frontendRoot, 'js')));

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendRoot, 'index.html'));
});

app.get(['/index.html', '/tabuleiro.html', '/historico.html'], (req, res) => {
  res.sendFile(path.join(frontendRoot, req.path.slice(1)));
});

app.use(errorMiddleware);

export default app;
