export class AtencionMedica {
  constructor({
    id_atencion,
    id_historial,
    id_medico,
    id_cita,
    tipo_atencion,
    fecha_ingreso,
    estado
  }) {
    this.id = id_atencion;
    this.idHistorial = id_historial;
    this.idMedico = id_medico;
    this.idCita = id_cita || null;
    this.tipoAtencion = tipo_atencion;
    this.fechaIngreso = fecha_ingreso;
    this.estado = estado;
  }

  toJSON() {
    return {
      id: this.id,
      idHistorial: this.idHistorial,
      idMedico: this.idMedico,
      idCita: this.idCita,
      tipoAtencion: this.tipoAtencion,
      fechaIngreso: this.fechaIngreso,
      estado: this.estado
    };
  }
}