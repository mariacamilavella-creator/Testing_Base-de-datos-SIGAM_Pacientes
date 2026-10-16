import pool from '../config/db.js';
import { Medicamento } from '../models/medicamento.model.js';

export const MedicamentoRepository = {
  // Crear un nuevo medicamento
  async create(medicamentoData) {
    const { nombre, descripcion, cantidad, concentracion, fecha_vencimiento } = medicamentoData;
    const query = `
      INSERT INTO medicamentos (nombre, descripcion, cantidad, concentracion, fecha_vencimiento)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [nombre, descripcion || '', cantidad || 0, concentracion || '', fecha_vencimiento || null];
    const { rows } = await pool.query(query, values);
    return new Medicamento(rows[0]);
  },

  // Buscar un medicamento por ID
  async findById(id) {
    const query = `SELECT * FROM medicamentos WHERE id_medicamento = $1;`;
    const { rows } = await pool.query(query, [id]);
    if (!rows[0]) return null;
    return new Medicamento(rows[0]);
  },

  // Agregar cantidad (stock) a un medicamento existente
  async sumarCantidad(id, cantidadASumar) {
    const query = `
      UPDATE medicamentos 
      SET cantidad = cantidad + $1 
      WHERE id_medicamento = $2 
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [cantidadASumar, id]);
    if (!rows[0]) return null;
    return new Medicamento(rows[0]);
  },

  // Eliminar un medicamento
  async delete(id) {
    const query = `DELETE FROM medicamentos WHERE id_medicamento = $1 RETURNING *;`;
    const { rows } = await pool.query(query, [id]);
    return rows[0] ? new Medicamento(rows[0]) : null;
  }
};