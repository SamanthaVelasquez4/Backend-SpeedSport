import mongoose from "mongoose";
import { Mensaje, Motorista } from "./motorista.model";

const schema = new mongoose.Schema<Motorista>({
    primerNombre: String,
    segundoNombre: String,
    primerApellido: String,
    segundoApellido: String,
    usuario: String,
    contrasena: String,
    numTelefono: String,
    genero: String,
    edad: Number,
    pedidoTomados: Array<mongoose.Types.ObjectId>,
    pedidoEntregados: Array<mongoose.Types.ObjectId>,
    mensajes: Array<Mensaje>,
    tipoVehiculo: String,
    placa: String,
    calificacion: Number,
    img:String
});

export const MotoristaSchema = mongoose.model('motoristas',schema);// enlace a mongo