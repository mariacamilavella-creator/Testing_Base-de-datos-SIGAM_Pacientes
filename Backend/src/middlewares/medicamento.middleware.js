// Middleware para validar que los datos requeridos vengan al agregar un medicamento
export const validarCrearMedicamento = (req, res, next) => {
  const { nombre, cantidad } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre del medicamento es obligatorio.' });
  }

  if (cantidad === undefined || cantidad === null || cantidad < 0) {
    return res.status(400).json({ error: 'La cantidad inicial es obligatoria y debe ser un valor válido.' });
  }

  next();
};

// Middleware para validar que la cantidad que se va a sumar sea válida
export const validarCantidadMedicamento = (req, res, next) => {
  const { cantidad } = req.body;

  if (cantidad === undefined || cantidad === null || isNaN(cantidad) || Number(cantidad) <= 0) {
    return res.status(400).json({ error: 'La cantidad a agregar debe ser un número mayor a 0.' });
  }

  next();
};

// Middleware opcional: validar roles permitidos para gestionar farmacia (ej. solo Admin o personal autorizado)
export const validarRolMedicamentos = (req, res, next) => {
  const rolesPermitidos = ['ADMIN', 'MEDICO']; // O el rol encargado de farmacia
  
  if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
    return res.status(403).json({ 
      error: 'Acceso denegado: No tienes permisos para gestionar el inventario de medicamentos.' 
    });
  }

  next();
};