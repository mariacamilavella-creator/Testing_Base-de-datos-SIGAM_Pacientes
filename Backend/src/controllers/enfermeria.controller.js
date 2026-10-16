import { EnfermeriaService } from '../services/enfermeria.service.js';

export const createSignosVitales = async (req, res) => {
  try {
    // Inyectamos el id_enfermero desde req.usuario (Token JWT)
    const registro = await EnfermeriaService.registrarSignosVitales({
      ...req.body,
      id_enfermero: req.usuario?.id_usuario || req.body.id_enfermero
    });
    res.status(201).json(registro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener el historial de signos vitales de un paciente
export const getSignosVitalesByPaciente = async (req, res) => {
  try {
    const { pacienteId } = req.params;
    const historial = await EnfermeriaService.obtenerSignosVitalesPorPaciente(pacienteId);
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Registrar aplicación de medicamento en el Kardex (dispensaciones)
export const createAplicacionMedicamento = async (req, res) => {
  try {
    const aplicacion = await EnfermeriaService.aplicarMedicamento({
      ...req.body,
      id_farmaceuta: req.usuario?.id_usuario || req.body.id_farmaceuta
    });
    res.status(201).json(aplicacion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Crear nota de evolución de enfermería
export const createNotaEnfermeria = async (req, res) => {
  try {
    const nota = await EnfermeriaService.crearNotaEnfermeria({
      ...req.body,
      id_enfermero: req.usuario?.id_usuario || req.body.id_enfermero
    });
    res.status(201).json(nota);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Registrar balance de líquidos (Ingresos y Egresos)
export const createBalanceLiquidos = async (req, res) => {
  try {
    const balance = await EnfermeriaService.registrarBalanceLiquidos({
      ...req.body,
      id_enfermero: req.usuario?.id_usuario || req.body.id_enfermero
    });
    res.status(201).json(balance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};