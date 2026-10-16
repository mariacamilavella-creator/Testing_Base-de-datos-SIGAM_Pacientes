import { PacienteRepository } from '../repositories/paciente.repository.js';

export const PacienteService = {
  async obtenerTodos() {
    return await PacienteRepository.findAll();
  },

  async obtenerPorId(id) {
    const paciente = await PacienteRepository.findById(id);
    if (!paciente) {
      throw new Error('El paciente solicitado no existe.');
    }
    return paciente;
  },

  async registrarPaciente(datos) {
    if (!datos.numero_documento || !datos.primer_nombre || !datos.primer_apellido) {
      throw new Error('El documento, primer nombre y primer apellido son obligatorios.');
    }
    return await PacienteRepository.create(datos);
  }
};