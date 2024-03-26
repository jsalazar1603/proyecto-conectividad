import express from 'express';
import { getAllPedidos, getPedido,deletePedido,createPedidoTransaccion, updatePedidoEstado } from '../controllers/PedidosController.js';

const router = express.Router();
router.get('/',getAllPedidos);
router.get('/:id',getPedido);
//router.post('/',createPedido);
router.post('/',createPedidoTransaccion);
router.put('/:id',updatePedidoEstado);
router.delete('/:id',deletePedido);

export default router;