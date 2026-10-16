export class Paciente {
  constructor({ 
    id_paciente, 
    tipo_documento, 
    numero_documento, 
    primer_nombre, 
    segundo_nombre, 
    primer_apellido, 
    segundo_apellido,
    email,
    telefono,
    fecha_nacimiento
  }) {
    this.id = id_paciente;
    this.tipoDocumento = tipo_documento;
    this.numeroDocumento = numero_documento;
    this.primerNombre = primer_nombre;
    this.segundoNombre = segundo_nombre || '';
    this.primerApellido = primer_apellido;
    this.segundoApellido = segundo_apellido || '';
    this.email = email || null;
    this.telefono = telefono || null;
    this.fechaNacimiento = fecha_nacimiento || null;
  }

  // Getter para obtener el nombre completo formateado
  get nombreCompleto() {
    const nombres = `${this.primerNombre} ${this.segundoNombre}`.trim();
    const apellidos = `${this.primerApellido} ${this.segundoApellido}`.trim();
    return `${nombres} ${apellidos}`;
  }

  toJSON() {
    return {
      id: this.id,
      tipoDocumento: this.tipoDocumento,
      numeroDocumento: this.numeroDocumento,
      nombreCompleto: this.nombreCompleto,
      email: this.email,
      telefono: this.telefono,
      fechaNacimiento: this.fechaNacimiento
    };
  }
}