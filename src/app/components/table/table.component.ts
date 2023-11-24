import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
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
    },
    {
      label: 'Eliminar',
    },
  ];

  handleActionClick(action: Action, product: Product) {
    if (action.label === 'Editar') {
      return this.handleEditProduct(product);
    }

    return this.handleDeleteProduct(product);
  }

  handleEditProduct(product: Product) {
    this.router.navigate(['/product', product.id]);
  }

  handleDeleteProduct(product: Product) {
    this.idToDelete = product.id;
    this.deleteMessage = `¿Estás seguro de eliminar el producto ${product.name}?`;
    this.showModal = true;
  }

  handleModalConfirmation(userConfirm: boolean) {
    if (userConfirm) {
      return this.productsService
        .deleteProduct(this.idToDelete)
        ?.subscribe(() => {
          this.productDeleted.emit(true);
          this.showModal = false;
        });
    }

    return (this.showModal = false);
  }
}
