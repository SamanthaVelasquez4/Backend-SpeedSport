import mongoose from "mongoose";
import { Cliente } from "./cliente.model";

const schema = new mongoose.Schema<Cliente>({
   primerNombre: String,
   segundoNombre: String,
   primerApellido: String,
   segundoApellido: String,
   usuario: String,
   contrasena: String,
   numTelefono: String,
   genero: String,
   edad: Number,
   pedidos: Array<mongoose.Types.ObjectId>
});

export const ClienteSchema = mongoose.model('clientes',schema);// enlace a mongo