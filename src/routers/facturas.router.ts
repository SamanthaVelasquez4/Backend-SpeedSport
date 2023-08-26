import express from 'express'
import { obtenerFacturas } from '../controllers/facturas.controller';

const router=express.Router();

//Rutas
router.get('/', obtenerFacturas);

export default router;