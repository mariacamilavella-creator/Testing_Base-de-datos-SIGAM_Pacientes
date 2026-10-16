// src/models/enfermeria.model.js

export class Triage {
  constructor({
    id_triage,
    id_paciente,
    paciente_nombre,
    id_enfermero,
    enfermero_nombre,
    nivel_triage,
    pas,
    pad,
    fc,
    fr,
    temperatura,
    spo2,
    peso,
    motivo_consulta,
    observaciones,
    fecha_hora
  }) {
    this.id = id_triage;
    this.idPaciente = id_paciente;
    this.pacienteNombre = paciente_nombre || null;
    this.idEnfermero = id_enfermero;
    this.enfermeroNombre = enfermero_nombre || null;
    this.nivelTriage = nivel_triage; // 1 a 5
    this.pas = pas || null;
    this.pad = pad || null;
    this.fc = fc || null;
    this.fr = fr || null;
    this.temperatura = temperatura || null;
    this.spo2 = spo2 || null;
    this.peso = peso || null;
    this.motivoConsulta = motivo_consulta;
    this.observaciones = observaciones || '';
    this.fechaHora = fecha_hora || new Date();
  }

  // Regla de negocio: Determina la urgencia según el nivel de triage
  esUrgenciaVital() {
    return this.nivelTriage === 1 || this.nivelTriage === 2;
  }
}

export class NotaEnfermeria {
  constructor({
    id_nota,
    id_atencion,
    id_enfermero,
    enfermero_nombre,
    observaciones,
    fecha_registro
  }) {
    this.id = id_nota;
    this.idAtencion = id_atencion;
    this.idEnfermero = id_enfermero;
    this.enfermeroNombre = enfermero_nombre || null;
    this.observaciones = observaciones;
    this.fechaRegistro = fecha_registro || new Date();
  }
}

export class BalanceLiquidos {
  constructor({
    id_balance,
    id_atencion,
    id_enfermero,
    tipo,
    via,
    cantidad_ml,
    observaciones,
    fecha_registro
  }) {
    this.id = id_balance;
    this.idAtencion = id_atencion;
    this.idEnfermero = id_enfermero;
    this.tipo = tipo; // 'INGRESO' o 'EGRESO'
    this.via = via;
    this.cantidadMl = cantidad_ml;
    this.observaciones = observaciones || '';
    this.fechaRegistro = fecha_registro || new Date();
  }
}