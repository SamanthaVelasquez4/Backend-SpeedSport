import mongoose  from "mongoose";
import { Empresa } from "./empresa.model";

const schema = new mongoose.Schema<Empresa>({
    nombre: String,
    numTelefono: String,
    direccion: String,
    horaApertura: String,
    horaCierre: String,
    img: String,
    tipo: Array<String>
});

export const EmpresaSchema = mongoose.model('empresas',schema);// enlace a mongo