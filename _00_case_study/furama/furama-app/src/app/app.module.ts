import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import {AppComponent} from './app.component';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {ServiceListComponent} from './component/service-list/service-list.component';
import {ServiceEditComponent} from './component/service-edit/service-edit.component';
import {ServiceCreateComponent} from './component/service-create/service-create.component';
import {CustomerListComponent} from './component/customer-list/customer-list.component';
import {CustomerEditComponent} from './component/customer-edit/customer-edit.component';
import {CustomerCreateComponent} from './component/customer-create/customer-create.component';
import {ContractListComponent} from './component/contract-list/contract-list.component';
import {ContractCreateComponent} from './component/contract-create/contract-create.component';
import {IndexComponent} from './component/index/index.component';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';

const routesConfig: Routes = [
  {path: '', component: IndexComponent},
  {path: 'customers', component: CustomerListComponent},
  {path: 'customers/create', component: CustomerCreateComponent},
  {path: 'services', component: ServiceListComponent},
  {path: 'services/create', component: ServiceCreateComponent},
  {path: 'contracts', component: ContractListComponent},
  {path: 'contracts/create', component: ContractCreateComponent},
  {path: '**', component: PageNotFoundComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ServiceListComponent,
    ServiceEditComponent,
    ServiceCreateComponent,
    CustomerListComponent,
    CustomerEditComponent,
    CustomerCreateComponent,
    ContractListComponent,
    ContractCreateComponent,
    IndexComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routesConfig),
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
