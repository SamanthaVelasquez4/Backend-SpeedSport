"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarEmpresa = exports.modificarEmpresa = exports.obtenerNombresEmpresas = exports.obtenerEmpresa = exports.obtenerEmpresas = exports.agregarEmpresa = void 0;
const empresa_schema_1 = require("../models/empresa.schema");
//Agregar Empresa
const agregarEmpresa = (req, res) => {
    const p = new empresa_schema_1.EmpresaSchema(req.body);
    p.save().then((saveResponse) => {
        res.send({ status: true, mensaje: "Empresa agregada correctamente", respuesta: saveResponse });
        res.end();
    }).catch((error) => {
        res.send({ status: false, message: 'Hubo un error al guardar empresa', respuesta: error });
        res.end();
    });
};
exports.agregarEmpresa = agregarEmpresa;
//Obtener empresas
const obtenerEmpresas = (req, res) => {
    empresa_schema_1.EmpresaSchema.find()
        .then((result) => {
        if (result.length > 0) {
            res.send({ status: true, mensaje: "Se obtuvo arreglo de empresas", respuesta: result });
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
exports.obtenerEmpresas = obtenerEmpresas;
//Obtener una empresa
const obtenerEmpresa = (req, res) => {
    empresa_schema_1.EmpresaSchema.findOne({ _id: req.params.id })
        .then((result) => {
        if (result != null) {
            res.send({ status: true, mensaje: "Se obtuvo empresa", respuesta: result });
            res.end();
        }
        else {
            res.send({ status: false, mensaje: "No existe empresa" });
            res.end();
        }
    })
        .catch((error) => {
        res.send({ status: false, mensaje: "Hubo un error al obtener la empresa", respuesta: error });
        res.end();
    });
};
exports.obtenerEmpresa = obtenerEmpresa;
//Obtener nombres de las empresas
const obtenerNombresEmpresas = (req, res) => {
    empresa_schema_1.EmpresaSchema.find({}, { nombre: true })
        .then((result) => {
        if (result.length > 0) {
            res.send({ status: true, mensaje: "Se obtuvo arreglo de empresas", respuesta: result });
            res.end();
        }
        else {
            res.send({ status: false, mensaje: "Arreglo vacio" });
            res.end();
        }
    })
        .catch((error) => {
        res.send({ status: false, mensaje: "Hubo un error al obtener el arreglo", respuesta: error });
        res.end();
    });
};
exports.obtenerNombresEmpresas = obtenerNombresEmpresas;
//Modificar una empresa
const modificarEmpresa = (req, res) => {
    empresa_schema_1.EmpresaSchema.updateOne({ _id: req.params.id }, req.body)
        .then((updateResponse) => {
        if (updateResponse.acknowledged) {
            res.send({ status: true, message: 'Empresa actualizada', respuesta: updateResponse });
            res.end();
        }
        else {
            res.send({ status: false, mensaje: "Empresa no encontrado" });
            res.end();
        }
    }).catch((error) => {
        res.send({ status: false, mensaje: "Hubo un error", respuesta: error });
        res.end();
    });
};
exports.modificarEmpresa = modificarEmpresa;
//Borrar Empresa
const eliminarEmpresa = (req, res) => {
    empresa_schema_1.EmpresaSchema.deleteOne({ _id: req.params.id })
        .then((removeResult) => {
        if (removeResult.deletedCount > 0) {
            res.send({ status: true, message: 'Empresa eliminada', respuesta: removeResult });
            res.end();
        }
        else {
            res.send({ status: false, mensaje: "Empresa no encontrada" });
            res.end();
        }
    }).catch((error) => {
        res.send({ status: false, message: 'Hubo un error al Eliminar', error });
        res.end();
    });
};
exports.eliminarEmpresa = eliminarEmpresa;
