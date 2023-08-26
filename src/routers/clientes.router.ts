import express from 'express'
import { agregarCliente, loginCliente, obtenerClientes } from '../controllers/clientes.controller';
import { obtenerEntragosCliente, obtenerPedidosEnProcesoCliente } from '../controllers/pedidos.controllers';

const router=express.Router();

//Rutas
router.get('/', obtenerClientes);
router.post('/', agregarCliente);
router.post('/login', loginCliente);
router.get('/:id/obtenerEntregados', obtenerEntragosCliente);
router.get('/:id/obtener/pedidos/tomados', obtenerPedidosEnProcesoCliente );
export default router;