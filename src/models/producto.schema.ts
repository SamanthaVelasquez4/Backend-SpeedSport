import mongoose  from "mongoose";
import { ProductoAdmin } from "./producto.model";

const schema = new mongoose.Schema<ProductoAdmin>({
    nombre: String,
    precio: Number,
    tallas: Array<String>,
    colores: Array<String>,
    _idEmpresa: mongoose.Types.ObjectId,
    img: String
});

export const ProductoSchema = mongoose.model('productos',schema);// enlace a mongo