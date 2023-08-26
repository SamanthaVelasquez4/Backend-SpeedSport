"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cambiarEstadoCliente = exports.obtenerPedidoEstadoEspecificoMotorista = exports.obtenerPedido = exports.obtenerPedidosEstado = exports.agregarMotoristaPedido = exports.obtenerPedidos = exports.agregarPedido = void 0;
const pedido_schema_1 = require("../models/pedido.schema");
const mongoose_1 = __importDefault(require("mongoose"));
const factura_schema_1 = require("../models/factura.schema");
const motorista_schema_1 = require("../models/motorista.schema");
const cliente_schema_1 = require("../models/cliente.schema");
//Agregar pedido
const agregarPedido = (req, res) => {
    cliente_schema_1.ClienteSchema.findOne({ _id: req.params.id }, { contrasena: false })
        .then((result) => {
        if (result != null) {
            let sub = 0;
            req.body.factura.productos.forEach((producto) => {
                sub += producto.cantidad * producto.precio;
            });
            const facturaNueva = {
                "fecha": req.body.factura.fecha,
                "cliente": req.body.factura.cliente,
                "numTarjetaCredito": req.body.factura.numTarjetaCredito,
                "empresa": req.body.factura.empresa,
                "productos": req.body.factura.productos,
                "subtotal": sub,
                "isv": sub * 0.15,
                "total": (0.15 * sub) + sub,
            };
            const f = new factura_schema_1.FacturaSchema(facturaNueva);
            f.save().then((saveResponse) => {
                const pedido = {
                    "img": "https://img.freepik.com/vector-premium/caja-naranja-codigo-barras_867743-168.jpg?w=2000",
                    "_idFactura": saveResponse._id,
                    "costoEnvio": 65,
                    "motorista": null,
                    "ubicacion": req.body.ubicacion,
                    "calificacion": 0,
                    "estadoCliente": "Buscando repartidor",
                    "estadoPedido": "Pedido",
                    "total": saveResponse.total + 65
                };
                const p = new pedido_schema_1.PedidoSchema(pedido);
                p.save().then((saveResponse) => {
                    cliente_schema_1.ClienteSchema.updateOne({ _id: req.params.id }, {
                        $push: {
                            "pedidos": saveResponse._id
                        }
                    }).then((result) => {
                        if (result.modifiedCount > 0) {
                            //Todo salio bien
                            res.send({ status: true, mensaje: "Se agrego pedido al cliente correctamente", respuesta: result });
                            res.end();
                        }
                        else {
                            //no se encontro cliente (poco probable)
                            res.send({ status: false, mensaje: "No se encontró documento a modificar o arreglo" });
                            res.end();
                        }
                    }).catch((error) => {
                        return ({ status: false, mensaje: "Hubo un error", respuesta: error });
                    });
                }).catch((error) => {
                    res.send({ status: false, message: 'Hubo un error al guardar pedido', respuesta: error });
                    res.end();
                });
            }).catch((error) => {
                res.send({ status: false, message: 'Hubo un error al guardar factura', respuesta: error });
                res.end();
            });
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
exports.agregarPedido = agregarPedido;
//Obtener pedidos
const obtenerPedidos = (req, res) => {
    pedido_schema_1.PedidoSchema.find()
        .then((result) => {
        if (result.length > 0) {
            res.send({ status: true, mensaje: "Se obtuvo arreglo de pedidos", respuesta: result });
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
exports.obtenerPedidos = obtenerPedidos;
//agregar motorista a pedido
const agregarMotoristaPedido = (req, res) => {
    //confirmar que exista el motorista
    motorista_schema_1.MotoristaSchema.findOne({ _id: req.params.idMotorista })
        .then((result) => {
        if (result != null) {
            //Asignar motorista el pedido
            pedido_schema_1.PedidoSchema.updateOne({ _id: req.params.idPedido }, {
                $set: {
                    motorista: req.body,
                    estadoPedido: "Tomado",
                    estadoCliente: "En camino",
                    img: "https://img.freepik.com/vector-premium/icono-marca-verificacion-verde-pantalla-telefono-inteligente_163786-734.jpg"
                }
            })
                .then((updateResponse) => {
                if (updateResponse.acknowledged && updateResponse.modifiedCount > 0) {
                    //Si se asigno motorista mandar mensaje y guardar pedido en arreglo de tomados
                    motorista_schema_1.MotoristaSchema.updateOne({ _id: req.params.idMotorista }, {
                        $push: {
                            "pedidoTomados": new mongoose_1.default.Types.ObjectId(req.params.idPedido),
                            "mensajes": {
                                encabezado: `¡Se le ha asignado un nuevo pedido!`,
                                contenido: "Por favor revise su apartado de tomados.",
                                estado: false,
                            }
                        }
                    }).then((result) => {
                        if (result.modifiedCount > 0) {
                            //Todo salio bien
                            res.send({ status: true, mensaje: "Se agrego motorista Correctamente", respuesta: result });
                            res.end();
                        }
                        else {
                            //no se encontro motorista (poco probable)
                            res.send({ status: false, mensaje: "No se encontró documento a modificar o arreglo" });
                            res.end();
                        }
                    }).catch((error) => {
                        return ({ status: false, mensaje: "Hubo un error", respuesta: error });
                    });
                }
                else {
                    //Pedido no encontrado
                    res.send({ status: false, mensaje: "Error no se encontro pedido o pedido ya asignado a motorista" });
                    res.end();
                }
            }).catch((error) => {
                res.send({ status: false, mensaje: "Hubo un error", respuesta: error });
                res.end();
            });
        }
        else {
            //No existe motorista desde el inicio
            res.send({ status: false, mensaje: "No existe motorista" });
            res.end();
        }
    })
        .catch((error) => {
        res.send({ status: false, mensaje: "Hubo al buscar el motorista", respuesta: error });
        res.end();
    });
};
exports.agregarMotoristaPedido = agregarMotoristaPedido;
//obtener pedidos de acuerdo al estadoPedido
const obtenerPedidosEstado = (req, res) => {
    pedido_schema_1.PedidoSchema.aggregate([
        {
            $match: {
                estadoPedido: req.params.estado
            }
        },
        {
            $lookup: {
                from: "facturas",
                localField: "_idFactura",
                foreignField: "_id",
                as: "factura"
            }
        },
        {
            $project: {
                "factura._id": false,
                "factura.productos": false,
            }
        }
    ])
        .then((result) => {
        if (result.length > 0) {
            res.send({ status: true, mensaje: `Se obtuvieron pedidos: ${req.params.estado}`, respuesta: result });
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
exports.obtenerPedidosEstado = obtenerPedidosEstado;
//obtener pedido 
const obtenerPedido = (req, res) => {
    pedido_schema_1.PedidoSchema.aggregate([
        {
            $match: {
                _id: new mongoose_1.default.Types.ObjectId(req.params.id)
            }
        },
        {
            $lookup: {
                from: "facturas",
                localField: "_idFactura",
                foreignField: "_id",
                as: "factura"
            }
        },
        {
            $project: {
                "factura._id": false,
            }
        }
    ])
        .then((result) => {
        if (result.length > 0) {
            res.send({ status: true, mensaje: `Se obtuvieron pedidos: ${req.params.estado}`, respuesta: result[0] });
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
exports.obtenerPedido = obtenerPedido;
//obtener pedido tomado motorista
const obtenerPedidoEstadoEspecificoMotorista = (req, res) => {
    pedido_schema_1.PedidoSchema.aggregate([
        {
            $match: {
                'motorista._id': req.params.id,
                estadoPedido: req.params.estado
            }
        },
        {
            $lookup: {
                from: "facturas",
                localField: "_idFactura",
                foreignField: "_id",
                as: "factura"
            }
        },
        {
            $project: {
                "factura._id": false,
            }
        }
    ])
        .then((result) => {
        if (result.length > 0) {
            res.send({ status: true, mensaje: `Se obtuvieron pedidos: ${req.params.estado} del motorista`, respuesta: result });
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
exports.obtenerPedidoEstadoEspecificoMotorista = obtenerPedidoEstadoEspecificoMotorista;
//cambiar el atributo estadoCliente
const cambiarEstadoCliente = (req, res) => {
    pedido_schema_1.PedidoSchema.updateOne({ _id: req.params.id }, {
        $set: {
            estadoCliente: req.body.estadoCliente
        }
    }).then((updateResponse) => {
        if (updateResponse.modifiedCount > 0) {
            res.send({ status: true, message: 'Estado actualizado', respuesta: updateResponse });
            res.end();
        }
        else {
            res.send({ status: false, mensaje: "No se modifico estado" });
            res.end();
        }
    }).catch((error) => {
        res.send({ status: false, mensaje: "Hubo un error", respuesta: error });
        res.end();
    });
};
exports.cambiarEstadoCliente = cambiarEstadoCliente;
