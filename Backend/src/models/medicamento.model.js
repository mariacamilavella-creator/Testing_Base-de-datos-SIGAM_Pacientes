export class Medicamento {
  constructor({ 
    id_medicamento, 
    nombre, 
    descripcion, 
    cantidad, 
    concentracion,
    fecha_vencimiento 
  }) {
    this.id = id_medicamento;
    this.nombre = nombre;
    this.descripcion = descripcion || '';
    this.cantidad = cantidad !== undefined ? Number(cantidad) : 0;
    this.concentracion = concentracion || '';
    this.fechaVencimiento = fecha_vencimiento || null;
  }

  // Validar si hay stock disponible del medicamento
  tieneStock() {
    return this.cantidad > 0;
  }

  // Validar si el medicamento está próximo a vencer o vencido (opcional, útil para farmacia)
  estaVencido() {
    if (!this.fechaVencimiento) return false;
    const hoy = new Date();
    const vencimiento = new Date(this.fechaVencimiento);
    return vencimiento < hoy;
  }
}