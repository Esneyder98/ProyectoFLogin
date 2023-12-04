import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/model/products';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ProductospruebaService } from 'src/app/services/productosprueba.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  productosSubscription!: Subscription;
  productList: Product[] = [];
  product: any = {}; // Objeto que contiene los datos del producto a actualizar
  showModal = false;
  productIndex!:number;

  constructor(
    private productService: ProductService,
    private productospruebaService: ProductospruebaService
  ) {}

  ngOnInit(): void {
    // this.productosSubscription = this.productService.productos$.subscribe(productos => {
    //   this.productList = productos;
    //   console.log(this.productList);

    this.productService.setAll(this.productospruebaService.getDummyProducts());

    this.productosSubscription = this.productService.productos$.subscribe(
      (productos) => {
        this.productList = productos;
        // Guarda la lista original de productos
        this.originalProductList = productos;
        console.log(this.productList);
      }
    );
  }

  ngOnDestroy(): void {
    this.productosSubscription.unsubscribe();
  }

  onCheckboxChange(event: any): void {
    if (event.target.checked) {
      this.cargarproductosprueba();
    }
  }

  cargarproductosprueba(): void {
    this.productService.setAll(this.productospruebaService.getDummyProducts());
  }

  async deleteProduct(nombre: string) {
    const result = await Swal.fire({
      title: '¿Está seguro que desea eliminar el producto ?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      await this.productService.delete(nombre);
      // Muestra un mensaje de confirmación de eliminación exitosa
      Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Muestra un mensaje de cancelación
      Swal.fire('Cancelado', 'El producto no ha sido eliminado.', 'error');
    }
  }
  updateQuantity(product: Product): void {
    this.productService.update(this.productList.indexOf(product), product);
  }

  originalProductList: Product[] = [];

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue) {
      // Filtra la lista de productos si hay un valor de filtro
      this.productList = this.originalProductList.filter(
        (product) =>
          product.nombre.toLowerCase().includes(filterValue.toLowerCase()) ||
          product.precio <= Number(filterValue)
      );
    } else {
      // Si no hay valor de filtro, muestra todos los productos
      this.productList = [...this.originalProductList];
    }
  }



 async obtenerIndex(index: number){
    this.productIndex = index
    console.log("productIndex"+ this.productIndex)
  }
}
