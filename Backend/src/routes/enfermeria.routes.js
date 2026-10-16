import { Router } from 'express';
import { 
  createSignosVitales, 
  getSignosVitalesByPaciente, 
  createAplicacionMedicamento, 
  createNotaEnfermeria, 
  createBalanceLiquidos 
} from '../controllers/enfermeria.controller.js';
import { verificarToken, permitirRoles } from '../middlewares/auth.middleware.js';
import { 
  validarSignosVitales, 
  validarAplicacionMedicamento, 
  validarNotaEnfermeria, 
  validarBalanceLiquidos 
} from '../middlewares/enfermeria.middleware.js';

const router = Router();

// Registrar Triage / Signos vitales (Enfermeros, Médicos y Admins)
router.post(
  '/triage', 
  [verificarToken, permitirRoles('Administrador', 'ENFERMERO', 'MEDICO'), validarSignosVitales], 
  createSignosVitales
);

// Consultar historial de Triage / Signos vitales por ID de paciente
router.get(
  '/triage/paciente/:pacienteId', 
  [verificarToken, permitirRoles('Administrador', 'ENFERMERO', 'MEDICO')], 
  getSignosVitalesByPaciente
);

// Registrar aplicación/dispensación de medicamentos en Kardex
router.post(
  '/kardex', 
  [verificarToken, permitirRoles('Administrador', 'ENFERMERO'), validarAplicacionMedicamento], 
  createAplicacionMedicamento
);

// Registrar nota de evolución de enfermería
router.post(
  '/notas', 
  [verificarToken, permitirRoles('Administrador', 'ENFERMERO'), validarNotaEnfermeria], 
  createNotaEnfermeria
);

// Registrar balance de líquidos (Ingresos vs Egresos)
router.post(
  '/balance-liquidos', 
  [verificarToken, permitirRoles('Administrador', 'ENFERMERO'), validarBalanceLiquidos], 
  createBalanceLiquidos
);

export default router;