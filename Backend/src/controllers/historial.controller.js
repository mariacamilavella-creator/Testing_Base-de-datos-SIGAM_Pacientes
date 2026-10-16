import { HistorialService } from '../services/historial.service.js';

export const createAtencion = async (req, res) => {
  try {
    // Tomamos el id_usuario (médico) decodificado desde el token JWT (verificarToken)
    const datos = {
      ...req.body,
      id_medico: req.usuario.id_usuario
    };

    const atencion = await HistorialService.registrarAtencion(datos);
    return res.status(201).json({
      exito: true,
      mensaje: 'Atención y nota clínica registradas correctamente.',
      data: atencion
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getHistorialPaciente = async (req, res) => {
  try {
    const { idPaciente } = req.params;
    const historial = await HistorialService.consultarHistorialPaciente(idPaciente);
    return res.status(200).json({
      exito: true,
      data: historial
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};