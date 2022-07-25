import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServiceListComponent} from './component/service-list/service-list.component';
import {ServiceCreateComponent} from './component/service-create/service-create.component';
import {ServiceEditComponent} from './component/service-edit/service-edit.component';


const routesConfig: Routes = [
  {path: 'services', component: ServiceListComponent},
  {path: 'services/create', component: ServiceCreateComponent},
  {path: 'services/edit/:id', component: ServiceEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routesConfig)],
  exports: [RouterModule]
})
export class FacilityRoutingModule { }
