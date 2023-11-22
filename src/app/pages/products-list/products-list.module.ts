import { NgModule } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { ProductsListComponent } from './products-list.component';

const routes: Routes = [{ path: '', component: ProductsListComponent }];

@NgModule({
  providers: [provideRouter(routes)],
})
export class ProductsListModule {}
