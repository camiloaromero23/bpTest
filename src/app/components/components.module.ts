import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModalComponent } from './modal/modal.component';
import { TableComponent } from './table/table.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    TableComponent,
    DropdownComponent,
    ButtonComponent,
    ModalComponent,
    LoadingSpinnerComponent,
  ],
  exports: [
    TableComponent,
    DropdownComponent,
    ButtonComponent,
    ModalComponent,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule],
})
export class ComponentsModule {}
