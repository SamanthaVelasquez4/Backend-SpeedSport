import { Response, Request } from "express"
import { EmpresaSchema } from "../models/empresa.schema";
import { Empresa } from "../models/empresa.model";

//Agregar Empresa
export const agregarEmpresa = (req: Request, res: Response) => {
    const p = new EmpresaSchema(req.body);
    p.save().then((saveResponse:Empresa) => {
      res.send({status: true, mensaje:"Empresa agregada correctamente", respuesta:saveResponse});
      res.end();
    }).catch((error:any) => {
      res.send({status:false, message: 'Hubo un error al guardar empresa', respuesta:error});
      res.end();
    });
}

//Obtener empresas
export const obtenerEmpresas = (req: Request, res: Response) => {
    EmpresaSchema.find()
    .then((result:Array<Empresa>) => {
        if(result.length>0){
            res.send({status: true, mensaje:"Se obtuvo arreglo de empresas", respuesta:result});
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

//Obtener una empresa
export const obtenerEmpresa = (req: Request, res: Response) => {
    EmpresaSchema.findOne({_id: req.params.id})
    .then((result: Empresa|null) => {
        if(result!=null){
            res.send({status: true, mensaje:"Se obtuvo empresa", respuesta:result});
            res.end();
        }else{
            res.send({status: false, mensaje:"No existe empresa"});
            res.end();
        }
        
    })
    .catch((error:any) => {
        res.send({status:false, mensaje:"Hubo un error al obtener la empresa", respuesta:error})
        res.end();
    });
}

//Obtener nombres de las empresas
export const obtenerNombresEmpresas = (req: Request, res: Response) => {
    EmpresaSchema.find({},{nombre:true})
    .then((result:Array<Empresa>) => {
        if(result.length>0){
            res.send({status: true, mensaje:"Se obtuvo arreglo de empresas", respuesta:result});
            res.end();
        }else{
            res.send({status: false, mensaje:"Arreglo vacio"});
            res.end();
        }

    })
    .catch((error:any) => {
        res.send({status:false, mensaje:"Hubo un error al obtener el arreglo", respuesta:error})
        res.end();
    });
}

//Modificar una empresa
export const modificarEmpresa= (req: Request, res: Response) => {
    EmpresaSchema.updateOne({_id: req.params.id}, req.body)
    .then((updateResponse:any) => {
        if(updateResponse.acknowledged){
            res.send({status:true, message: 'Empresa actualizada', respuesta:updateResponse});
            res.end();
        }else{
            res.send({status: false, mensaje:"Empresa no encontrado"});
            res.end();
        }
    }).catch((error:any) =>{
      res.send({status:false, mensaje:"Hubo un error", respuesta:error});
      res.end();
    });
} 

//Borrar Empresa
export const eliminarEmpresa = (req: Request, res: Response) => {
    EmpresaSchema.deleteOne({_id: req.params.id})
   .then((removeResult:any) => {
        if(removeResult.deletedCount>0){
            res.send({status:true, message: 'Empresa eliminada', respuesta:removeResult});
            res.end();
        }else{
            res.send({status: false, mensaje:"Empresa no encontrada"});
            res.end();
        }
    }).catch((error:any) =>{
        res.send({status:false, message: 'Hubo un error al Eliminar', error}); 
        res.end();
    });
}