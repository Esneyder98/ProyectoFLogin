import { Component, OnInit,OnDestroy } from '@angular/core';
import { Product } from 'src/app/model/products';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy {
  productosSubscription!: Subscription;
  productList:Product[] =[]
  constructor(private productService: ProductService){

  }

  ngOnInit(): void {
    this.productosSubscription = this.productService.productos$.subscribe(productos => {
      this.productList = productos;
      console.log(this.productList)
    });
  }
  ngOnDestroy(): void {
    // Importante: desuscribirse para evitar pérdida de memoria
    this.productosSubscription.unsubscribe();
  }
}
