import { Response, Request } from "express"
import { MotoristaSchema } from "../models/motorista.schema";
import { Motorista, MotoristaPedido } from "../models/motorista.model";
import mongoose from "mongoose";
import { PedidoSchema } from "../models/pedido.schema";
import { Pedido } from "../models/pedido.model";

//obtener Motoristas
export const obtenerMotoristas = (req: Request, res: Response) => {
    MotoristaSchema.find({},{pedidoTomados:false, pedidoEntregados:false, mensajes:false, contrasena:false})
    .then((result:Array<Motorista>) => {
        if(result.length>0){
            res.send({status: true, mensaje:"Se obtuvo arreglo de motoristas", respuesta:result});
            res.end();
        }else{
            res.send({status: true, mensaje:"Arreglo vacio", respuesta:result});
            res.end();
        }

    })
    .catch((error:any) => {
        res.send({status:false, mensaje:"Hubo un error al obtener el arreglo", respuesta:error})
        res.end();
    });
}

//obtener motoristas para el admin 
export const obtenerMotoristasAdministrador = (req: Request, res: Response) => {
    MotoristaSchema.find({},{primerNombre:true, primerApellido:true, numTelefono:true, tipoVehiculo:true, placa:true, calificacion:true, pedidoTomados:true, img:true})
    .then((result:Array<Motorista>) => {
        if(result.length>0){
            res.send({status: true, mensaje:"Se obtuvo arreglo de motoristas", respuesta:result});
            res.end();
        }else{
            res.send({status: true, mensaje:"Arreglo vacio", respuesta:result});
            res.end();
        }

    })
    .catch((error:any) => {
        res.send({status:false, mensaje:"Hubo un error al obtener el arreglo", respuesta:error})
        res.end();
    });
}

//Agregar motorista
export const agregarMotorista = (req: Request, res: Response) => {
    const motorista=req.body;
    const p = new MotoristaSchema(motorista);
    p.save().then((saveResponse:Motorista) => {
      res.send({status: true, mensaje:"Motorista agregado correctamente", respuesta:saveResponse});
      res.end();
    }).catch((error:any) => {
      res.send({status:false, message: 'Hubo un error al guardar Motorista', respuesta:error});
      res.end();
    });
}

//obtener un motorista
export const obtenerMotorista = (req: Request, res: Response) => {
    MotoristaSchema.findOne({_id: req.params.id}, {contrasena:false})
    .then((result: Motorista|null) => {
        if(result!=null){
            res.send({status: true, mensaje:"Se obtuvo motorista", respuesta:result});
            res.end();
        }else{
            res.send({status: false, mensaje:"No existe motorista"});
            res.end();
        }
        
    })
    .catch((error:any) => {
        res.send({status:false, mensaje:"Hubo un error al obtener el motorista", respuesta:error})
        res.end();
    });
}

//Modificar Motorista
export const modificarMotorista= (req: Request, res: Response) => {
    MotoristaSchema.updateOne({_id: req.params.id}, req.body)
    .then((updateResponse:any) => {
        if(updateResponse.modifiedCount>0){
            res.send({status:true, message: 'Motorista actualizado', respuesta:updateResponse});
            res.end();
        }else{
            res.send({status: false, mensaje:"Motorista no encontrado"});
            res.end();
        }
    }).catch((error:any) =>{
      res.send({status:false, mensaje:"Hubo un error", respuesta:error});
      res.end();
    });
} 

//Actualizar Calificacion
export const ActualizarMotoristaCalificacion = (req: Request, res: Response) => {
    MotoristaSchema.findOne({_id: req.params.id}, {pedidoEntregados:true, calificacion:true})
    .then((result: Motorista|null) => {
        console.log(result);
        if(result!=null){
            let cal= (req.body.calificacion + result.calificacion)/result.pedidoEntregados.length;
            MotoristaSchema.updateOne({_id:req.params.id},{
                $set:{
                    calificacion: cal
                }
            })
            .then((updateResponse:any) => {
                if(updateResponse.acknowledged && updateResponse.modifiedCount>0){
                    res.send({status:true, message: 'Calificacion actualizada', respuesta:updateResponse});
                    res.end();
                }else{
                    res.send({status: false, mensaje:"Error al modificar"});
                    res.end();
                }
            }).catch((error:any) =>{
              res.send({status:false, mensaje:"Hubo un error", respuesta:error});
              res.end();
            });
        }else{
            res.send({status: false, mensaje:"No existe motorista"});
            res.end();
        }
        
    })
    .catch((error:any) => {
        res.send({status:false, mensaje:"Hubo un error al obtener el motorista", respuesta:error})
        res.end();
    });
}

//Borrar Motorista
export const eliminarMotorista = (req: Request, res: Response) => {
    MotoristaSchema.deleteOne({_id: req.params.id})
   .then((removeResult:any) => {
        if(removeResult.deletedCount>0){
            res.send({status:true, message: 'Motorista eliminado', respuesta:removeResult});
            res.end();
        }else{
            res.send({status: false, mensaje:"Motorista no encontrado"});
            res.end();
        }
    }).catch((error:any) =>{
        res.send({status:false, message: 'Hubo un error al Eliminar', error}); 
        res.end();
    });
}

//Login Motorista
export const loginMotorista = (req: Request, res: Response) => {
    MotoristaSchema.findOne({usuario:req.body.usuario, contrasena:req.body.contrasena}, {contrasena:false})
    .then((result: Motorista|null) => {
        if(result!=null){
            let motorista={
                "_id": result._id,
                "primerNombre": result.primerNombre
            }
            res.send({status: true, mensaje:"Usuario encontrado", respuesta:motorista});
            res.end();
        }else{
            res.send({status: false, mensaje:"Usuario inexistente"});
            res.end();
        }
        
    })
    .catch((error:any) => {
        res.send({status:false, mensaje:"Hubo un error al obtener el motorista", respuesta:error})
        res.end();
    });
}

//agregar pedido a tomados
export const agregarTomadoMotorista = (req: Request, res: Response) =>{

    //verificar que el pedido exista 
    PedidoSchema.findOne({_id:req.params.idPedido})
    .then((result: Pedido|null) => {
        if(result!=null){
            //verificar que motorista exista
            let motorista:MotoristaPedido;
            MotoristaSchema.findOne({_id:req.params.idMotorista})
            .then((result: Motorista|null) => {
                if(result!=null){
                    let id:any= result._id;
                    motorista={
                        _id:id.toString(),
                        nombre: result.primerNombre + " " + result.primerApellido,
                        numTelefono: result.numTelefono,
                        tipoVehiculo: result.tipoVehiculo,
                        placa: result.placa,
                        calificacion: result.calificacion
                    }
                    PedidoSchema.updateOne({_id:req.params.idPedido}, {
                        $set:{
                            motorista: motorista,
                            estadoPedido: "Tomado",
                            estadoCliente: "En camino",
                            img:"https://img.freepik.com/vector-premium/icono-marca-verificacion-verde-pantalla-telefono-inteligente_163786-734.jpg"
                        }
                    }).then((updateResponse:any) => {
                        if(updateResponse.modifiedCount>0){
                            //Si se asigno motorista mandar mensaje y guardar pedido en arreglo de tomados
                            MotoristaSchema.updateOne({_id:req.params.idMotorista},
                                {
                                    $push:{
                                        "pedidoTomados": new mongoose.Types.ObjectId(req.params.idPedido),
                                    }
                                }).then((result:any)=>{
                                    if(result.modifiedCount>0){
                                        //Todo salio bien
                                        res.send({status: true, mensaje:"Se agrego pedido a motorista Correctamente", respuesta:result});
                                        res.end();
                                    }else{
                                        //no se encontro motorista (poco probable)
                                        res.send({status: false, mensaje:"No se encontró documento a modificar o arreglo"});
                                        res.end();
                                    }
                                }).catch((error:any) => {
                                    return({status:false, mensaje:"Hubo un error", respuesta:error})
                                });
                        }else{
                            //Pedido no encontrado (poco probable)
                            res.send({status: false, mensaje:"Error no se encontro pedido o pedido ya asignado a motorista"});
                            res.end();
                        }
                    }).catch((error:any) =>{
                      res.send({status:false, mensaje:"Hubo un error al modificar pedido", respuesta:error});
                      res.end();
                    });

                }else{
                    res.send({status:false, mensaje:"Motorista no existe", respuesta:result})
                    res.end();
                } 
            })
            .catch((error:any) => {
                res.send({status:false, mensaje:"Hubo un error al obtener motorista", respuesta:error})
                res.end();
            });
        }else{
            res.send({status:false, mensaje:"Pedido no existe", respuesta:result})
            res.end();
        } 
    })
    .catch((error:any) => {
        res.send({status:false, mensaje:"Hubo un error al verificar si el pedido existe", respuesta:error})
        res.end();
    });


}


//Pedido entregado
export const pedidoEntregado = (req: Request, res: Response) =>{
    //verificar si existe pedido
    PedidoSchema.findOne({_id:req.params.idPedido})
    .then((result: Pedido|null) => {
        if(result!=null){
            //verificar si motorista Existe y modificar
            MotoristaSchema.updateOne({_id: req.params.idMotorista},{
                $push:{
                    pedidoEntregados: new mongoose.Types.ObjectId(req.params.idPedido)
                },
                $pull:{
                    pedidoTomados: new mongoose.Types.ObjectId(req.params.idPedido)
                }
            }).then((result:any)=>{
                if(result.modifiedCount>0){
                    PedidoSchema.updateOne({_id:req.params.idPedido},{
                        $set:{
                            estadoCliente:"Entregado",
                            estadoPedido:"Entregado",
                            img: "https://img.freepik.com/free-vector/person-receiving-package-paying-delivery_23-2148773021.jpg?w=740&t=st=1693022482~exp=1693023082~hmac=c0c72cd3c6a2e05e9589da8bd6cd2b2bef1d86bdec85f219f898885cecb8dfba"
                        }
                    }).then((result:any)=>{
                        if(result.modifiedCount>0){
                            //Todo salio bien
                            res.send({status: true, mensaje:"Se entrego pedido correctamente", respuesta:result});
                            res.end();
                        }else{
                            //no se modifico el pedido (poco probale)
                            res.send({status: false, mensaje:"No se modificaron los estado del pedido"});
                            res.end();
                        }
                    }).catch((error:any) => {
                        return({status:false, mensaje:"Hubo un error al tratar de modificar los estado", respuesta:error})
                    });
                }else{
                    //no se encontro motorista (poco probable)
                    res.send({status: false, mensaje:"No se encontró motorista"});
                    res.end();
                }
            }).catch((error:any) => {
                return({status:false, mensaje:"Hubo un error", respuesta:error})
            });
        }else{
            res.send({status:false, mensaje:"Pedido no existe", respuesta:result})
            res.end();
        } 
    })
    .catch((error:any) => {
        res.send({status:false, mensaje:"Hubo un error al verificar si el pedido existe", respuesta:error})
        res.end();
    });
}

//Cambiar estado de mensaje
export const MensajeLeido = (req: Request, res: Response) => {
    MotoristaSchema.updateOne({_id:req.params.idMotorista}, {
        $set:{
            [`mensajes.${req.params.posicionArreglo}.estado`] : true
        }
    }).then((result:any)=>{
        if(result.modifiedCount>0){
            //Todo salio bien
            res.send({status: true, mensaje:"Mensaje leido", respuesta:result});
            res.end();
        }else{
            //no se encontro motorista (poco probable)
            res.send({status: false, mensaje:"Se hizo un relajo"});
            res.end();
        }
    }).catch((error:any) => {
        return({status:false, mensaje:"Hubo un error al buscar motorista", respuesta:error})
    });
}

//borrar mensaje
export const borrarMensaje = (req: Request, res: Response) => {
    MotoristaSchema.updateOne({_id:req.params.idMotorista}, {
        $unset: {
            [`mensajes.${req.params.posicionArreglo}`]: req.params.posicionArreglo // Elimina el objeto en la segunda posición
        },
        /*$pull: {
            mensajes: null // Limpia los valores nulos del arreglo
        }*/
    }).then((result:any)=>{
        if(result.modifiedCount>0){
            //Todo salio bien
            MotoristaSchema.updateOne({_id:req.params.idMotorista}, {
                $pull: {
                    mensajes: null // Limpia los valores nulos del arreglo
                }
            }).then((updateResponse:any) => {
                if(updateResponse.modifiedCount>0){
                    res.send({status:true, message: 'Mensaje Borrado correctamente', respuesta:updateResponse});
                    res.end();
                }else{
                    res.send({status: false, mensaje:"No se modifico arreglo de mensajes"});
                    res.end();
                }
            }).catch((error:any) =>{
              res.send({status:false, mensaje:"No se modifico arreglo de mensajes", respuesta:error});
              res.end();
            });
        }else{
            //no se encontro motorista (poco probable)
            res.send({status: false, mensaje:"No se pudo borrar mensaje"});
            res.end();
        }
    }).catch((error:any) => {
        return({status:false, mensaje:"Hubo un error al buscar motorista", respuesta:error})
    });
}

//actualizar contrasena
export const actualizarContrasena = (req: Request, res: Response) =>{
    MotoristaSchema.updateOne({usuario:req.body.usuario, contrasena:req.body.contrasena},{
        $set:{
            contrasena: req.body.nuevaContrasena
        }
    })
    .then((updateResponse:any) => {
        if(updateResponse.modifiedCount>0){
            res.send({status:true, message: 'Contraseña actualizada'});
            res.end();
        }else{
            res.send({status: false, mensaje:"Contraseña no actualizada", respuesta:updateResponse});
            res.end();
        }
    }).catch((error:any) =>{
      res.send({status:false, mensaje:"Hubo un error", respuesta:error});
      res.end();
    });
}
 