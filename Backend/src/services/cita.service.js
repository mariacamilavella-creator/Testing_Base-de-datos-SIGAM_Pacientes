import { CitaRepository } from '../repositories/cita.repository.js';

export const CitaService = {
  async crearCita(datosCita) {
    // Aquí puedes agregar validaciones de negocio adicionales si las necesitas
    return await CitaRepository.create(datosCita);
  },

  async obtenerCitas() {
    return await CitaRepository.findAll();
  }
};