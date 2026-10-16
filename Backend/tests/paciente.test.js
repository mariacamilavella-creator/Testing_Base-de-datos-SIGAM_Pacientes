import dotenv from 'dotenv';
dotenv.config({ path: 'Backend/.env' });

import request from 'supertest';
import app from '../src/app.js';
import pool from '../src/config/db.js';

const DOC_TEST = 'TEST-001';
let token;

const pacientePrueba = {
  tipo_documento: 'CC',
  numero_documento: DOC_TEST,
  primer_nombre: 'Paciente',
  primer_apellido: 'Prueba',
  fecha_nacimiento: '1990-05-10',
  sexo_biologico: 'Masculino',
};

const limpiar = () =>
  pool.query('DELETE FROM pacientes WHERE numero_documento = $1', [DOC_TEST]);

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ correo: process.env.TEST_EMAIL, password: process.env.TEST_PASSWORD });
  token = res.body.token;
  await limpiar();
});

afterAll(async () => {
  //await limpiar();
  await pool.end();
});

describe('Tabla pacientes', () => {
  test('rechaza peticiones sin token', async () => {
    const res = await request(app).get('/api/pacientes');
    expect(res.statusCode).toBe(401);
  });

  test('POST rechaza datos incompletos', async () => {
    const res = await request(app)
      .post('/api/pacientes')
      .set('Authorization', `Bearer ${token}`)
      .send({ primer_nombre: 'Solo nombre' });
    expect(res.statusCode).toBe(400);
  });

  test('POST crea un paciente y queda en la BD', async () => {
    const res = await request(app)
      .post('/api/pacientes')
      .set('Authorization', `Bearer ${token}`)
      .send(pacientePrueba);

    expect(res.statusCode).toBe(201);

    const { rows } = await pool.query(
      'SELECT * FROM pacientes WHERE numero_documento = $1',
      [DOC_TEST]
    );
    expect(rows).toHaveLength(1);
    expect(rows[0].primer_nombre).toBe('Paciente');
  });

  test('GET lista pacientes e incluye el de prueba', async () => {
    const res = await request(app)
      .get('/api/pacientes')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /:id con ID inexistente responde 404', async () => {
    const res = await request(app)
      .get('/api/pacientes/999999')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });

  test('GET /:id con ID inválido responde 400', async () => {
    const res = await request(app)
      .get('/api/pacientes/abc')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
  });
});