"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const motoristas_controllers_1 = require("../controllers/motoristas.controllers");
//import { obtenerPedidoEstadoEspecificoMotorista } from '../controllers/pedidos.controller';
const router = express_1.default.Router();
//Usadas Solo en admin
router.post('/', motoristas_controllers_1.agregarMotorista);
router.get('/administrador/pedidos', motoristas_controllers_1.obtenerMotoristasAdministrador);
router.put('/:id', motoristas_controllers_1.modificarMotorista);
router.delete('/:id', motoristas_controllers_1.eliminarMotorista);
//Usadas en la app de motoristas
router.post('/login', motoristas_controllers_1.loginMotorista);
router.get('/', motoristas_controllers_1.obtenerMotoristas); //quita los arreglos
router.get('/:id', motoristas_controllers_1.obtenerMotorista);
//router.get('/:id/obtenerPedidos/:estado', obtenerPedidoEstadoEspecificoMotorista);
router.put('/:idMotorista/pedido/:idPedido', motoristas_controllers_1.agregarTomadoMotorista);
router.put('/:idMotorista/pedido/entregado/:idPedido', motoristas_controllers_1.pedidoEntregado);
router.put('/:idMotorista/mensajeLeido/:posicionArreglo', motoristas_controllers_1.MensajeLeido);
router.put('/:idMotorista/eliminar/mensaje/:posicionArreglo/prueba', motoristas_controllers_1.borrarMensaje);
router.post('/actalizar/contrasena', motoristas_controllers_1.actualizarContrasena);
//usadas en la app de clientes
router.put('/:id/actualizar/calificacion', motoristas_controllers_1.ActualizarMotoristaCalificacion);
//usada en varias apps
exports.default = router;
