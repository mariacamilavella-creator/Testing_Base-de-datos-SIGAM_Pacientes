import pool from '../config/db.js';
import { Usuario } from '../models/auth.model.js';

export const AuthRepository = {
  // Buscar usuario por correo para login
  async findByCorreo(correo) {
    const query = `
      SELECT u.*, r.nombre AS rol_nombre
      FROM usuarios u
      LEFT JOIN roles r ON u.id_rol = r.id_rol
      WHERE u.correo = $1;
    `;
    const { rows } = await pool.query(query, [correo]);
    if (!rows[0]) return null;
    return new Usuario(rows[0]);
  },

  // Insertar usuario con esquema de columnas real
  async create(usuarioData) {
    const {
      id_rol,
      tipo_documento,
      documento,
      nombres,
      apellidos,
      correo,
      password_hash,
      telefono,
      registro_medico_rethus,
      especialidad
    } = usuarioData;

    const query = `
      INSERT INTO usuarios (
        id_rol, tipo_documento, documento, nombres, apellidos,
        correo, password_hash, telefono, registro_medico_rethus, especialidad
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    const values = [
      id_rol || 6, // Rol por defecto PACIENTE
      tipo_documento,
      documento,
      nombres,
      apellidos,
      correo,
      password_hash, // Guarda texto plano
      telefono || null,
      registro_medico_rethus || null,
      especialidad || null
    ];

    const { rows } = await pool.query(query, values);
    return new Usuario(rows[0]);
  }
};