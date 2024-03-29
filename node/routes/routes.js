import express from 'express'
import { activateUser, createUser, createUserValDni, deleteUser, getAllUsers, getUser, updateUser, updateUserValDni} from '../controllers/UserController.js';
import { loginUser, logoutUser } from '../controllers/AuthController.js';

const router = express.Router();

router.get('/',getAllUsers)
router.get('/:id',getUser)
//router.post('/',createUser)
//router.put('/:id',updateUser)
router.delete('/:id',deleteUser)
router.post('/login', loginUser);
router.put('/activate/:id',activateUser);
//router.post('/validate/:id',validateDni)
router.post('/',createUserValDni);
router.put('/:id',updateUserValDni);
router.post('/logout', logoutUser);

export default router