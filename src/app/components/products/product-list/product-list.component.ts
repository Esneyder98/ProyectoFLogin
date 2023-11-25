import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/model/products';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ProductospruebaService } from 'src/app/services/productosprueba.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  productosSubscription!: Subscription;
  productList: Product[] = [];

  constructor(private productService: ProductService, private productospruebaService: ProductospruebaService) { }

  ngOnInit(): void {
    // this.productosSubscription = this.productService.productos$.subscribe(productos => {
    //   this.productList = productos;
    //   console.log(this.productList);

      this.productosSubscription = this.productService.productos$.subscribe(productos => {
        this.productList = productos;
        // Guarda la lista original de productos
        this.originalProductList = productos;
        console.log(this.productList);
    });
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

  deleteProduct(nombre: string): void {
    this.productService.delete(nombre);
  }
  updateQuantity(product: Product): void {
    this.productService.update(this.productList.indexOf(product), product);
  }

  originalProductList: Product[] = [];  

  filter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue) {
      // Filtra la lista de productos si hay un valor de filtro
      this.productList = this.originalProductList.filter(product => 
        product.nombre.toLowerCase().includes(filterValue.toLowerCase()) ||
        product.precio <= Number(filterValue)
      );
    } else {
      // Si no hay valor de filtro, muestra todos los productos
      this.productList = [...this.originalProductList];
    }
  }
}
