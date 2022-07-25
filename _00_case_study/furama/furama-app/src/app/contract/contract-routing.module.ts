import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ContractListComponent} from './component/contract-list/contract-list.component';
import {ContractCreateComponent} from './component/contract-create/contract-create.component';

const routesConfig: Routes = [
  {path: 'contracts', component: ContractListComponent},
  {path: 'contracts/create', component: ContractCreateComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routesConfig)
  ],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
