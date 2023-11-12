export class Product {
  nombre: string;
  descripcion: string;
  cantidad: number;
  precio: number;
  ubicacion: string;
  fechaIngreso: Date;
  fechaVencimiento: Date  | null;
  stockMinimo: number;
  stockMaximo: number;

  constructor(
    nombre: string,
    descripcion: string,
    cantidad: number,
    precio: number,
    ubicacion: string,
    fechaIngreso: Date,
    fechaVencimiento: Date,
    stockMinimo: number,
    stockMaximo: number
  ) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.precio = precio;
    this.ubicacion = ubicacion;
    this.fechaIngreso = fechaIngreso;
    this.fechaVencimiento = fechaVencimiento;
    this.stockMinimo = stockMinimo;
    this.stockMaximo = stockMaximo;
  }
}
