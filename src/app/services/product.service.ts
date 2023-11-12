import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);



  // Obtener una referencia observable para la lista de productos
  productos$: Observable<Product[]> = this.productsSubject.asObservable();

  create(product: Product) {
    this.products.push(product);
    console.log(this.products);

    this.updateProductsSubject();
  }

  update(index: number, product: Product) {
    if (index >= 0 && index < this.products.length) {
      this.products[index] = product;
      this.updateProductsSubject();
    }
  }

  delete(index: number) {
    if (index >= 0 && index < this.products.length) {
      this.products.splice(index, 1);
      this.updateProductsSubject();
    }
  }

  getAll(): Product[] {
    return this.products;
  }

  private updateProductsSubject() {
    this.productsSubject.next([...this.products]);
  }
}
