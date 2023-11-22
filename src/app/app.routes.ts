import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/products-list/products-list.module').then(
        (m) => m.ProductsListModule,
      ),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./pages/products-form/products-form.module').then(
        (m) => m.ProductsFormModule,
      ),
  },
  {
    path: 'product/:id',
    loadChildren: () =>
      import('./pages/products-form/products-form.module').then(
        (m) => m.ProductsFormModule,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
