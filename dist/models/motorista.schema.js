"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotoristaSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    primerNombre: String,
    segundoNombre: String,
    primerApellido: String,
    segundoApellido: String,
    usuario: String,
    contrasena: String,
    numTelefono: String,
    genero: String,
    edad: Number,
    pedidoTomados: (Array),
    pedidoEntregados: (Array),
    mensajes: (Array),
    tipoVehiculo: String,
    placa: String,
    calificacion: Number,
    img: String
});
exports.MotoristaSchema = mongoose_1.default.model('motoristas', schema); // enlace a mongo
