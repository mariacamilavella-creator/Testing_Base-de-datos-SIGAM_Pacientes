import { CitaService } from '../services/cita.service.js';

// Obtener todas las citas
export const getCitas = async (req, res) => {
  try {
    const citas = await CitaService.obtenerCitas();
    res.json(citas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agendar una nueva cita
export const createCita = async (req, res) => {
  try {
    const nuevaCita = await CitaService.crearCita(req.body);
    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};