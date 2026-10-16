export const validarIdPaciente = (req, res, next) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({ error: 'ID de paciente inválido' });
  }
  next();
};

export const validarCrearPaciente = (req, res, next) => {
  const { numero_documento, primer_nombre, primer_apellido } = req.body || {};
  if (!numero_documento || !primer_nombre || !primer_apellido) {
    return res.status(400).json({
      error: 'El documento, primer nombre y primer apellido son obligatorios.'
    });
  }
  next();
};