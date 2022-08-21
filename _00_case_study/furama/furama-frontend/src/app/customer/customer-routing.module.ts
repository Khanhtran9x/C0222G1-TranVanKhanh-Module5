import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CustomerListComponent} from './component/customer-list/customer-list.component';
import {CustomerCreateComponent} from './component/customer-create/customer-create.component';
import {CustomerEditComponent} from './component/customer-edit/customer-edit.component';

const routesConfig: Routes = [
  {path: 'customers', component: CustomerListComponent},
  {path: 'customers/create', component: CustomerCreateComponent},
  {path: 'customers/edit/:id', component: CustomerEditComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routesConfig)
  ],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
