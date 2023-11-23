import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, ProductService } from '../../pages/product.service';
import { tableHeaders, tableKeys } from '../../constants/tableKeys.constant';
import { Observable, catchError, tap } from 'rxjs';
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
  showModal = false;
  idToDelete!: string;
  @Output() productDeleted = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private productsService: ProductService,
  ) {}

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
        this.idToDelete = id;
        this.showModal = true;
      },
    },
  ];

  handleModalConfirmation(userConfirm: boolean) {
    if (userConfirm) {
      return this.productsService
        .deleteProduct(this.idToDelete)
        .subscribe(() => {
          this.productDeleted.emit(true);
          this.showModal = false;
        });
    }

    return (this.showModal = false);
  }
}
