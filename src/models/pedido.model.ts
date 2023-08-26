import mongoose from "mongoose"
import { MotoristaPedido } from "./motorista.model"

export type EstadoCliente= "Buscando Repartidor" | "En camino" | "En tienda" | "En destino" | "Entregado";
export type EstadoPedido= "Pedido" | "Tomado" | "Entregado";

export interface Pedido{
    _id?: mongoose.Types.ObjectId;
    img: string;
    _idFactura: mongoose.Types.ObjectId;
    costoEnvio: number;
    motorista: MotoristaPedido | null;
    ubicacion: string;
    calificacion: number;
    estadoCliente: EstadoCliente;
    estadoPedido: EstadoPedido;
    total: number;
}