"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    nombre: String,
    precio: Number,
    tallas: (Array),
    colores: (Array),
    _idEmpresa: mongoose_1.default.Types.ObjectId,
    img: String
});
exports.ProductoSchema = mongoose_1.default.model('productos', schema); // enlace a mongo
