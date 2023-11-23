import { NgModule } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';

import { ProductsFormComponent } from './products-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  { path: '', component: ProductsFormComponent },
  { path: ':id', component: ProductsFormComponent },
];

@NgModule({
  imports: [CommonModule, ComponentsModule, FormsModule, ReactiveFormsModule],
  providers: [provideRouter(routes)],
  declarations: [ProductsFormComponent],
})
export class ProductsFormModule {}
