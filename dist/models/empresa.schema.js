"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    nombre: String,
    numTelefono: String,
    direccion: String,
    horaApertura: String,
    horaCierre: String,
    img: String,
    tipo: (Array)
});
exports.EmpresaSchema = mongoose_1.default.model('empresas', schema); // enlace a mongo
