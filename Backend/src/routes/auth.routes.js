import { Router } from 'express';
import { login, registro } from '../controllers/auth.controller.js';
import {
  validarLogin,
  validarRegistro
} from '../middlewares/auth.middleware.js';

const router = Router();

// POST /api/auth/login - Autenticación con correo y contraseña en texto plano
router.post('/login', validarLogin, login);

// POST /api/auth/registro - Crear nuevo usuario
router.post('/registro', validarRegistro, registro);

export default router;  
