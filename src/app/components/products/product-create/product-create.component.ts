import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/products';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  nombre: string;
  descripcion: string;
  cantidad: number;
  precio: number;
  ubicacion: string;
  fechaIngreso: Date | null;
  fechaVencimiento: Date  | null;
  stockMinimo: number;
  stockMaximo: number;

    // Variables de validación
  nombreValido!: boolean | null;
  descripcionValido!: boolean | null;
  cantidadValido!: boolean | null;
  precioValido!: boolean | null;
  ubicacionValido!: boolean | null;
  fechaIngresoValido!: boolean | null;
  fechaVencimientoValido!: boolean | null;
  stockMinimoValido!: boolean | null;
  stockMaximoValido!: boolean | null;

  constructor(
    private productService: ProductService){
    this.nombre = "";
    this.descripcion="";
    this.cantidad = 0;
    this.precio = 0;
    this.ubicacion = "";
    this.fechaIngreso = null;
    this.fechaVencimiento = null;
    this.stockMinimo = 0;
    this.stockMaximo = 0;
  }

  validarCampos(){
    this.nombre == '' ? (this.nombreValido = false) : (this.nombreValido = true);
    this.descripcion == '' ? (this.descripcionValido = false) : (this.descripcionValido = true);
    this.cantidad == 0 ? (this.cantidadValido = false) : (this.cantidadValido = true);
    this.precio == 0 ? (this.precioValido = false) : (this.precioValido = true);
    this.ubicacion == '' ? (this.ubicacionValido = false) : (this.ubicacionValido = true);
    this.fechaIngreso == null ? (this.fechaIngresoValido = false) : (this.fechaIngresoValido = true);
    this.fechaVencimiento == null ? (this.fechaVencimientoValido = false) : (this.fechaVencimientoValido = true);
    this.stockMinimo == 0 ? (this.stockMinimoValido = false) : (this.stockMinimoValido = true);
    this.stockMaximo == 0 ? (this.stockMaximoValido = false) : (this.stockMaximoValido = true);
  }

  //creacion de productos
  onSubmit(event: Event) {
    event.preventDefault();
    this.validarCampos()
    // Validar si todos los campos requeridos están completos
    if (!this.nombre || !this.descripcion || !this.cantidad || !this.precio || !this.ubicacion || !this.fechaIngreso || !this.fechaVencimiento || !this.stockMinimo || !this.stockMaximo) {
      return;
    }
    const newProduct: Product = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      cantidad: this.cantidad,
      precio: this.precio,
      ubicacion: this.ubicacion,
      fechaIngreso: this.fechaIngreso,
      fechaVencimiento: this.fechaVencimiento,
      stockMinimo: this.stockMinimo,
      stockMaximo: this.stockMaximo,
    };
    // Lógica para manejar el envío del formulario
    this.productService.create(newProduct);
    this.resetearCampos()
    this.showSuccessAlert()
  }

  showSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: '¡Registro exitoso!',
      text: 'El producto se ha registrado correctamente.',
    });
  }

  resetearCampos(){
    this.nombre = "";
    this.descripcion="";
    this.cantidad = 0;
    this.precio = 0;
    this.ubicacion = "";
    this.fechaIngreso = null;
    this.fechaVencimiento = null;
    this.stockMinimo = 0;
    this.stockMaximo = 0;
    //reseteo validaciones
    this.nombreValido = null
    this.descripcionValido = null
    this.cantidadValido = null
    this.precioValido = null
    this.ubicacionValido = null
    this.fechaIngresoValido = null
    this.fechaVencimientoValido = null
    this.stockMinimoValido = null
    this.stockMaximoValido = null
  }
}
