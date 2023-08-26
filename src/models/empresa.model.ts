import mongoose from "mongoose"

export interface BaseEmpresa{
    _id?: mongoose.Types.ObjectId;
    nombre: string;
    numTelefono: string;
    direccion: string;
}

export interface Empresa extends BaseEmpresa{
    horaApertura: string;
    horaCierre: string;
    img: string;
    tipo: string[];
} 