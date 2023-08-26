"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerCliente = exports.obtenerClientes = exports.agregarCliente = exports.loginCliente = void 0;
const cliente_schema_1 = require("../models/cliente.schema");
//login cliente
const loginCliente = (req, res) => {
    cliente_schema_1.ClienteSchema.findOne({ usuario: req.body.usuario, contrasena: req.body.contrasena }, { contrasena: false })
        .then((result) => {
        if (result != null) {
            res.send({ status: true, mensaje: "Usuario encontrado", respuesta: result });
            res.end();
        }
        else {
            res.send({ status: false, mensaje: "Usuario inexistente" });
            res.end();
        }
    })
        .catch((error) => {
        res.send({ status: false, mensaje: "Hubo un error al obtener el motorista", respuesta: error });
        res.end();
    });
};
exports.loginCliente = loginCliente;
//agregar cliente
const agregarCliente = (req, res) => {
    const p = new cliente_schema_1.ClienteSchema(req.body);
    p.save().then((saveResponse) => {
        res.send({ status: true, mensaje: "Cliente agregado correctamente", respuesta: saveResponse });
        res.end();
    }).catch((error) => {
        res.send({ status: false, message: 'Hubo un error al guardar cliente', respuesta: error });
        res.end();
    });
};
exports.agregarCliente = agregarCliente;
//obtener clientes
const obtenerClientes = (req, res) => {
    cliente_schema_1.ClienteSchema.find({}, { contrasena: false })
        .then((result) => {
        if (result.length > 0) {
            res.send({ status: true, mensaje: "Se obtuvo arreglo de Clientes", respuesta: result });
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
exports.obtenerClientes = obtenerClientes;
//obtener un cliente
const obtenerCliente = (req, res) => {
    cliente_schema_1.ClienteSchema.findOne({ _id: req.params.id }, { contrasena: false })
        .then((result) => {
        if (result != null) {
            res.send({ status: true, mensaje: "Se obtuvo usuario", respuesta: result });
            res.end();
        }
        else {
            res.send({ status: false, mensaje: "No existe usuario" });
            res.end();
        }
    })
        .catch((error) => {
        res.send({ status: false, mensaje: "Hubo un error al obtener el usuario", respuesta: error });
        res.end();
    });
};
exports.obtenerCliente = obtenerCliente;
