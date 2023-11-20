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

  constructor(private productService: ProductService, private productospruebaService: ProductospruebaService) {}

  ngOnInit(): void {
    this.productosSubscription = this.productService.productos$.subscribe(productos => {
      this.productList = productos;
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
  
}
