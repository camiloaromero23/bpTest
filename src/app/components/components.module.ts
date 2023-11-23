import { NgModule } from '@angular/core';
import { TableComponent } from './table/table.component';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [TableComponent, DropdownComponent, ButtonComponent],
  exports: [TableComponent, DropdownComponent, ButtonComponent],
  imports: [CommonModule],
})
export class ComponentsModule {}
