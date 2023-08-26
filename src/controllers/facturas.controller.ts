import { Response, Request } from "express"
import { FacturaSchema } from "../models/factura.schema";
import { Factura } from "../models/factura.model";

//obtener Facturas
export const obtenerFacturas = (req: Request, res: Response) => {
    FacturaSchema.find({})
    .then((result:Array<Factura>) => {
        if(result.length>0){
          res.send({status: true, mensaje:"Se obtuvo arreglo de facturas", respuesta:result});
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
