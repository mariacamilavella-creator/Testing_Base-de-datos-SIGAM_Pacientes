import app from './app.js';
import pool from './config/db.js';

const PORT = process.env.PORT || 4000;

// Escuchar peticiones HTTP en Express
app.listen(PORT, () => {
  console.log(` Servidor SIGAM ejecutándose en http://localhost:${PORT}`);
});

// Probar la conexión a la base de datos de fondo
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(' Error al conectar con PostgreSQL (sigam_db):', err.message);
  } else {
    console.log(' Base de datos lista. Hora del servidor BD:', res.rows[0].now);
  }
});