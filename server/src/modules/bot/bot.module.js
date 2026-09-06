import criarService from "./bot.service.js";
import criarController from "./bot.controller.js";

export const service = criarService();
const controller = criarController(service);

export default controller;