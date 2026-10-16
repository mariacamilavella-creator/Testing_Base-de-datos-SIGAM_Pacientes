import { Router } from 'express';
import { getCitas, createCita } from '../controllers/cita.controller.js';
import { verificarToken, permitirRoles } from '../middlewares/auth.middleware.js';

const router = Router();

// El médico consulta su agenda de citas; Admisiones gestiona todas
router.get('/', [verificarToken, permitirRoles('ADMIN', 'MEDICO', 'ADMISIONES')], getCitas);

// Agendar citas (Admisiones, Médicos y Pacientes si tienen acceso)
router.post('/', [verificarToken, permitirRoles('ADMIN', 'ADMISIONES', 'PACIENTE')], createCita);

export default router;