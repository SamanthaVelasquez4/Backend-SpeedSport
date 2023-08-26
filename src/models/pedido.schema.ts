import mongoose, { Schema }  from "mongoose";
import { Pedido } from "./pedido.model";

const schema = new mongoose.Schema<Pedido>({
    //_id: mongoose.Types.ObjectId,
    img: String,
    _idFactura: mongoose.Types.ObjectId,
    costoEnvio: Number,
    motorista: Object,
    ubicacion: String,
    calificacion: Number,
    estadoCliente: String,
    estadoPedido: String,
    total: Number
});

export const PedidoSchema = mongoose.model('pedidos',schema);// enlace a mongo