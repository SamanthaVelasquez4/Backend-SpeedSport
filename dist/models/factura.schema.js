"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturaSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    //_id: mongoose.Types.ObjectId,
    fecha: String,
    cliente: Object,
    numTarjetaCredito: String,
    empresa: Object,
    productos: (Array),
    subtotal: Number,
    isv: Number,
    total: Number
});
exports.FacturaSchema = mongoose_1.default.model('facturas', schema); // enlace a mongo
