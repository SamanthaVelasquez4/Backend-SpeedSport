import mongoose from "mongoose";
import { Factura } from "./factura.model";
import { ProductoCliente } from "./producto.model";

const schema = new mongoose.Schema<Factura>({
    //_id: mongoose.Types.ObjectId,
    fecha: String,
    cliente: Object,
    numTarjetaCredito: String,
    empresa: Object,
    productos: Array<ProductoCliente>,
    subtotal: Number,
    isv: Number,
    total: Number
});

export const FacturaSchema = mongoose.model('facturas',schema);// enlace a mongo