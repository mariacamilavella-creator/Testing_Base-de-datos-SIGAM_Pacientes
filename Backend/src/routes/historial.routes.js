import { Router } from 'express';
import { createAtencion, getHistorialPaciente } from '../controllers/historial.controller.js';
import { verificarToken, permitirRoles } from '../middlewares/auth.middleware.js';
import { validarAtencionMedica } from '../middlewares/historial.middleware.js';

const router = Router();

// Ver historial completo del paciente
router.get(
  '/paciente/:idPaciente', 
  [verificarToken, permitirRoles('ADMIN', 'MEDICO')], 
  getHistorialPaciente
);

// Registrar nueva atención / consulta
router.post(
  '/', 
  [verificarToken, permitirRoles('ADMIN', 'MEDICO'), validarAtencionMedica], 
  createAtencion
);

export default router;