import { Response, Request } from "express"
import { PedidoSchema } from "../models/pedido.schema";
import { Pedido } from "../models/pedido.model";
import mongoose from "mongoose";
import { ProductoCliente } from "../models/producto.model";
import { FacturaSchema } from "../models/factura.schema";
import { Factura } from "../models/factura.model";
import { MotoristaSchema } from "../models/motorista.schema";
import { Motorista } from "../models/motorista.model";
import { ClienteSchema } from "../models/cliente.schema";
import { Cliente } from "../models/cliente.model";


//Agregar pedido
export const agregarPedido = (req: Request, res: Response) => {
    ClienteSchema.findOne({_id: req.params.id}, {contrasena:false})
    .then((result: Cliente|null) => {
        if(result!=null){
            let sub=0;
            req.body.factura.productos.forEach((producto:ProductoCliente) => {
            sub+=producto.cantidad*producto.precio;
            });
            const facturaNueva={
            "fecha": req.body.factura.fecha,
            "cliente": req.body.factura.cliente,
            "numTarjetaCredito": req.body.factura.numTarjetaCredito,
            "empresa": req.body.factura.empresa,
            "productos": req.body.factura.productos,
            "subtotal": sub,
            "isv": sub*0.15,
            "total": (0.15*sub)+sub,
            }
            const f = new FacturaSchema(facturaNueva);
            f.save().then((saveResponse:Factura) => {
                const pedido={
                    "img": "https://img.freepik.com/vector-premium/caja-naranja-codigo-barras_867743-168.jpg?w=2000",
                    "_idFactura": saveResponse._id,
                    "costoEnvio": 65,
                    "motorista": null,
                    "ubicacion": req.body.ubicacion,
                    "calificacion": 0,
                    "estadoCliente": "Buscando repartidor",
                    "estadoPedido": "Pedido",
                    "total": saveResponse.total + 65
                }
                const p = new PedidoSchema(pedido);
                p.save().then((saveResponse:Pedido) => {
                    ClienteSchema.updateOne({_id:req.params.id},{
                        $push:{
                            "pedidos": saveResponse._id
                        }
                    }).then((result:any)=>{
                        if(result.modifiedCount>0){
                            //Todo salio bien
                            res.send({status: true, mensaje:"Se agrego pedido al cliente correctamente", respuesta:result});
                            res.end();
                        }else{
                            //no se encontro cliente (poco probable)
                            res.send({status: false, mensaje:"No se encontró documento a modificar o arreglo"});
                            res.end();
                        }
                    }).catch((error:any) => {
                        return({status:false, mensaje:"Hubo un error", respuesta:error})
                    });
                }).catch((error:any) => {
                    res.send({status:false, message: 'Hubo un error al guardar pedido', respuesta:error});
                    res.end();
                });
            
            }).catch((error:any) => {
                res.send({status:false, message: 'Hubo un error al guardar factura', respuesta:error});
                res.end();
            })
        }else{
            res.send({status: false, mensaje:"No existe usuario"});
            res.end();
        }
                
    })
    .catch((error:any) => {
        res.send({status:false, mensaje:"Hubo un error al obtener el usuario", respuesta:error})
        res.end();
    });
    
   
}

//Obtener pedidos
export const obtenerPedidos = (req: Request, res: Response) => {
    PedidoSchema.find()
    .then((result:Array<Pedido>) => {
        if(result.length>0){
            res.send({status: true, mensaje:"Se obtuvo arreglo de pedidos", respuesta:result});
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

//agregar motorista a pedido
export const agregarMotoristaPedido= (req: Request, res: Response) => {
    //confirmar que exista el motorista
    MotoristaSchema.findOne({_id: req.params.idMotorista})
    .then((result: Motorista|null) => {
        if(result!=null){
            //Asignar motorista el pedido
            PedidoSchema.updateOne({_id:req.params.idPedido},{
                $set:{
                    motorista: req.body,
                    estadoPedido: "Tomado",
                    estadoCliente: "En camino",
                    img:"https://img.freepik.com/vector-premium/icono-marca-verificacion-verde-pantalla-telefono-inteligente_163786-734.jpg"
                }
            })
            .then((updateResponse:any) => {
                if(updateResponse.acknowledged && updateResponse.modifiedCount>0){
                    //Si se asigno motorista mandar mensaje y guardar pedido en arreglo de tomados
                    MotoristaSchema.updateOne({_id:req.params.idMotorista},
                        {
                            $push:{
                                "pedidoTomados": new mongoose.Types.ObjectId(req.params.idPedido),
                                "mensajes": {
                                    encabezado: `¡Se le ha asignado un nuevo pedido!`,
                                    contenido: "Por favor revise su apartado de tomados.",
                                    estado:false,
                                }
                            }
                        }).then((result:any)=>{
                            if(result.modifiedCount>0){
                                //Todo salio bien
                                res.send({status: true, mensaje:"Se agrego motorista Correctamente", respuesta:result});
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
                    //Pedido no encontrado
                    res.send({status: false, mensaje:"Error no se encontro pedido o pedido ya asignado a motorista"});
                    res.end();
                }
            }).catch((error:any) =>{
              res.send({status:false, mensaje:"Hubo un error", respuesta:error});
              res.end();
            });
        }else{
            //No existe motorista desde el inicio
            res.send({status: false, mensaje:"No existe motorista"});
            res.end();
        }   
    })
    .catch((error:any) => {
        res.send({status:false, mensaje:"Hubo al buscar el motorista", respuesta:error})
        res.end();
    });
    

}

//obtener pedidos de acuerdo al estadoPedido
export const obtenerPedidosEstado = (req: Request, res: Response) => {
    PedidoSchema.aggregate([
        {
            $match:{
                estadoPedido: req.params.estado
            }
        },
        {
            $lookup:{
                from: "facturas", 
                localField: "_idFactura", 
                foreignField: "_id", 
                as: "factura"
            }
        },
        {
            $project:{
                "factura._id": false,
                "factura.productos":false,
            }
        }
    ])
    .then((result:any)=>{
        if(result.length>0){
            res.send({status: true, mensaje:`Se obtuvieron pedidos: ${req.params.estado}`, respuesta:result});
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

//obtener pedido 
export const obtenerPedido = (req: Request, res: Response) => {
    PedidoSchema.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $lookup:{
                from: "facturas", 
                localField: "_idFactura", 
                foreignField: "_id", 
                as: "factura"
            }
        },
        {
            $project:{
                "factura._id": false,
            }
        }
    ])
    .then((result:any)=>{
        if(result.length>0){
            res.send({status: true, mensaje:`Se obtuvieron pedidos: ${req.params.estado}`, respuesta:result[0]});
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

//obtener pedido tomado motorista
export const obtenerPedidoEstadoEspecificoMotorista = (req: Request, res: Response) => {
    PedidoSchema.aggregate([
        {
            $match:{
                'motorista._id': req.params.id,
                estadoPedido: req.params.estado
            }
        },
        {
            $lookup:{
                from: "facturas", 
                localField: "_idFactura", 
                foreignField: "_id", 
                as: "factura"
            }
        },
        {
            $project:{
                "factura._id": false,
            }
        }
    ])
    .then((result:any)=>{
        if(result.length>0){
            res.send({status: true, mensaje:`Se obtuvieron pedidos: ${req.params.estado} del motorista`, respuesta:result});
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

//cambiar el atributo estadoCliente
export const cambiarEstadoCliente = (req: Request, res: Response)=>{
    PedidoSchema.updateOne({_id:req.params.id},{
        $set:{
            estadoCliente: req.body.estadoCliente
        }
    }).then((updateResponse:any) => {
        if(updateResponse.modifiedCount>0){
            res.send({status:true, message: 'Estado actualizado', respuesta:updateResponse});
            res.end();
        }else{
            res.send({status: false, mensaje:"No se modifico estado"});
            res.end();
        }
    }).catch((error:any) =>{
      res.send({status:false, mensaje:"Hubo un error", respuesta:error});
      res.end();
    });
}

//obtener pedidos entregados de un cliente
export const obtenerEntragosCliente = (req: Request, res: Response) => {
    PedidoSchema.aggregate([
        {
            $lookup:{
                from: "facturas", 
                localField: "_idFactura", 
                foreignField: "_id", 
                as: "factura"
            }
        },
        {
            $match:{
                'factura.cliente._id': req.params.id,
                estadoPedido: "Entregado"
            }
        },
    ])
    .then((result:any)=>{
        if(result.length>0){
            res.send({status: true, mensaje:`Se obtuvieron pedidos entregados del cliente`, respuesta:result});
            res.end();
        }else{
            res.send({status: false, mensaje:"No hay pedidos entregados"});
            res.end();
        }
    })
    .catch((error:any) => {
        res.send({status:false, mensaje:"Hubo un error al obtener el arreglo", respuesta:error})
        res.end();
    });
}

//obtener pedidos en proceso del cliente
export const obtenerPedidosEnProcesoCliente = (req: Request, res: Response) => {
    PedidoSchema.aggregate([
        {
            $lookup:{
                from: "facturas", 
                localField: "_idFactura", 
                foreignField: "_id", 
                as: "factura"
            }
        },
        {
            $match:{
                $or:[
                    {estadoPedido: "Pedido"},
                    {estadoPedido: "Tomado"}
                ],
                $and:[
                    {'factura.cliente._id': req.params.id  }  
                ]             
            }
        },
    ])
    .then((result:any)=>{
        if(result.length>0){
            res.send({status: true, mensaje:`Se obtuvieron pedidos en proceso del cliente`, respuesta:result});
            res.end();
        }else{
            res.send({status: false, mensaje:"No hay pedidos en proceso"});
            res.end();
        }
    })
    .catch((error:any) => {
        res.send({status:false, mensaje:"Hubo un error al obtener el arreglo", respuesta:error})
        res.end();
    });
}