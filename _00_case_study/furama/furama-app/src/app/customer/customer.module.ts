import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import {CustomerListComponent} from './component/customer-list/customer-list.component';
import {CustomerEditComponent} from './component/customer-edit/customer-edit.component';
import {CustomerCreateComponent} from './component/customer-create/customer-create.component';
import {CustomerRoutingModule} from './customer-routing.module';

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerEditComponent,
    CustomerCreateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
