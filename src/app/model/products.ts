export class Product {
  nombre: string;
  descripcion: string;
  cantidad: number;
  precio: number;
  ubicacion: string;
  fechaIngreso: Date;
  fechaVencimiento: Date | null;
  stockMinimo: number;
  stockMaximo: number;
  imageURL: string;  // Add this line for imageURL property

  constructor(
    nombre: string,
    descripcion: string,
    cantidad: number,
    precio: number,
    ubicacion: string,
    fechaIngreso: Date,
    fechaVencimiento: Date | null,
    stockMinimo: number,
    stockMaximo: number,
    imageURL: string  // Add this line for imageURL property
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
    this.imageURL = imageURL;  // Add this line for imageURL property
  }
}
