"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pedidos_controllers_1 = require("../controllers/pedidos.controllers");
const router = express_1.default.Router();
router.post('/cliente/:id', pedidos_controllers_1.agregarPedido);
router.get('/', pedidos_controllers_1.obtenerPedidos);
router.get('/obtener/:estado', pedidos_controllers_1.obtenerPedidosEstado);
router.get('/:id', pedidos_controllers_1.obtenerPedido);
router.put('/:idPedido/agregarAdminitrador/motorista/:idMotorista', pedidos_controllers_1.agregarMotoristaPedido);
router.put('/:id/cambiarEstadoCliente', pedidos_controllers_1.cambiarEstadoCliente);
exports.default = router;
