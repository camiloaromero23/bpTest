import { NgModule } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';

import { ProductsFormComponent } from './products-form.component';

const routes: Routes = [
  { path: '', component: ProductsFormComponent },
  { path: ':id', component: ProductsFormComponent },
];

@NgModule({
  providers: [provideRouter(routes)],
  declarations: [ProductsFormComponent],
})
export class ProductsFormModule {}
