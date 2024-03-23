import express from 'express';
import { getAllPedidos, getPedido, createPedido,updatePedido,deletePedido } from '../controllers/PedidosController.js';

const router = express.Router();
router.get('/',getAllPedidos);
router.get('/:id',getPedido);
router.post('/',createPedido);
router.put('/:id',updatePedido);
router.delete('/:id',deletePedido);

export default router;