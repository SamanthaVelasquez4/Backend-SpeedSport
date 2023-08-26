import express from 'express'
import { agregarProducto, eliminarProducto, eliminarProductosEmpresa, modificarProducto, obtenerImagenesProducto, obtenerProducto, obtenerProductos, obtenerProductosEmpresa } from '../controllers/productos.controllers';

const router=express.Router();

//Rutas
router.post('/', agregarProducto);
router.get('/', obtenerProductos);
router.get('/empresa/:id', obtenerProductosEmpresa);
router.get('/:id', obtenerProducto);
router.put('/:id', modificarProducto);
router.delete('/:id', eliminarProducto);
router.delete('/empresa/:id', eliminarProductosEmpresa);
router.get('/:id/obtener/imagen', obtenerImagenesProducto);

export default router;