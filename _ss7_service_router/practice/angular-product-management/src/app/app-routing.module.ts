import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './component/product/product.component';
import {ProductCreateComponent} from './component/product-create/product-create.component';
import {ProductEditComponent} from './component/product-edit/product-edit.component';

const routes: Routes = [{
  path: '',
  component: ProductComponent
},
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
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
