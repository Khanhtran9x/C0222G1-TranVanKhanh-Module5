import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {FacilityRoutingModule} from './facility-routing.module';

import {ServiceListComponent} from './component/service-list/service-list.component';
import {ServiceEditComponent} from './component/service-edit/service-edit.component';
import {ServiceCreateComponent} from './component/service-create/service-create.component';

@NgModule({
  declarations: [
    ServiceListComponent,
    ServiceEditComponent,
    ServiceCreateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FacilityRoutingModule
  ]
})
export class FacilityModule { }
