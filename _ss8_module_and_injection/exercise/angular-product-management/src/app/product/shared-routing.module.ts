import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductEditComponent} from './component/product-edit/product-edit.component';
import {ProductComponent} from './component/product/product.component';
import {ProductCreateComponent} from './component/product-create/product-create.component';


const routes: Routes = [
  {
    path: 'product/edit/:id',
    component: ProductEditComponent
  },
  {
    path: 'product/delete:id',
    component: ProductComponent
  },
  {
    path: 'product/create',
    component: ProductCreateComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
