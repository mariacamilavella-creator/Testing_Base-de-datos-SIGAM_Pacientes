import { EnfermeriaRepository } from '../repositories/enfermeria.repository.js';

export const EnfermeriaService = {
  // Registrar signos vitales / Triage
  async registrarSignosVitales(datosTriage) {
    // Validaciones o reglas de negocio adicionales antes de persistir
    return await EnfermeriaRepository.createTriage(datosTriage);
  },

  // Obtener historial de signos vitales por paciente
  async obtenerSignosVitalesPorPaciente(idPaciente) {
    return await EnfermeriaRepository.findTriageByPaciente(idPaciente);
  },

  // Registrar aplicación o dispensación de medicamentos
  async aplicarMedicamento(datosDispensacion) {
    return await EnfermeriaRepository.registrarDispensacion(datosDispensacion);
  },

  // Crear nota de enfermería
  async crearNotaEnfermeria(datosNota) {
    return await EnfermeriaRepository.createNota(datosNota);
  },

  // Registrar balance de líquidos
  async registrarBalanceLiquidos(datosBalance) {
    // Aquí puedes incluir reglas de negocio como calcular totales de ingresos/egresos
    return await EnfermeriaRepository.createNota({
      id_atencion: datosBalance.id_atencion,
      id_enfermero: datosBalance.id_enfermero,
      observaciones: `BALANCE DE LÍQUIDOS [${datosBalance.tipo}]: Vía ${datosBalance.via} - Cantidad: ${datosBalance.cantidad_ml}ml`
    });
  }
};