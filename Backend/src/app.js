import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import citaRoutes from './routes/cita.routes.js';
import pacienteRoutes from './routes/paciente.routes.js';
import medicamentoRoutes from './routes/medicamento.routes.js';
import historialRoutes from './routes/historial.routes.js';
import enfermeriaRoutes from './routes/enfermeria.routes.js';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Endpoints principales
app.use('/api/auth', authRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/medicamentos', medicamentoRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/enfermeria', enfermeriaRoutes);

// Manejador global para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

export default app;