"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const empresas_controller_1 = require("../controllers/empresas.controller");
const router = express_1.default.Router();
//Usadas en la app de administradores
router.post('/', empresas_controller_1.agregarEmpresa);
router.get('/:id', empresas_controller_1.obtenerEmpresa);
router.put('/:id', empresas_controller_1.modificarEmpresa);
router.delete('/:id', empresas_controller_1.eliminarEmpresa);
router.get('/administrador/nombres', empresas_controller_1.obtenerNombresEmpresas);
//Usadas en varias
router.get('/', empresas_controller_1.obtenerEmpresas);
exports.default = router;
