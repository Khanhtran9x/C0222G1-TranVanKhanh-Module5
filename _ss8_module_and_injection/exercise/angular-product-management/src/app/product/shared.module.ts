import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import {ProductComponent} from './component/product/product.component';
import {ProductCreateComponent} from './component/product-create/product-create.component';
import {ProductEditComponent} from './component/product-edit/product-edit.component';
import {CategoryComponent} from './component/category/category.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ProductComponent,
    ProductCreateComponent,
    ProductEditComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule { }
