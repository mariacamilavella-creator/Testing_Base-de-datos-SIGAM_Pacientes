import { PacienteService } from '../services/paciente.service.js';

// Obtener todos los pacientes
export const getPacientes = async (req, res) => {
  try {
    const pacientes = await PacienteService.obtenerTodos();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un paciente por ID
export const getPacienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const paciente = await PacienteService.obtenerPorId(id);
    res.json(paciente);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Registrar un nuevo paciente
export const createPaciente = async (req, res) => {
  try {
    const nuevoPaciente = await PacienteService.registrarPaciente(req.body);
    res.status(201).json(nuevoPaciente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};