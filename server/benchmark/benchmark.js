/**
 * Avaliação experimental do bot (backtracking com MRV já existente).
 *
 * Uso (dentro de server/):
 *   npm run benchmark
 *   npm run benchmark -- --repeticoes=30 --aquecimento=5
 *
 * Gera em server/benchmark/resultados/:
 *   instancias.csv  características de cada tabuleiro (não depende da execução)
 *   execucoes.csv   uma linha por execução cronometrada
 *   resumo.csv      estatísticas de tempo + contagens da busca por tabuleiro
 *   ambiente.txt    máquina, SO, versão do Node e parâmetros usados
 *
 * Os CSVs usam ";" e vírgula decimal para abrir direto no Excel/Sheets em pt-BR.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

import criarService from "../src/modules/bot/bot.service.js";
import REGRAS from "../src/modules/bot/regras/regras.js";
import { normalizarTabuleiro } from "../src/modules/bot/regras/tabuleiro.mapper.js";
import { socketAberto, usarSocketContador, desligarSocket } from "./websocket-falso.js";

const PASTA = path.dirname(fileURLToPath(import.meta.url));
const ARQUIVO_TABULEIROS = path.resolve(PASTA, "../../js/boards.js");
const PASTA_RESULTADOS = path.join(PASTA, "resultados");

const CODIGO_COLOCAR = 1;
const CODIGO_DESFAZER = 2;

function lerArgumentos() {
  const args = Object.fromEntries(
    process.argv.slice(2).map((arg) => arg.replace(/^--/, "").split("="))
  );
  return {
    repeticoes: Number(args.repeticoes ?? 30),
    aquecimento: Number(args.aquecimento ?? 5),
  };
}


function carregarTabuleiros() {
  const contexto = { window: {} };
  vm.runInNewContext(fs.readFileSync(ARQUIVO_TABULEIROS, "utf8"), contexto);
  return contexto.window.TABULEIROS;
}

function montarPayload(boardFront) {
  const tabuleiro = normalizarTabuleiro(structuredClone(boardFront));
  return { tabuleiro, suspeitos: tabuleiro.suspeitos };
}

// --- Tabela 1: características da instância --------------------------------
function dominioInicial(suspeito, suspeitos, tabuleiro) {
  const regra = REGRAS[suspeito.regraId] || REGRAS.semRestricao;
  return tabuleiro.celulas.filter(
    (celula) =>
      !celula.bloqueada &&
      regra({ celula, suspeito, suspeitos, tabuleiro, posicoes: {}, params: suspeito.regraParams })
  ).length;
}

function caracteristicas(board, { tabuleiro, suspeitos }) {
  const dominios = suspeitos.map((s) => dominioInicial(s, suspeitos, tabuleiro));
  const log10Espaco = dominios.includes(0)
    ? null
    : dominios.reduce((soma, d) => soma + Math.log10(d), 0);

  return {
    id: board.id,
    nome: board.nome,
    dificuldade: board.dificuldade,
    tamanho: `${board.tamanho}x${board.tamanho}`,
    celulas_total: tabuleiro.celulas.length,
    celulas_livres: tabuleiro.celulas.filter((c) => !c.bloqueada).length,
    suspeitos: suspeitos.length,
    comodos: (tabuleiro.comodos || []).length,
    regras_individuais: suspeitos.filter((s) => s.regraId && s.regraId !== "semRestricao").length,
    regras_globais: (tabuleiro.regrasGlobais || []).length,
    dominio_inicial_soma: dominios.reduce((a, b) => a + b, 0),
    dominio_inicial_media: dominios.reduce((a, b) => a + b, 0) / dominios.length,
    dominio_inicial_min: Math.min(...dominios),
    dominio_inicial_max: Math.max(...dominios),
    // Produto dos domínios iniciais (em log10, pois passa facilmente de 10^15).
    log10_espaco_busca: log10Espaco,
  };
}

// --- Execução de contagem (determinística, roda uma vez) --------------------
function contarChecagensDeRegras() {
  const originais = { ...REGRAS };
  const contador = { checagens: 0 };
  let dentroDeRegra = false;

  for (const [nome, regra] of Object.entries(originais)) {
    REGRAS[nome] = (dados) => {
      if (dentroDeRegra) return regra(dados);
      contador.checagens++;
      dentroDeRegra = true;
      try {
        return regra(dados);
      } finally {
        dentroDeRegra = false;
      }
    };
  }

  const restaurar = () => Object.assign(REGRAS, originais);
  return { contador, restaurar };
}

function confereGabarito(board, solucao) {
  if (!board.solucaoMock) return null;
  const esperado = Object.entries(board.solucaoMock);
  return (
    esperado.length === Object.keys(solucao).length &&
    esperado.every(([chave, suspeitoId]) => {
      const celula = solucao[suspeitoId];
      return celula && `${celula.linha}-${celula.coluna}` === chave;
    })
  );
}

function executarContagem(board) {
  const payload = montarPayload(board);
  const busca = { colocacoes: 0, desfazer: 0, profundidade: 0, profundidade_maxima: 0 };

  // Cada COLOCAR_SUSPEITO desce um nível na árvore e cada DESFAZER sobe um.
  usarSocketContador((mensagem) => {
    if (mensagem.code === CODIGO_COLOCAR) {
      busca.colocacoes++;
      busca.profundidade++;
      busca.profundidade_maxima = Math.max(busca.profundidade_maxima, busca.profundidade);
    } else if (mensagem.code === CODIGO_DESFAZER) {
      busca.desfazer++;
      busca.profundidade--;
    }
  });
  const { contador, restaurar } = contarChecagensDeRegras();

  let solucao = null;
  let erro = "";
  try {
    solucao = criarService().gameStart(payload);
  } catch (e) {
    erro = e?.message || String(e);
  } finally {
    restaurar();
    desligarSocket();
  }

  return {
    resolvido: Boolean(solucao),
    confere_gabarito: solucao ? confereGabarito(board, solucao) : false,
    jogadas: busca.colocacoes,
    backtracks: busca.desfazer,
    profundidade_maxima: busca.profundidade_maxima,
    checagens_regras: contador.checagens,
    erro,
  };
}

// --- Execuções cronometradas -------------------------------------------------
function executarCronometrado(board, { repeticoes, aquecimento }) {
  if (socketAberto !== null) throw new Error("O socket precisa estar desligado para medir tempo.");

  const service = criarService();
  const rodar = () => {
    const payload = montarPayload(board);
    const inicio = performance.now();
    try {
      service.gameStart(payload);
      return { tempo_ms: performance.now() - inicio, resolvido: true };
    } catch {
      return { tempo_ms: performance.now() - inicio, resolvido: false };
    }
  };

  for (let i = 0; i < aquecimento; i++) rodar();
  return Array.from({ length: repeticoes }, (_, i) => ({ repeticao: i + 1, ...rodar() }));
}

function estatisticas(valores) {
  const n = valores.length;
  const ordenados = [...valores].sort((a, b) => a - b);
  const media = valores.reduce((a, b) => a + b, 0) / n;
  const variancia = n > 1 ? valores.reduce((s, v) => s + (v - media) ** 2, 0) / (n - 1) : 0;
  const meio = Math.floor(n / 2);
  return {
    tempo_media_ms: media,
    tempo_desvio_ms: Math.sqrt(variancia),
    tempo_mediana_ms: n % 2 ? ordenados[meio] : (ordenados[meio - 1] + ordenados[meio]) / 2,
    tempo_min_ms: ordenados[0],
    tempo_max_ms: ordenados[n - 1],
  };
}

// --- Saída --------------------------------------------------------------------

function formatarValor(valor) {
  if (valor === null || valor === undefined) return "";
  if (typeof valor === "boolean") return valor ? "sim" : "nao";
  if (typeof valor === "number") {
    return Number.isInteger(valor) ? String(valor) : valor.toFixed(4).replace(".", ",");
  }
  const texto = String(valor);
  return /[;"\n]/.test(texto) ? `"${texto.replace(/"/g, '""')}"` : texto;
}

function salvarCsv(nomeArquivo, linhas) {
  const colunas = Object.keys(linhas[0]);
  const conteudo = [
    colunas.join(";"),
    ...linhas.map((linha) => colunas.map((c) => formatarValor(linha[c])).join(";")),
  ].join("\n");
  // BOM para o Excel reconhecer UTF-8 (acentos nos nomes dos tabuleiros).
  fs.writeFileSync(path.join(PASTA_RESULTADOS, nomeArquivo), "﻿" + conteudo + "\n");
}

function salvarAmbiente(parametros) {
  const cpus = os.cpus();
  const linhas = [
    `data: ${new Date().toISOString()}`,
    `cpu: ${cpus[0]?.model} (${cpus.length} núcleos lógicos)`,
    `memoria_total_gb: ${(os.totalmem() / 1024 ** 3).toFixed(1)}`,
    `so: ${os.type()} ${os.release()} (${os.arch()})`,
    `node: ${process.version}`,
    `repeticoes: ${parametros.repeticoes}`,
    `aquecimento: ${parametros.aquecimento}`,
    "tempo medido com performance.now() em volta de gameStart, sem WebSocket e sem interface",
  ];
  fs.writeFileSync(path.join(PASTA_RESULTADOS, "ambiente.txt"), linhas.join("\n") + "\n");
}

function main() {
  const parametros = lerArgumentos();
  const tabuleiros = carregarTabuleiros();
  fs.mkdirSync(PASTA_RESULTADOS, { recursive: true });

  const instancias = [];
  const execucoes = [];
  const resumo = [];

  for (const board of tabuleiros) {
    process.stdout.write(`[${board.id}] ${board.nome} (${board.dificuldade}, ${board.tamanho}x${board.tamanho})... `);

    const info = caracteristicas(board, montarPayload(board));
    const contagem = executarContagem(board);
    const tempos = executarCronometrado(board, parametros);

    instancias.push(info);
    for (const t of tempos) {
      execucoes.push({ id: board.id, nome: board.nome, dificuldade: board.dificuldade, ...t });
    }
    resumo.push({
      id: board.id,
      nome: board.nome,
      dificuldade: board.dificuldade,
      tamanho: info.tamanho,
      suspeitos: info.suspeitos,
      repeticoes: tempos.length,
      ...estatisticas(tempos.map((t) => t.tempo_ms)),
      ...contagem,
    });

    const ultimo = resumo[resumo.length - 1];
    console.log(
      contagem.resolvido
        ? `${ultimo.tempo_media_ms.toFixed(2)} ms, ${contagem.jogadas} jogadas, gabarito: ${formatarValor(contagem.confere_gabarito) || "sem gabarito"}`
        : `NÃO resolveu (${contagem.erro})`
    );
  }

  salvarCsv("instancias.csv", instancias);
  salvarCsv("execucoes.csv", execucoes);
  salvarCsv("resumo.csv", resumo);
  salvarAmbiente(parametros);

  console.log(`\nResultados salvos em ${PASTA_RESULTADOS}`);
}

main();
