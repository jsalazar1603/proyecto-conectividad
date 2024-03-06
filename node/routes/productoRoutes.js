import express from 'express';
import { getAllProductos,getProducto,createProducto,updateProducto,activateProducto,deactivateProducto } from '../controllers/ProductoController.js';

const router = express.Router();
router.get('/',getAllProductos);
router.get('/:id',getProducto);
router.post('/',createProducto);
router.put('/:id',updateProducto);
router.put('/activate/:id',activateProducto);
router.put('/deactivate/:id',deactivateProducto);
export default router;

