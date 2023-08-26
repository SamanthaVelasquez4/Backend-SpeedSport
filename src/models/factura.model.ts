import mongoose from "mongoose"
import { ClienteFactura } from "./cliente.model";
import { BaseEmpresa } from "./empresa.model";
import { ProductoCliente } from "./producto.model";

export interface Factura{
    _id?: mongoose.Types.ObjectId;
    fecha: string;
    cliente: ClienteFactura;
    numTarjetaCredito: string;
    empresa: BaseEmpresa;
    productos: ProductoCliente[];
    subtotal: number;
    isv: number;
    total: number;
}