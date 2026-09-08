import RESPONSE from '../../shared/constants/response.js';
import { normalizarTabuleiro } from './regras/tabuleiro.mapper.js';

// Exemplo real, equivalente ao caso "O Chiqueiro" (id 1) do js/boards.js,
// já no novo formato esperado pelo service (suspeito.regraId + regraParams).
// Usado como fallback só pra o endpoint funcionar "out of the box" sem
// precisar já ter o front mandando o payload nesse formato.
const CASO_EXEMPLO = {
  tabuleiro: normalizarTabuleiro({
    tamanho: 5,
    gridInicial: [
      ["vazio", "vazio", "lama", "vazio", "vazio"],
      ["porco", "lama", "lama", "vazio", "lama"],
      ["vazio", "vazio", "vazio", "vazio", "vazio"],
      ["porco", "vazio", "porco", "vazio", "porco"],
      ["vazio", "vazio", "vazio", "vazio", "mesa"],
    ],
    celulasBloqueadas: ["1-0", "3-0", "3-2", "3-4", "4-4"],
    comodos: [
      {
        nome: "PÁTIO ENLAMEADO",
        celulas: ["0-0", "0-1", "0-2", "0-3", "0-4", "1-0", "1-1", "1-2", "1-3", "1-4", "2-1", "2-2"],
      },
      { nome: "PASTO", celulas: ["2-0", "3-0", "3-1", "3-2", "4-0", "4-1", "4-2"] },
      { nome: "CHIQUEIRO", celulas: ["2-3", "2-4", "3-3", "3-4", "4-3", "4-4"] },
    ],
  }),
  suspeitos: [
    { id: "andy", nome: "Andy", regraId: "estaNoComodo", regraParams: { comodo: "CHIQUEIRO" } },
    { id: "brent", nome: "Brent", regraId: "naoEstaSobreTipo", regraParams: { tipo: "lama" } },
    { id: "carissa", nome: "Carissa", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "mesa" } },
    { id: "dolores", nome: "Dolores", regraId: "estaNoComodo", regraParams: { comodo: "PASTO" } },
    { id: "eduardo", nome: "Eduardo", regraId: "semRestricao", isVitima: true },
  ],
};

function criarControllerUsuario(service) {
  async function gameStart(req, res) {
    const payload =
      req.body?.suspeitos && req.body?.tabuleiro ? req.body : CASO_EXEMPLO;

    const data = await service.gameStart(payload);

    res.json({ ...RESPONSE.SUCESSO, payload: data });
  }

  return { gameStart };
}

export default criarControllerUsuario;
