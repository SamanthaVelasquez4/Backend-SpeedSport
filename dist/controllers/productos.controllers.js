"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarProductosEmpresa = exports.eliminarProducto = exports.modificarProducto = exports.obtenerProducto = exports.obtenerProductosEmpresa = exports.obtenerImagenesProducto = exports.obtenerProductos = exports.agregarProducto = void 0;
const producto_schema_1 = require("../models/producto.schema");
//AgregarProducto
const agregarProducto = (req, res) => {
    const p = new producto_schema_1.ProductoSchema(req.body);
    p.save().then((saveResponse) => {
        res.send({ status: true, mensaje: "Producto agregado correctamente", respuesta: saveResponse });
        res.end();
    }).catch((error) => {
        res.send({ status: false, message: 'Hubo un error al guardar producto', respuesta: error });
        res.end();
    });
};
exports.agregarProducto = agregarProducto;
//obtenerProductos
const obtenerProductos = (req, res) => {
    producto_schema_1.ProductoSchema.find({}, { img: false })
        .then((result) => {
        if (result.length > 0) {
            res.send({ status: true, mensaje: "Se obtuvo arreglo de productos", respuesta: result });
            res.end();
        }
        else {
            res.send({ status: true, mensaje: "Arreglo vacio", respuesta: result });
            res.end();
        }
    })
        .catch((error) => {
        res.send({ status: false, mensaje: "Hubo un error al obtener el arreglo", respuesta: error });
        res.end();
    });
};
exports.obtenerProductos = obtenerProductos;
//Obtener imagenes
const obtenerImagenesProducto = (req, res) => {
    producto_schema_1.ProductoSchema.findOne({ _id: req.params.id }, { img: true })
        .then((result) => {
        if (result != null) {
            res.send({ status: true, mensaje: "Se obtuvo imagen de productos", respuesta: result });
            res.end();
        }
        else {
            res.send({ status: true, mensaje: "No existe producto", respuesta: result });
            res.end();
        }
    })
        .catch((error) => {
        res.send({ status: false, mensaje: "Hubo un error al obtener el arreglo", respuesta: error });
        res.end();
    });
};
exports.obtenerImagenesProducto = obtenerImagenesProducto;
//obtener productos de una empresa
const obtenerProductosEmpresa = (req, res) => {
    producto_schema_1.ProductoSchema.find({ _idEmpresa: req.params.id }, { _idEmpresa: false })
        .then((result) => {
        if (result.length > 0) {
            res.send({ status: true, mensaje: "Se obtuvo arreglo de productos", respuesta: result });
            res.end();
        }
        else {
            res.send({ status: true, mensaje: "Arreglo vacio", respuesta: result });
            res.end();
        }
    })
        .catch((error) => {
        res.send({ status: false, mensaje: "Hubo un error al obtener el arreglo", respuesta: error });
        res.end();
    });
};
exports.obtenerProductosEmpresa = obtenerProductosEmpresa;
//obtener un producto
const obtenerProducto = (req, res) => {
    producto_schema_1.ProductoSchema.findOne({ _id: req.params.id })
        .then((result) => {
        if (result != null) {
            res.send({ status: true, mensaje: "Se obtuvo producto", respuesta: result });
            res.end();
        }
        else {
            res.send({ status: false, mensaje: "No existe producto" });
            res.end();
        }
    })
        .catch((error) => {
        res.send({ status: false, mensaje: "Hubo un error al obtener el producto", respuesta: error });
        res.end();
    });
};
exports.obtenerProducto = obtenerProducto;
//Modificar un producto
const modificarProducto = (req, res) => {
    producto_schema_1.ProductoSchema.updateOne({ _id: req.params.id }, req.body)
        .then((updateResponse) => {
        if (updateResponse.acknowledged) {
            res.send({ status: true, message: 'Producto actualizado', respuesta: updateResponse });
            res.end();
        }
        else {
            res.send({ status: false, mensaje: "Producto no encontrado" });
            res.end();
        }
    }).catch((error) => {
        res.send({ status: false, mensaje: "Hubo un error", respuesta: error });
        res.end();
    });
};
exports.modificarProducto = modificarProducto;
//Borrar producto
const eliminarProducto = (req, res) => {
    producto_schema_1.ProductoSchema.deleteOne({ _id: req.params.id })
        .then((removeResult) => {
        if (removeResult.deletedCount > 0) {
            res.send({ status: true, message: 'Producto eliminado', respuesta: removeResult });
            res.end();
        }
        else {
            res.send({ status: false, mensaje: "Producto no encontrado" });
            res.end();
        }
    }).catch((error) => {
        res.send({ status: false, message: 'Hubo un error al Eliminar', error });
        res.end();
    });
};
exports.eliminarProducto = eliminarProducto;
//Borrar productos de una empresa
const eliminarProductosEmpresa = (req, res) => {
    producto_schema_1.ProductoSchema.deleteMany({ _idEmpresa: req.params.id })
        .then((removeResult) => {
        if (removeResult.deletedCount > 0) {
            res.send({ status: true, message: 'Productos eliminados', respuesta: removeResult });
            res.end();
        }
        else {
            res.send({ status: true, mensaje: "Productos de empresa no encontrados" });
            res.end();
        }
    }).catch((error) => {
        res.send({ status: false, message: 'Hubo un error al Eliminar', error });
        res.end();
    });
};
exports.eliminarProductosEmpresa = eliminarProductosEmpresa;
