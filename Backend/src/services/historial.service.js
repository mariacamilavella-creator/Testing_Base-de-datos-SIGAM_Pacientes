import { HistorialRepository } from '../repositories/historial.repository.js';

export const HistorialService = {
  async registrarAtencion(datos) {
    const nuevaAtencion = await HistorialRepository.crearAtencionConNota(datos);
    return nuevaAtencion.toJSON();
  },

  async consultarHistorialPaciente(id_paciente) {
    return await HistorialRepository.obtenerHistorialPorPaciente(id_paciente);
  }
};