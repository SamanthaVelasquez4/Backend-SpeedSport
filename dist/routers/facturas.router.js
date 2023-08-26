"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const facturas_controller_1 = require("../controllers/facturas.controller");
const router = express_1.default.Router();
//Rutas
router.get('/', facturas_controller_1.obtenerFacturas);
exports.default = router;
