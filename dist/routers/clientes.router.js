"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clientes_controller_1 = require("../controllers/clientes.controller");
const router = express_1.default.Router();
//Rutas
router.get('/', clientes_controller_1.obtenerClientes);
router.post('/', clientes_controller_1.agregarCliente);
exports.default = router;
