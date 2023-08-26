"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    //_id: mongoose.Types.ObjectId,
    img: String,
    _idFactura: mongoose_1.default.Types.ObjectId,
    costoEnvio: Number,
    motorista: Object,
    ubicacion: String,
    calificacion: Number,
    estadoCliente: String,
    estadoPedido: String,
    total: Number
});
exports.PedidoSchema = mongoose_1.default.model('pedidos', schema); // enlace a mongo
