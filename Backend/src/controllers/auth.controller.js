import { AuthService } from '../services/auth.service.js';

// Iniciar sesión (Login)
export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;
   
    // Autentica con correo y contraseña en texto plano
    const resultado = await AuthService.login(correo, password);
   
    return res.json(resultado);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

// Registro de usuario
export const registro = async (req, res) => {
  try {
    const nuevoUsuario = await AuthService.registrar(req.body);
   
    return res.status(201).json(nuevoUsuario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};