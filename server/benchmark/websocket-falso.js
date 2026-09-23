/**
 * Substitui src/infrastructure/websocket/websocket.js durante o benchmark
 * (ver registrar-websocket-falso.js). O bot.service lê `socketAberto` a cada
 * mensagem; aqui ele pode ser:
 *   - null: o service não envia nada (usado para medir tempo);
 *   - um socket contador: registra cada mensagem que iria para a interface.
 */
export let socketAberto = null;

export function usarSocketContador(aoReceber) {
  socketAberto = {
    readyState: 1,
    send: (mensagem) => aoReceber(JSON.parse(mensagem)),
  };
}

export function desligarSocket() {
  socketAberto = null;
}

export default function createWebSocketServer() {}
