import jwt from 'jsonwebtoken';

// 1. Validar cuerpo de petición en Login
export const validarLogin = (req, res, next) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({
      error: 'El correo y la contraseña son obligatorios'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return res.status(400).json({
      error: 'El formato del correo electrónico no es válido'
    });
  }

  next();
};

// 2. Validar cuerpo de petición en Registro
export const validarRegistro = (req, res, next) => {
  const { tipo_documento, documento, nombres, apellidos, correo, password } = req.body;

  if (!tipo_documento || !documento || !nombres || !apellidos || !correo || !password) {
    return res.status(400).json({
      error: 'Faltan campos obligatorios: tipo_documento, documento, nombres, apellidos, correo y password'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return res.status(400).json({
      error: 'El formato del correo electrónico no es válido'
    });
  }

  if (password.length < 4) {
    return res.status(400).json({
      error: 'La contraseña debe tener al menos 4 caracteres'
    });
  }

  next();
};

// 3. Verificar Token JWT en rutas protegidas
export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado.' });
  }
};

// 4. Middleware de autorización por roles
export const permitirRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ error: 'Usuario no autenticado.' });
    }

    if (!rolesPermitidos.includes(req.usuario.rol_nombre)) {
      return res.status(403).json({
        error: 'No tienes permisos suficientes para realizar esta acción.'
      });
    }

    next();
  };
};
