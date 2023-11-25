import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import{MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule
  ],

  exports: [
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AngularMaterialModule { }
