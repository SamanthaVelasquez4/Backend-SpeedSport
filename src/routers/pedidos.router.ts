import express from 'express'
import { agregarMotoristaPedido, agregarPedido, cambiarEstadoCliente, obtenerPedido, obtenerPedidos, obtenerPedidosEstado } from '../controllers/pedidos.controllers';

const router=express.Router();

router.post('/cliente/:id', agregarPedido);
router.get('/', obtenerPedidos);
router.get('/obtener/:estado', obtenerPedidosEstado);
router.get('/:id', obtenerPedido);
router.put('/:idPedido/agregarAdminitrador/motorista/:idMotorista', agregarMotoristaPedido);
router.put('/:id/cambiarEstadoCliente', cambiarEstadoCliente);

export default router;