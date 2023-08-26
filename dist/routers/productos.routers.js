"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productos_controllers_1 = require("../controllers/productos.controllers");
const router = express_1.default.Router();
//Rutas
router.post('/', productos_controllers_1.agregarProducto);
router.get('/', productos_controllers_1.obtenerProductos);
router.get('/empresa/:id', productos_controllers_1.obtenerProductosEmpresa);
router.get('/:id', productos_controllers_1.obtenerProducto);
router.put('/:id', productos_controllers_1.modificarProducto);
router.delete('/:id', productos_controllers_1.eliminarProducto);
router.delete('/empresa/:id', productos_controllers_1.eliminarProductosEmpresa);
router.get('/:id/obtener/imagen', productos_controllers_1.obtenerImagenesProducto);
exports.default = router;
