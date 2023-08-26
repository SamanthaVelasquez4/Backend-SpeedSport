import mongoose from "mongoose"

export interface BaseProducto{
    _id?: mongoose.Types.ObjectId;
    nombre: string;
    precio: number;
}

export interface ProductoAdmin extends BaseProducto{
    tallas: string [];
    colores: string[];
    _idEmpresa: mongoose.Types.ObjectId;
    img: string;
}

export interface ProductoCliente extends BaseProducto{
    tallaElegida: string;
    colorElegido: string;
    cantidad: number;
}