import { Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent} from '@angular/material/dialog';
  import {MatSnackBarModule} from '@angular/material/snack-bar';
  import Swal from 'sweetalert2';
import { Product } from 'src/app/model/products';
import { ProductService } from 'src/app/services/product.service';
import { ReportPdfService } from 'src/app/services/report-pdf.service';
import { ProductospruebaService } from 'src/app/services/productosprueba.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-report-pdf',
  templateUrl: './product-report-pdf.component.html',
  styleUrls: ['./product-report-pdf.component.css']
})
export class ProductReportPdfComponent {

  displayedColumns: string[] = ['nombre', 'descripcion', 'cantidad', 'precio', 'fechaIngreso','fechaVencimiento'];
  dataSource = new MatTableDataSource<Product>();

  listProduct:Product[]=[];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productosSubscription!: Subscription;
  constructor(
    private productService: ProductService,
    public stackBar: MatSnackBarModule,
    private reportPDFService: ReportPdfService,
    private productospruebaService: ProductospruebaService ){}

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    ngOnInit(){
      this.cargarArticulo()
    }

    ngOnDestroy(): void {
      this.productosSubscription.unsubscribe();
    }


    cargarArticulo(){
      this.productService.setAll(this.productospruebaService.getDummyProducts());
      this.productosSubscription = this.productService.productos$.subscribe(
        (productos) => {
          this.listProduct = productos;
        }
      );
      this.dataSource = new MatTableDataSource(this.listProduct);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    filter(event: any){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    generarPDF(){
      this.reportPDFService.generatePDF();
    }
}
