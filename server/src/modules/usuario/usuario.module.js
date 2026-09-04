import criarService from "./usuario.service.js";
import criarController from "./usuario.controller.js";

export const service = criarService();
const controller = criarController(service);

export default controller;