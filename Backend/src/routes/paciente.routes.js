import { Router } from 'express';
import { 
  getPacientes, 
  getPacienteById, 
  createPaciente 
} from '../controllers/paciente.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { 
  validarCrearPaciente, 
  validarIdPaciente 
} from '../middlewares/paciente.middleware.js';

const router = Router();

// GET /api/pacientes - Obtener lista de pacientes
router.get('/', verificarToken, getPacientes);

// GET /api/pacientes/:id - Obtener paciente por ID (valida token e ID)
router.get('/:id', [verificarToken, validarIdPaciente], getPacienteById);

// POST /api/pacientes - Registrar paciente (valida token y estructura del body)
router.post('/', [verificarToken, validarCrearPaciente], createPaciente);

export default router;