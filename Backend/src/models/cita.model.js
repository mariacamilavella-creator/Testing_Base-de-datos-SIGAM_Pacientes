export class Cita {
  constructor({ 
    id_cita, 
    id_paciente, 
    paciente_nombre, 
    id_medico, 
    medico_nombre, 
    fecha_hora, 
    estado, 
    motivo 
  }) {
    this.id = id_cita;
    this.idPaciente = id_paciente;
    this.pacienteNombre = paciente_nombre || null;
    this.idMedico = id_medico || null;
    this.medicoNombre = medico_nombre || null;
    this.fechaHora = fecha_hora;
    this.estado = estado || 'PENDIENTE';
    this.motivo = motivo || '';
  }

  // Validar si la cita está en un estado que permite cancelación
  esCancelable() {
    return this.estado === 'PENDIENTE' || this.estado === 'CONFIRMADA';
  }
}