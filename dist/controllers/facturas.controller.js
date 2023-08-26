"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerFacturas = void 0;
const factura_schema_1 = require("../models/factura.schema");
//obtener Facturas
const obtenerFacturas = (req, res) => {
    factura_schema_1.FacturaSchema.find({})
        .then((result) => {
        if (result.length > 0) {
            res.send({ status: true, mensaje: "Se obtuvo arreglo de facturas", respuesta: result });
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
exports.obtenerFacturas = obtenerFacturas;
