import pool from '../config/db.js';
import { Cita } from '../models/cita.model.js';

export const CitaRepository = {
  async findAll() {
    const query = `
      SELECT c.*, 
             (p.primer_nombre || ' ' || p.primer_apellido) AS paciente_nombre
      FROM citas c
      LEFT JOIN pacientes p ON c.id_paciente = p.id_paciente
      ORDER BY c.fecha_hora DESC;
    `;
    const { rows } = await pool.query(query);
    return rows.map(row => new Cita(row));
  },

  async create(datos) {
    const { id_paciente, id_medico, fecha_hora, motivo } = datos;
    const query = `
      INSERT INTO citas (id_paciente, id_medico, fecha_hora, motivo)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id_paciente, id_medico, fecha_hora, motivo]);
    return new Cita(rows[0]);
  }
};