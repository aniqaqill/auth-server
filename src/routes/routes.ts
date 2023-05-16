import express from 'express';
import verifyToken from '../middleware/middleware';
import { login, register, getUser } from '../controller/user';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/profile/:id', verifyToken(), getUser);




export default router;