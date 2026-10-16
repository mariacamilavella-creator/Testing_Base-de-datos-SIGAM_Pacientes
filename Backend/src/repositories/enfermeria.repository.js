import pool from '../config/db.js';
import { Triage, NotaEnfermeria, BalanceLiquidos } from '../models/enfermeria.model.js';

export const EnfermeriaRepository = {
  // --- TRIAGE Y SIGNOS VITALES ---
  async createTriage(datos) {
    const { 
      id_paciente, 
      id_enfermero, 
      nivel_triage, 
      pas, 
      pad, 
      fc, 
      fr, 
      temperatura, 
      spo2, 
      peso, 
      motivo_consulta, 
      observaciones 
    } = datos;

    const query = `
      INSERT INTO triage (
        id_paciente, id_enfermero, nivel_triage, pas, pad, fc, fr, 
        temperatura, spo2, peso, motivo_consulta, observaciones
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
    `;

    const values = [
      id_paciente, id_enfermero, nivel_triage, pas, pad, fc, fr, 
      temperatura, spo2, peso, motivo_consulta, observaciones
    ];

    const { rows } = await pool.query(query, values);
    return new Triage(rows[0]);
  },

  async findTriageByPaciente(id_paciente) {
    const query = `
      SELECT t.*, 
             (p.primer_nombre || ' ' || p.primer_apellido) AS paciente_nombre,
             (u.nombres || ' ' || u.apellidos) AS enfermero_nombre
      FROM triage t
      INNER JOIN pacientes p ON t.id_paciente = p.id_paciente
      INNER JOIN usuarios u ON t.id_enfermero = u.id_usuario
      WHERE t.id_paciente = $1
      ORDER BY t.fecha_hora DESC;
    `;

    const { rows } = await pool.query(query, [id_paciente]);
    return rows.map(row => new Triage(row));
  },

  // --- KARDEX Y DISPENSACIÓN DE MEDICAMENTOS ---
  async registrarDispensacion(datos) {
    const { id_orden, id_item, id_lote, id_farmaceuta, cantidad_entregada } = datos;

    const query = `
      INSERT INTO dispensaciones (id_orden, id_item, id_lote, id_farmaceuta, cantidad_entregada)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [
      id_orden, id_item, id_lote, id_farmaceuta, cantidad_entregada
    ]);

    return rows[0];
  },

  // --- NOTAS DE ENFERMERÍA Y BALANCE DE LÍQUIDOS ---
  async createNota(datos) {
    const { id_atencion, id_enfermero, observaciones } = datos;

    // Nota: Se guarda como nota clínica o registro dentro de la atención correspondiente
    const query = `
      INSERT INTO notas_clinicas (id_atencion, id_medico, tipo_nota, subjetivo, objetivo, analisis, plan)
      VALUES ($1, $2, 'NOTAS_ENFERMERIA', $3, '', '', '')
      RETURNING id_nota, id_atencion, id_medico AS id_enfermero, subjetivo AS observaciones, fecha_registro;
    `;

    const { rows } = await pool.query(query, [id_atencion, id_enfermero, observaciones]);
    return new NotaEnfermeria(rows[0]);
  }
};