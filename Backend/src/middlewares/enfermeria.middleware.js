// Middleware para validar el registro de Triage / Signos Vitales (Tabla 'triage')
export const validarSignosVitales = (req, res, next) => {
  const { id_paciente, pas, pad, fc, fr, temperatura, spo2, motivo_consulta } = req.body;

  if (!id_paciente) {
    return res.status(400).json({ error: 'El campo id_paciente es obligatorio.' });
  }

  if (!motivo_consulta || motivo_consulta.trim() === '') {
    return res.status(400).json({ error: 'El motivo_consulta es obligatorio en el registro de triage.' });
  }

  // Validar si envían la temperatura que cumpla un rango médico coherente
  if (temperatura !== undefined && (temperatura < 30.0 || temperatura > 45.0)) {
    return res.status(400).json({ error: 'La temperatura ingresada está fuera de un rango médico válido (30 - 45 °C).' });
  }

  // Validaciones opcionales de formato si se envían los signos vitales
  if (spo2 !== undefined && (spo2 < 0 || spo2 > 100)) {
    return res.status(400).json({ error: 'La saturación de oxígeno (spo2) debe estar entre 0% y 100%.' });
  }

  next();
};

// Middleware para validar la dispensación/aplicación de medicamentos (Tabla 'dispensaciones')
export const validarAplicacionMedicamento = (req, res, next) => {
  const { id_orden, id_item, cantidad_entregada } = req.body;

  if (!id_orden) {
    return res.status(400).json({ error: 'El campo id_orden es obligatorio.' });
  }

  if (!id_item) {
    return res.status(400).json({ error: 'El campo id_item de la medicina o insumo es obligatorio.' });
  }

  if (!cantidad_entregada || isNaN(cantidad_entregada) || cantidad_entregada <= 0) {
    return res.status(400).json({ 
      error: 'La cantidad_entregada debe ser un número entero mayor a 0.' 
    });
  }

  next();
};

// Middleware para validar registros o notas de enfermería en la atención (Tabla 'atenciones' / notas)
export const validarNotaEnfermeria = (req, res, next) => {
  const { id_atencion, observaciones } = req.body;

  if (!id_atencion) {
    return res.status(400).json({ error: 'El campo id_atencion es obligatorio.' });
  }

  if (!observaciones || typeof observaciones !== 'string' || observaciones.trim() === '') {
    return res.status(400).json({ error: 'Las observaciones o detalle de la nota no pueden estar vacíos.' });
  }

  next();
};

// Middleware para validar balance de líquidos o parámetros de admisión
export const validarBalanceLiquidos = (req, res, next) => {
  const { id_atencion, tipo, via, cantidad_ml } = req.body;
  const tiposValidos = ['INGRESO', 'EGRESO'];

  if (!id_atencion) {
    return res.status(400).json({ error: 'El campo id_atencion es obligatorio.' });
  }

  if (!tipo || !tiposValidos.includes(tipo.toUpperCase())) {
    return res.status(400).json({ 
      error: 'El tipo debe ser obligatorio y corresponder a "INGRESO" o "EGRESO".' 
    });
  }

  if (!via || !cantidad_ml || isNaN(cantidad_ml) || cantidad_ml <= 0) {
    return res.status(400).json({ 
      error: 'La vía y la cantidad_ml deben ser un valor válido mayor a 0.' 
    });
  }

  next();
};