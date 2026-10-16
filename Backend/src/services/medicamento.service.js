import { MedicamentoRepository } from '../repositories/medicamento.repository.js';

export const MedicamentoService = {
  // 1. Agregar un nuevo medicamento (aquí puedes poner reglas de negocio, ej. validar duplicados)
  async agregar(medicamentoData) {
    // Ejemplo de validación de negocio adicional: verificar si ya existe por nombre
    const existente = await MedicamentoRepository.findById(medicamentoData.id_medicamento);
    if (existente) {
      throw new Error('Ya existe un medicamento con ese identificador.');
    }
    return await MedicamentoRepository.create(medicamentoData);
  },

  // 2. Agregar cantidad (stock) a un medicamento
  async agregarCantidad(id, cantidadASumar) {
    const medicamento = await MedicamentoRepository.findById(id);
    if (!medicamento) {
      throw new Error('El medicamento no fue encontrado en el inventario.');
    }
    return await MedicamentoRepository.sumarCantidad(id, cantidadASumar);
  },

  // 3. Eliminar un medicamento
  async eliminar(id) {
    const medicamento = await MedicamentoRepository.findById(id);
    if (!medicamento) {
      throw new Error('El medicamento que intentas eliminar no existe.');
    }
    return await MedicamentoRepository.delete(id);
  }
};