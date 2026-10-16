import { MedicamentoService } from '../services/medicamento.service.js';

// 1. Agregar un nuevo medicamento al sistema
export const agregarMedicamento = async (req, res) => {
  try {
    const nuevoMedicamento = await MedicamentoService.agregar(req.body);
    res.status(201).json(nuevoMedicamento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 2. Agregar cantidad (stock) a un medicamento existente
export const agregarCantidad = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad } = req.body;
    const medicamentoActualizado = await MedicamentoService.agregarCantidad(id, cantidad);
    res.json(medicamentoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 3. Eliminar un medicamento
export const eliminarMedicamento = async (req, res) => {
  try {
    const { id } = req.params;
    await MedicamentoService.eliminar(id);
    res.status(200).json({ mensaje: 'Medicamento eliminado correctamente' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};