import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/products';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
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
  imageURL: string;
  imageProductDefault = "../../assets/img/product_default.png"
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
  imageURLvalido!: boolean | null;
  idArticulo:any;
  accion = "Agregar"
  fechaIngresoFormatted!:any;
  fechaVencimientoFormatted!:any;
  constructor(
    private productService: ProductService,
    private router: Router,
    private oRoute: ActivatedRoute){
    this.nombre = "";
    this.descripcion="";
    this.cantidad = 0;
    this.precio = 0;
    this.ubicacion = "";
    this.fechaIngreso = null;
    this.fechaVencimiento = null;
    this.stockMinimo = 0;
    this.stockMaximo = 0;
    this.imageURL = "";
    // se puede capturar el id del producto
    this.idArticulo = this.oRoute.snapshot.params['id']
  }

  ngOnInit(){
    if(this.idArticulo !== undefined){
      this.accion = "Editar"
    }else{
      this.accion = "Agregar"
    }
    this.obtenerArticulo();
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
    this.imageURL == '' ? (this.imageURLvalido = false) : (this.imageURLvalido = true);
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
      imageURL: this.imageURL!="" ? this.imageURL: this.imageProductDefault,
    };
    // Lógica para manejar el envío del formulario
    if(this.idArticulo !== undefined){
      this.productService.editarArticulo(newProduct,this.idArticulo);
      this.resetearCampos()
      this.showSuccessAlert('¡Edición exitosa!','El producto se ha Actualizado correctamente.')
      this.router.navigate(['/list']);
    }else{
      this.productService.create(newProduct);
      this.resetearCampos()
      this.showSuccessAlert('¡Registro exitoso!','El producto se ha registrado correctamente.')
      this.router.navigate(['/list']);
    }

  }

  showSuccessAlert(title:string,text:string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
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
    this.imageURL = "";
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
    this.imageURLvalido = null
  }

  obtenerArticulo(){
    const articulo = this.productService.getByIndex(this.idArticulo);
    this.nombre = articulo.nombre
    this.descripcion= articulo.descripcion
    this.cantidad = articulo.cantidad;
    this.precio = articulo.precio;
    this.ubicacion = articulo.ubicacion;
    this.stockMinimo =articulo.stockMinimo;
    this.stockMaximo =  articulo.stockMaximo;
    this.imageURL = articulo.imageURL;

     // Obtener las fechas
    const fechaIngreso = articulo.fechaIngreso ? new Date(articulo.fechaIngreso) : new Date();
    const fechaVencimiento = articulo.fechaVencimiento ? new Date(articulo.fechaVencimiento) : new Date(fechaIngreso.getFullYear() + 1, fechaIngreso.getMonth(), fechaIngreso.getDate());

    // Formatear las fechas al formato 'dd/mm/yyyy'
    this.fechaIngresoFormatted = this.formatDate(fechaIngreso);
    this.fechaVencimientoFormatted = this.formatDate(fechaVencimiento);

    // Asignar las fechas formateadas a las variables con ngModel
    this.fechaIngreso = fechaIngreso;
    this.fechaVencimiento = fechaVencimiento;
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Agregar un cero delante del día o mes si son menores que 10
    const formattedDay = (day < 10) ? `0${day}` : `${day}`;
    const formattedMonth = (month < 10) ? `0${month}` : `${month}`;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }
}
