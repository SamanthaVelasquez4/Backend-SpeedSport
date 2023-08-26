import mongoose from "mongoose";
import { BasePersona } from "./motorista.model";

export interface Cliente extends BasePersona{
    pedidos: mongoose.Types.ObjectId[];
}

export interface ClienteFactura{
    _id: string;
    nombre: string;
    numTelefono: string;
    usuario: string;
}