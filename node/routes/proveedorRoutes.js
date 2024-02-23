import express from 'express'
import { createProveedor,deleteProveedor,getAllProveedores,getProveedor,updateProveedor } from '../controllers/ProveedorController.js'

const router = express.Router();

router.get('/',getAllProveedores)
router.get('/:id',getProveedor)
router.post('/',createProveedor)
router.put('/:id',updateProveedor)
router.delete('/:id',deleteProveedor);

export default router;