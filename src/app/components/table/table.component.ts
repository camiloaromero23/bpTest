import { Component, Input } from '@angular/core';
import { Product } from '../../pages/product.service';
import { tableHeaders, tableKeys } from '../../constants/tableKeys.constant';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input({ required: true }) data!: Observable<Product[]>;
  tableHeaders = tableHeaders;
  tableKeys = tableKeys;

  constructor(private router: Router) {}

  actions = [
    {
      label: 'Editar',
      onClick: (id: string) => {
        this.router.navigate(['/product', id]);
      },
    },
    {
      label: 'Eliminar',
      onClick: (id: string) => {
        // mutateAsync(id),
        // delete product
      },
    },
  ];
}
