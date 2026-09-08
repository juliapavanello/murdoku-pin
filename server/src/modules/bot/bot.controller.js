import RESPONSE from '../../shared/constants/response.js';
import { normalizarTabuleiro } from './regras/tabuleiro.mapper.js';

function criarControllerUsuario(service) {
  async function gameStart(req, res) {
    const payload = req.body;
    if (!payload || !payload.suspeitos || !payload.tabuleiro) {
      res.json({ ...RESPONSE.ERRO_DESCONHECIDO, payload: { msg: "Tabuleiro não recebido!", payload: req.body } });
      return;
    }
    payload.tabuleiro = normalizarTabuleiro(payload.tabuleiro);
    const data = await service.gameStart(payload);

    res.json({ ...RESPONSE.SUCESSO, payload: data });
  }

  return { gameStart };
}

export default criarControllerUsuario;
