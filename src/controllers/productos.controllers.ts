import { Response, Request } from "express"
import { ProductoSchema } from "../models/producto.schema";
import { ProductoAdmin } from "../models/producto.model";

//AgregarProducto
export const agregarProducto = (req: Request, res: Response) => {
    const p = new ProductoSchema(req.body);
    p.save().then((saveResponse:ProductoAdmin) => {
      res.send({status: true, mensaje:"Producto agregado correctamente", respuesta:saveResponse});
      res.end();
    }).catch((error:any) => {
      res.send({status:false, message: 'Hubo un error al guardar producto', respuesta:error});
      res.end();
    });
}

//obtenerProductos
export const obtenerProductos = (req: Request, res: Response) => {
  ProductoSchema.find({}, {img:false})
  .then((result:Array<ProductoAdmin>) => {
      if(result.length>0){
        res.send({status: true, mensaje:"Se obtuvo arreglo de productos", respuesta:result});
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

//Obtener imagenes
export const obtenerImagenesProducto = (req: Request, res: Response) => {
  ProductoSchema.findOne({_id:req.params.id}, {img:true})
  .then((result:any) => {
      if(result!=null){
        res.send({status: true, mensaje:"Se obtuvo imagen de productos", respuesta:result});
        res.end();
      }else{
        res.send({status: true, mensaje:"No existe producto", respuesta:result});
        res.end();
      }
  })
  .catch((error:any) => {
      res.send({status:false, mensaje:"Hubo un error al obtener el arreglo", respuesta:error})
      res.end();
  });
}

//obtener productos de una empresa
export const obtenerProductosEmpresa = (req: Request, res: Response) => {
  ProductoSchema.find({_idEmpresa:req.params.id}, {_idEmpresa:false})
  .then((result:Array<ProductoAdmin>) => {
      if(result.length>0){
        res.send({status: true, mensaje:"Se obtuvo arreglo de productos", respuesta:result});
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

//obtener un producto
export const obtenerProducto = (req: Request, res: Response) => {
  ProductoSchema.findOne({_id: req.params.id})
  .then((result: ProductoAdmin|null) => {
      if(result!=null){
        res.send({status: true, mensaje:"Se obtuvo producto", respuesta:result});
        res.end();
      }else{
        res.send({status: false, mensaje:"No existe producto"});
        res.end();
      }
      
  })
  .catch((error:any) => {
    res.send({status:false, mensaje:"Hubo un error al obtener el producto", respuesta:error})
    res.end();
  });
}

//Modificar un producto
export const modificarProducto= (req: Request, res: Response) => {
  ProductoSchema.updateOne({_id: req.params.id}, req.body)
  .then((updateResponse:any) => {
      if(updateResponse.acknowledged){
        res.send({status:true, message: 'Producto actualizado', respuesta:updateResponse});
        res.end();
      }else{
        res.send({status: false, mensaje:"Producto no encontrado"});
        res.end();
      }
  }).catch((error:any) =>{
    res.send({status:false, mensaje:"Hubo un error", respuesta:error});
    res.end();
  });
} 

//Borrar producto
export const eliminarProducto = (req: Request, res: Response) => {
  ProductoSchema.deleteOne({_id: req.params.id})
 .then((removeResult:any) => {
      if(removeResult.deletedCount>0){
        res.send({status:true, message: 'Producto eliminado', respuesta:removeResult});
        res.end();
      }else{
        res.send({status: false, mensaje:"Producto no encontrado"});
        res.end();
      }
  }).catch((error:any) =>{
    res.send({status:false, message: 'Hubo un error al Eliminar', error}); 
    res.end();
  });
}

//Borrar productos de una empresa
export const eliminarProductosEmpresa = (req: Request, res: Response) => {
  ProductoSchema.deleteMany({_idEmpresa:req.params.id})
 .then((removeResult:any) => {
      if(removeResult.deletedCount>0){
        res.send({status:true, message: 'Productos eliminados', respuesta:removeResult});
        res.end();
      }else{
        res.send({status: true, mensaje:"Productos de empresa no encontrados"});
        res.end();
      }
  }).catch((error:any) =>{
    res.send({status:false, message: 'Hubo un error al Eliminar', error}); 
    res.end();
  });
}