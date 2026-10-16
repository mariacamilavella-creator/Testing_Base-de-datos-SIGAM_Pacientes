import { Router } from 'express';
import { 
  agregarMedicamento, 
  agregarCantidad, 
  eliminarMedicamento 
} from '../controllers/medicamento.controller.js';
import { 
  validarCrearMedicamento, 
  validarCantidadMedicamento, 
  validarRolMedicamentos 
} from '../middlewares/medicamento.middleware.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// 1. Agregar un nuevo medicamento (Requiere autenticación, validación de datos y rol permitido)
router.post(
  '/', 
  [verificarToken, validarRolMedicamentos, validarCrearMedicamento], 
  agregarMedicamento
);

// 2. Agregar stock/cantidad a un medicamento existente por su ID
router.patch(
  '/:id/cantidad', 
  [verificarToken, validarRolMedicamentos, validarCantidadMedicamento], 
  agregarCantidad
);

// 3. Eliminar un medicamento por su ID
router.delete(
  '/:id', 
  [verificarToken, validarRolMedicamentos], 
  eliminarMedicamento
);

export default router;