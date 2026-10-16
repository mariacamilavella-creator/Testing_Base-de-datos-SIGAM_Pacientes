import pool from '../config/db.js';
import { AtencionMedica } from '../models/historial.model.js';

export const HistorialRepository = {
  // Asegura que exista el registro en 'historial_clinico'
  async obtenerOCrearHistorial(id_paciente, client) {
    const resExistente = await client.query(
      'SELECT id_historial FROM historial_clinico WHERE id_paciente = $1;',
      [id_paciente]
    );

    if (resExistente.rows.length > 0) {
      return resExistente.rows[0].id_historial;
    }

    const nuevoHistorial = await client.query(
      'INSERT INTO historial_clinico (id_paciente) VALUES ($1) RETURNING id_historial;',
      [id_paciente]
    );
    return nuevoHistorial.rows[0].id_historial;
  },

  // Registra una atención completa (Atención + Nota Clínica SOAP)
  async crearAtencionConNota(datos) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 1. Obtener o crear id_historial para el paciente
      const id_historial = await this.obtenerOCrearHistorial(datos.id_paciente, client);

      // 2. Insertar en la tabla 'atenciones'
      const queryAtencion = `
        INSERT INTO atenciones (id_historial, id_medico, id_cita, tipo_atencion)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const resAtencion = await client.query(queryAtencion, [
        id_historial,
        datos.id_medico,
        datos.id_cita || null,
        datos.tipo_atencion || 'Consulta Externa'
      ]);
      const nuevaAtencion = resAtencion.rows[0];

      // 3. Insertar la nota clínica (Estructura SOAP)
      const queryNota = `
        INSERT INTO notas_clinicas (id_atencion, id_medico, tipo_nota, subjetivo, objetivo, analisis, plan)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `;
      await client.query(queryNota, [
        nuevaAtencion.id_atencion,
        datos.id_medico,
        datos.tipo_nota || 'Evolucion',
        datos.subjetivo,
        datos.objetivo,
        datos.analisis,
        datos.plan
      ]);

      await client.query('COMMIT');
      return new AtencionMedica(nuevaAtencion);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  // Consulta el historial clínico completo de un paciente con sus notas
  async obtenerHistorialPorPaciente(id_paciente) {
    const query = `
      SELECT 
        a.id_atencion, a.tipo_atencion, a.fecha_ingreso, a.estado,
        u.nombres AS nombre_medico, u.apellidos AS apellido_medico,
        nc.subjetivo, nc.objetivo, nc.analisis, nc.plan
      FROM historial_clinico h
      JOIN atenciones a ON h.id_historial = a.id_historial
      JOIN usuarios u ON a.id_medico = u.id_usuario
      LEFT JOIN notas_clinicas nc ON a.id_atencion = nc.id_atencion
      WHERE h.id_paciente = $1
      ORDER BY a.fecha_ingreso DESC;
    `;
    const { rows } = await pool.query(query, [id_paciente]);
    return rows;
  }
};