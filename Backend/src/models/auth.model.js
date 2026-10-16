export class Usuario {
  constructor(data) {
    this.id_usuario = data.id_usuario;
    this.id_rol = data.id_rol;
    this.rol_nombre = data.rol_nombre || null;
    this.tipo_documento = data.tipo_documento;
    this.documento = data.documento;
    this.nombres = data.nombres;
    this.apellidos = data.apellidos;
    this.correo = data.correo;
    this.password_hash = data.password_hash; // Almacena texto plano
    this.telefono = data.telefono || null;
    this.registro_medico_rethus = data.registro_medico_rethus || null;
    this.especialidad = data.especialidad || null;
    this.estado = data.estado || 'Activo';
    this.fecha_creacion = data.fecha_creacion;
  }

  // Método para retornar los datos seguros al Frontend (excluyendo la contraseña)
  toPublicJSON() {
    return {
      id_usuario: this.id_usuario,
      id_rol: this.id_rol,
      rol_nombre: this.rol_nombre,
      tipo_documento: this.tipo_documento,
      documento: this.documento,
      nombres: this.nombres,
      apellidos: this.apellidos,
      correo: this.correo,
      telefono: this.telefono,
      registro_medico_rethus: this.registro_medico_rethus,
      especialidad: this.especialidad,
      estado: this.estado,
      fecha_creacion: this.fecha_creacion
    };
  }
}