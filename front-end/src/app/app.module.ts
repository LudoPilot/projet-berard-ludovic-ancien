import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app.routes';
import { ProductSearchComponent } from './product-search/product-search.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';

import { CartState } from './stores/cart.state';
import { ApiService } from './api.service';
import { ApiHttpInterceptor } from './http-interceptor';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	CommonModule,
    FormsModule,
	HttpClientModule,
	NgxsModule.forRoot([CartState]),
  ],
  providers: [
	{ provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
	ApiService
  ],
  bootstrap: []
})
export class AppModule { }