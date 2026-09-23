/**
 * Carregado com `node --import` antes do benchmark: redireciona qualquer
 * import de infrastructure/websocket/websocket.js para websocket-falso.js,
 * sem precisar alterar o código do bot.
 */
import { register } from "node:module";

const urlFalso = new URL("./websocket-falso.js", import.meta.url).href;

register(
  "data:text/javascript," +
    encodeURIComponent(`
      export async function resolve(especificador, contexto, proximo) {
        if (especificador.endsWith("infrastructure/websocket/websocket.js")) {
          return { url: ${JSON.stringify(urlFalso)}, shortCircuit: true };
        }
        return proximo(especificador, contexto);
      }
    `)
);
