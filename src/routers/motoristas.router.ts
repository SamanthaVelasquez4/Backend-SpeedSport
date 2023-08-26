import express from 'express'
import { ActualizarMotoristaCalificacion, MensajeLeido, actualizarContrasena, agregarMotorista, agregarTomadoMotorista, borrarMensaje, eliminarMotorista, loginMotorista, modificarMotorista, obtenerMotorista, obtenerMotoristas, obtenerMotoristasAdministrador, pedidoEntregado } from '../controllers/motoristas.controllers';
import { obtenerPedidoEstadoEspecificoMotorista } from '../controllers/pedidos.controllers';

const router=express.Router();

//Usadas Solo en admin
router.post('/', agregarMotorista);
router.get('/administrador/pedidos', obtenerMotoristasAdministrador);
router.put('/:id', modificarMotorista);
router.delete('/:id', eliminarMotorista);

//Usadas en la app de motoristas
router.post('/login', loginMotorista );
router.get('/', obtenerMotoristas); //quita los arreglos
router.get('/:id', obtenerMotorista);
router.get('/:id/obtenerPedidos/:estado', obtenerPedidoEstadoEspecificoMotorista);
router.put('/:idMotorista/pedido/:idPedido', agregarTomadoMotorista);
router.put('/:idMotorista/pedido/entregado/:idPedido', pedidoEntregado);
router.put('/:idMotorista/mensajeLeido/:posicionArreglo', MensajeLeido);
router.put('/:idMotorista/eliminar/mensaje/:posicionArreglo/prueba', borrarMensaje);
router.post('/actalizar/contrasena', actualizarContrasena);

//usadas en la app de clientes
router.put('/:id/actualizar/calificacion', ActualizarMotoristaCalificacion);

//usada en varias apps


export default router;