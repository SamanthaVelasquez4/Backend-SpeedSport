import { Response, Request } from "express"
import { ClienteSchema } from "../models/cliente.schema";
import { Cliente } from "../models/cliente.model";

//agregar cliente
export const agregarCliente = (req: Request, res: Response) => {
    const p = new ClienteSchema(req.body);
    p.save().then((saveResponse:Cliente) => {
      res.send({status: true, mensaje:"Cliente agregado correctamente", respuesta:saveResponse});
      res.end();
    }).catch((error:any) => {
      res.send({status:false, message: 'Hubo un error al guardar cliente', respuesta:error});
      res.end();
    });
}

//obtener clientes
export const obtenerClientes = (req: Request, res: Response) => {
  ClienteSchema.find({}, {contrasena:false})
  .then((result:Array<Cliente>) => {
      if(result.length>0){
        res.send({status: true, mensaje:"Se obtuvo arreglo de Clientes", respuesta:result});
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

//obtener un cliente
export const obtenerCliente = (req: Request, res: Response) => {
  ClienteSchema.findOne({_id: req.params.id}, {contrasena:false})
  .then((result: Cliente|null) => {
      if(result!=null){
          res.send({status: true, mensaje:"Se obtuvo usuario", respuesta:result});
          res.end();
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
