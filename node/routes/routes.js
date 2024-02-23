import express from 'express'
import { activateUser, createUser, deleteUser, getAllUsers, getUser, updateUser, validateDni } from '../controllers/UserController.js';
import { loginUser } from '../controllers/AuthController.js';

const router = express.Router();

router.get('/',getAllUsers)
router.get('/:id',getUser)
router.post('/',createUser)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)
router.post('/login', loginUser);
router.put('/activate/:id',activateUser)
router.post('/validate/:id',validateDni)


export default router