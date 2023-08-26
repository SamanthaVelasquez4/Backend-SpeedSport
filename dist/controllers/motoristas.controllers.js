"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarContrasena = exports.borrarMensaje = exports.MensajeLeido = exports.pedidoEntregado = exports.agregarTomadoMotorista = exports.loginMotorista = exports.eliminarMotorista = exports.ActualizarMotoristaCalificacion = exports.modificarMotorista = exports.obtenerMotorista = exports.agregarMotorista = exports.obtenerMotoristasAdministrador = exports.obtenerMotoristas = void 0;
const motorista_schema_1 = require("../models/motorista.schema");
const mongoose_1 = __importDefault(require("mongoose"));
const pedido_schema_1 = require("../models/pedido.schema");
//obtener Motoristas
const obtenerMotoristas = (req, res) => {
    motorista_schema_1.MotoristaSchema.find({}, { pedidoTomados: false, pedidoEntregados: false, mensajes: false, contrasena: false })
        .then((result) => {
        if (result.length > 0) {
            res.send({ status: true, mensaje: "Se obtuvo arreglo de motoristas", respuesta: result });
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
exports.obtenerMotoristas = obtenerMotoristas;
//obtener motoristas para el admin 
const obtenerMotoristasAdministrador = (req, res) => {
    motorista_schema_1.MotoristaSchema.find({}, { primerNombre: true, primerApellido: true, numTelefono: true, tipoVehiculo: true, placa: true, calificacion: true, pedidoTomados: true, img: true })
        .then((result) => {
        if (result.length > 0) {
            res.send({ status: true, mensaje: "Se obtuvo arreglo de motoristas", respuesta: result });
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
exports.obtenerMotoristasAdministrador = obtenerMotoristasAdministrador;
//Agregar motorista
const agregarMotorista = (req, res) => {
    const motorista = req.body;
    const p = new motorista_schema_1.MotoristaSchema(motorista);
    p.save().then((saveResponse) => {
        res.send({ status: true, mensaje: "Motorista agregado correctamente", respuesta: saveResponse });
        res.end();
    }).catch((error) => {
        res.send({ status: false, message: 'Hubo un error al guardar Motorista', respuesta: error });
        res.end();
    });
};
exports.agregarMotorista = agregarMotorista;
//obtener un motorista
const obtenerMotorista = (req, res) => {
    motorista_schema_1.MotoristaSchema.findOne({ _id: req.params.id }, { contrasena: false })
        .then((result) => {
        if (result != null) {
            res.send({ status: true, mensaje: "Se obtuvo motorista", respuesta: result });
            res.end();
        }
        else {
            res.send({ status: false, mensaje: "No existe motorista" });
            res.end();
        }
    })
        .catch((error) => {
        res.send({ status: false, mensaje: "Hubo un error al obtener el motorista", respuesta: error });
        res.end();
    });
};
exports.obtenerMotorista = obtenerMotorista;
//Modificar Motorista
const modificarMotorista = (req, res) => {
    motorista_schema_1.MotoristaSchema.updateOne({ _id: req.params.id }, req.body)
        .then((updateResponse) => {
        if (updateResponse.modifiedCount > 0) {
            res.send({ status: true, message: 'Motorista actualizado', respuesta: updateResponse });
            res.end();
        }
        else {
            res.send({ status: false, mensaje: "Motorista no encontrado" });
            res.end();
        }
    }).catch((error) => {
        res.send({ status: false, mensaje: "Hubo un error", respuesta: error });
        res.end();
    });
};
exports.modificarMotorista = modificarMotorista;
//Actualizar Calificacion
const ActualizarMotoristaCalificacion = (req, res) => {
    motorista_schema_1.MotoristaSchema.findOne({ _id: req.params.id }, { pedidoEntregados: true, calificacion: true })
        .then((result) => {
        console.log(result);
        if (result != null) {
            let cal = (req.body.calificacion + result.calificacion) / result.pedidoEntregados.length;
            motorista_schema_1.MotoristaSchema.updateOne({ _id: req.params.id }, {
                $set: {
                    calificacion: cal
                }
            })
                .then((updateResponse) => {
                if (updateResponse.acknowledged && updateResponse.modifiedCount > 0) {
                    res.send({ status: true, message: 'Calificacion actualizada', respuesta: updateResponse });
                    res.end();
                }
                else {
                    res.send({ status: false, mensaje: "Error al modificar" });
                    res.end();
                }
            }).catch((error) => {
                res.send({ status: false, mensaje: "Hubo un error", respuesta: error });
                res.end();
            });
        }
        else {
            res.send({ status: false, mensaje: "No existe motorista" });
            res.end();
        }
    })
        .catch((error) => {
        res.send({ status: false, mensaje: "Hubo un error al obtener el motorista", respuesta: error });
        res.end();
    });
};
exports.ActualizarMotoristaCalificacion = ActualizarMotoristaCalificacion;
//Borrar Motorista
const eliminarMotorista = (req, res) => {
    motorista_schema_1.MotoristaSchema.deleteOne({ _id: req.params.id })
        .then((removeResult) => {
        if (removeResult.deletedCount > 0) {
            res.send({ status: true, message: 'Motorista eliminado', respuesta: removeResult });
            res.end();
        }
        else {
            res.send({ status: false, mensaje: "Motorista no encontrado" });
            res.end();
        }
    }).catch((error) => {
        res.send({ status: false, message: 'Hubo un error al Eliminar', error });
        res.end();
    });
};
exports.eliminarMotorista = eliminarMotorista;
//Login Motorista
const loginMotorista = (req, res) => {
    motorista_schema_1.MotoristaSchema.findOne({ usuario: req.body.usuario, contrasena: req.body.contrasena }, { contrasena: false })
        .then((result) => {
        if (result != null) {
            let motorista = {
                "_id": result._id,
                "primerNombre": result.primerNombre
            };
            res.send({ status: true, mensaje: "Usuario encontrado", respuesta: motorista });
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
exports.loginMotorista = loginMotorista;
//agregar pedido a tomados
const agregarTomadoMotorista = (req, res) => {
    //verificar que el pedido exista 
    pedido_schema_1.PedidoSchema.findOne({ _id: req.params.idPedido })
        .then((result) => {
        if (result != null) {
            //verificar que motorista exista
            let motorista;
            motorista_schema_1.MotoristaSchema.findOne({ _id: req.params.idMotorista })
                .then((result) => {
                if (result != null) {
                    let id = result._id;
                    motorista = {
                        _id: id.toString(),
                        nombre: result.primerNombre + " " + result.primerApellido,
                        numTelefono: result.numTelefono,
                        tipoVehiculo: result.tipoVehiculo,
                        placa: result.placa,
                        calificacion: result.calificacion
                    };
                    pedido_schema_1.PedidoSchema.updateOne({ _id: req.params.idPedido }, {
                        $set: {
                            motorista: motorista,
                            estadoPedido: "Tomado",
                            estadoCliente: "En camino",
                            img: "https://img.freepik.com/vector-premium/icono-marca-verificacion-verde-pantalla-telefono-inteligente_163786-734.jpg"
                        }
                    }).then((updateResponse) => {
                        if (updateResponse.modifiedCount > 0) {
                            //Si se asigno motorista mandar mensaje y guardar pedido en arreglo de tomados
                            motorista_schema_1.MotoristaSchema.updateOne({ _id: req.params.idMotorista }, {
                                $push: {
                                    "pedidoTomados": new mongoose_1.default.Types.ObjectId(req.params.idPedido),
                                }
                            }).then((result) => {
                                if (result.modifiedCount > 0) {
                                    //Todo salio bien
                                    res.send({ status: true, mensaje: "Se agrego pedido a motorista Correctamente", respuesta: result });
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
                            //Pedido no encontrado (poco probable)
                            res.send({ status: false, mensaje: "Error no se encontro pedido o pedido ya asignado a motorista" });
                            res.end();
                        }
                    }).catch((error) => {
                        res.send({ status: false, mensaje: "Hubo un error al modificar pedido", respuesta: error });
                        res.end();
                    });
                }
                else {
                    res.send({ status: false, mensaje: "Motorista no existe", respuesta: result });
                    res.end();
                }
            })
                .catch((error) => {
                res.send({ status: false, mensaje: "Hubo un error al obtener motorista", respuesta: error });
                res.end();
            });
        }
        else {
            res.send({ status: false, mensaje: "Pedido no existe", respuesta: result });
            res.end();
        }
    })
        .catch((error) => {
        res.send({ status: false, mensaje: "Hubo un error al verificar si el pedido existe", respuesta: error });
        res.end();
    });
};
exports.agregarTomadoMotorista = agregarTomadoMotorista;
//Pedido entregado
const pedidoEntregado = (req, res) => {
    //verificar si existe pedido
    pedido_schema_1.PedidoSchema.findOne({ _id: req.params.idPedido })
        .then((result) => {
        if (result != null) {
            //verificar si motorista Existe y modificar
            motorista_schema_1.MotoristaSchema.updateOne({ _id: req.params.idMotorista }, {
                $push: {
                    pedidoEntregados: new mongoose_1.default.Types.ObjectId(req.params.idPedido)
                },
                $pull: {
                    pedidoTomados: new mongoose_1.default.Types.ObjectId(req.params.idPedido)
                }
            }).then((result) => {
                if (result.modifiedCount > 0) {
                    pedido_schema_1.PedidoSchema.updateOne({ _id: req.params.idPedido }, {
                        $set: {
                            estadoCliente: "Entregado",
                            estadoPedido: "Entregado",
                            img: "https://img.freepik.com/free-vector/person-receiving-package-paying-delivery_23-2148773021.jpg?w=740&t=st=1693022482~exp=1693023082~hmac=c0c72cd3c6a2e05e9589da8bd6cd2b2bef1d86bdec85f219f898885cecb8dfba"
                        }
                    }).then((result) => {
                        if (result.modifiedCount > 0) {
                            //Todo salio bien
                            res.send({ status: true, mensaje: "Se entrego pedido correctamente", respuesta: result });
                            res.end();
                        }
                        else {
                            //no se modifico el pedido (poco probale)
                            res.send({ status: false, mensaje: "No se modificaron los estado del pedido" });
                            res.end();
                        }
                    }).catch((error) => {
                        return ({ status: false, mensaje: "Hubo un error al tratar de modificar los estado", respuesta: error });
                    });
                }
                else {
                    //no se encontro motorista (poco probable)
                    res.send({ status: false, mensaje: "No se encontró motorista" });
                    res.end();
                }
            }).catch((error) => {
                return ({ status: false, mensaje: "Hubo un error", respuesta: error });
            });
        }
        else {
            res.send({ status: false, mensaje: "Pedido no existe", respuesta: result });
            res.end();
        }
    })
        .catch((error) => {
        res.send({ status: false, mensaje: "Hubo un error al verificar si el pedido existe", respuesta: error });
        res.end();
    });
};
exports.pedidoEntregado = pedidoEntregado;
//Cambiar estado de mensaje
const MensajeLeido = (req, res) => {
    motorista_schema_1.MotoristaSchema.updateOne({ _id: req.params.idMotorista }, {
        $set: {
            [`mensajes.${req.params.posicionArreglo}.estado`]: true
        }
    }).then((result) => {
        if (result.modifiedCount > 0) {
            //Todo salio bien
            res.send({ status: true, mensaje: "Mensaje leido", respuesta: result });
            res.end();
        }
        else {
            //no se encontro motorista (poco probable)
            res.send({ status: false, mensaje: "Se hizo un relajo" });
            res.end();
        }
    }).catch((error) => {
        return ({ status: false, mensaje: "Hubo un error al buscar motorista", respuesta: error });
    });
};
exports.MensajeLeido = MensajeLeido;
//borrar mensaje
const borrarMensaje = (req, res) => {
    motorista_schema_1.MotoristaSchema.updateOne({ _id: req.params.idMotorista }, {
        $unset: {
            [`mensajes.${req.params.posicionArreglo}`]: req.params.posicionArreglo // Elimina el objeto en la segunda posición
        },
        /*$pull: {
            mensajes: null // Limpia los valores nulos del arreglo
        }*/
    }).then((result) => {
        if (result.modifiedCount > 0) {
            //Todo salio bien
            motorista_schema_1.MotoristaSchema.updateOne({ _id: req.params.idMotorista }, {
                $pull: {
                    mensajes: null // Limpia los valores nulos del arreglo
                }
            }).then((updateResponse) => {
                if (updateResponse.modifiedCount > 0) {
                    res.send({ status: true, message: 'Mensaje Borrado correctamente', respuesta: updateResponse });
                    res.end();
                }
                else {
                    res.send({ status: false, mensaje: "No se modifico arreglo de mensajes" });
                    res.end();
                }
            }).catch((error) => {
                res.send({ status: false, mensaje: "No se modifico arreglo de mensajes", respuesta: error });
                res.end();
            });
        }
        else {
            //no se encontro motorista (poco probable)
            res.send({ status: false, mensaje: "No se pudo borrar mensaje" });
            res.end();
        }
    }).catch((error) => {
        return ({ status: false, mensaje: "Hubo un error al buscar motorista", respuesta: error });
    });
};
exports.borrarMensaje = borrarMensaje;
//actualizar contrasena
const actualizarContrasena = (req, res) => {
    motorista_schema_1.MotoristaSchema.updateOne({ usuario: req.body.usuario, contrasena: req.body.contrasena }, {
        $set: {
            contrasena: req.body.nuevaContrasena
        }
    })
        .then((updateResponse) => {
        if (updateResponse.modifiedCount > 0) {
            res.send({ status: true, message: 'Contraseña actualizada' });
            res.end();
        }
        else {
            res.send({ status: false, mensaje: "Contraseña no actualizada", respuesta: updateResponse });
            res.end();
        }
    }).catch((error) => {
        res.send({ status: false, mensaje: "Hubo un error", respuesta: error });
        res.end();
    });
};
exports.actualizarContrasena = actualizarContrasena;
