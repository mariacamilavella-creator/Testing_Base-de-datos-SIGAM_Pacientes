import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthRepository } from '../repositories/auth.repository.js';

export const AuthService = {
  async login(correo, password) {
    // 1. Buscar usuario por correo
    const usuario = await AuthRepository.findByCorreo(correo);
    if (!usuario) {
      throw new Error('Credenciales inválidas.');
    }

    // 2. Verificar estado de la cuenta
    if (usuario.estado !== 'Activo') {
      throw new Error('El usuario se encuentra inactivo.');
    }

    // 3. Comparar la contraseña con el hash de bcrypt
    const coincide = await bcrypt.compare(password, usuario.password_hash);
    if (!coincide) {
      throw new Error('Credenciales inválidas.');
    }

    // 4. Generar Token JWT
    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        id_rol: usuario.id_rol,
        rol_nombre: usuario.rol_nombre,
        correo: usuario.correo
      },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '8h' }
    );

    return {
      token,
      usuario: usuario.toPublicJSON ? usuario.toPublicJSON() : usuario
    };
  },

  async registrar(datos) {
    // 1. Validar duplicidad por correo
    const existe = await AuthRepository.findByCorreo(datos.correo);
    if (existe) {
      throw new Error('El correo electrónico ya se encuentra registrado.');
    }

    // 2. Guardar la contraseña encriptada con bcrypt
    const nuevoUsuario = await AuthRepository.create({
      ...datos,
      password_hash: await bcrypt.hash(datos.password, 10)
    });

    return nuevoUsuario.toPublicJSON ? nuevoUsuario.toPublicJSON() : nuevoUsuario;
  }
};