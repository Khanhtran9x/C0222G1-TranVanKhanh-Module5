import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductComponent } from './component/product/product.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import { ProductCreateComponent } from './component/product-create/product-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductEditComponent } from './component/product-edit/product-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductCreateComponent,
    ProductEditComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
