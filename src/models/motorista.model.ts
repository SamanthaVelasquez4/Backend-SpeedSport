import mongoose from "mongoose"

export type Genero = "M"|"F";
export type Vehiculo= "Moto"| "Carro";

export interface Mensaje{
    encabezado: string;
    contenido: string;
    estado: boolean; //True para mensaje leido
}

export interface BasePersona{
    _id?: mongoose.Types.ObjectId;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    usuario: string;
    contrasena: string;
    numTelefono: string;
    genero: Genero;
    edad: number;
}

export interface Motorista extends BasePersona{
    pedidoTomados: mongoose.Types.ObjectId[];
    pedidoEntregados: mongoose.Types.ObjectId[];
    mensajes: Mensaje[];
    tipoVehiculo: Vehiculo;
    placa: string;
    calificacion: number;
    img:string;
}

export interface MotoristaPedido{
    _id: string;
    nombre: string;
    numTelefono: string;
    tipoVehiculo: string;
    placa: string;
    calificacion: number;
}