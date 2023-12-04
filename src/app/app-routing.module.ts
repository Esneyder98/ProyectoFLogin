import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductReportPdfComponent } from './components/products/product-report-pdf/product-report-pdf.component';
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: ProductListComponent},
  {path: "create", component: ProductCreateComponent },
  {path: "main/edit/:id", component: ProductCreateComponent },
  {path: "list", component: ProductReportPdfComponent},
  {path: "list/edit/:id", component: ProductCreateComponent},
  {path: '**', component: LoginComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
