import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, provideRouter } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { ProductsListComponent } from './products-list.component';

const routes: Routes = [{ path: '', component: ProductsListComponent }];

@NgModule({
  declarations: [ProductsListComponent],
  providers: [provideRouter(routes)],
  imports: [ComponentsModule, CommonModule, FormsModule],
})
export class ProductsListModule {}
