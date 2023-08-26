import express from 'express'
import { agregarEmpresa, eliminarEmpresa, modificarEmpresa, obtenerEmpresa, obtenerEmpresas, obtenerNombresEmpresas } from '../controllers/empresas.controller';

const router=express.Router();

//Usadas en la app de administradores
router.post('/', agregarEmpresa);
router.get('/:id', obtenerEmpresa);
router.put('/:id', modificarEmpresa);
router.delete('/:id', eliminarEmpresa);
router.get('/administrador/nombres', obtenerNombresEmpresas);

//Usadas en varias
router.get('/', obtenerEmpresas);

export default router;