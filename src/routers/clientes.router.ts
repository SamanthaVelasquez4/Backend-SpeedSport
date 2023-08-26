import express from 'express'
import { agregarCliente, obtenerClientes } from '../controllers/clientes.controller';

const router=express.Router();

//Rutas
router.get('/', obtenerClientes);
router.post('/', agregarCliente);

export default router;