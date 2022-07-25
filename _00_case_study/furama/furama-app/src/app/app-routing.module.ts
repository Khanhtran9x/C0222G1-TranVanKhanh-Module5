import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './component/index/index.component';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {FacilityRoutingModule} from './facility/facility-routing.module';
import {CustomerRoutingModule} from './customer/customer-routing.module';
import {ContractRoutingModule} from './contract/contract-routing.module';

const routesConfig: Routes = [
  {path: '', component: IndexComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routesConfig),
    FacilityRoutingModule,
    CustomerRoutingModule,
    ContractRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
