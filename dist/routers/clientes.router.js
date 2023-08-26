"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clientes_controller_1 = require("../controllers/clientes.controller");
const pedidos_controllers_1 = require("../controllers/pedidos.controllers");
const router = express_1.default.Router();
//Rutas
router.get('/', clientes_controller_1.obtenerClientes);
router.post('/', clientes_controller_1.agregarCliente);
router.post('/login', clientes_controller_1.loginCliente);
router.get('/:id/obtenerEntregados', pedidos_controllers_1.obtenerEntragosCliente);
router.get('/:id/obtener/pedidos/tomados', pedidos_controllers_1.obtenerPedidosEnProcesoCliente);
exports.default = router;
