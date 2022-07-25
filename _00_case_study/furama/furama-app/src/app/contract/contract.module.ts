import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import {ContractRoutingModule} from './contract-routing.module';
import {ContractListComponent} from './component/contract-list/contract-list.component';
import {ContractCreateComponent} from './component/contract-create/contract-create.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    ContractListComponent,
    ContractCreateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ContractRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
    }),
  ]
})
export class ContractModule { }
