import pool from '../config/db.js';
import { Paciente } from '../models/paciente.model.js';

export const PacienteRepository = {
  async findAll() {
    const { rows } = await pool.query('SELECT * FROM pacientes ORDER BY id_paciente DESC');
    return rows.map(row => new Paciente(row));
  },

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM pacientes WHERE id_paciente = $1', [id]);
    if (!rows[0]) return null;
    return new Paciente(rows[0]);
  },

  async create(datos) {
    const d = { ...datos, correo: datos.correo ?? datos.email };

    // estado, estado_bdua, zona_residencia y fecha_registro se omiten
    // para que la base use sus valores por defecto.
    const columnas = [
      'id_usuario', 'tipo_documento', 'numero_documento',
      'primer_nombre', 'segundo_nombre', 'primer_apellido', 'segundo_apellido',
      'fecha_nacimiento', 'sexo_biologico', 'identidad_genero', 'grupo_sanguineo',
      'estado_civil', 'ocupacion', 'direccion', 'telefono', 'correo',
      'departamento', 'municipio',
      'contacto_emergencia_nombre', 'contacto_emergencia_parentesco',
      'contacto_emergencia_telefono', 'id_aseguradora', 'tipo_afiliado',
      'regimen', 'categoria_copago'
    ];

    const valores = columnas.map(c => d[c] ?? null);
    const marcadores = columnas.map((_, i) => `$${i + 1}`).join(', ');

    const query = `
      INSERT INTO pacientes (${columnas.join(', ')})
      VALUES (${marcadores})
      RETURNING *;
    `;

    const { rows } = await pool.query(query, valores);
    return new Paciente(rows[0]);
  }
};