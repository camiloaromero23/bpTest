import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tableHeaders, tableKeys } from '../../constants/tableKeys.constant';
import { Product, ProductService } from '../../pages/product.service';
import { Action } from '../dropdown/dropdown.component';

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
  deleteMessage = '';
  @Output() productDeleted = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private productsService: ProductService,
  ) {}

  actions: Action[] = [
    {
      label: 'Editar',
      onClick: (item: Product) => {
        this.router.navigate(['/product', item.id]);
      },
    },
    {
      label: 'Eliminar',
      onClick: (item: Product) => {
        this.idToDelete = item.id;
        this.deleteMessage = `¿Estás seguro de eliminar el producto ${item.name}?`;
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
