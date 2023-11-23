import { Component, HostListener, Input } from '@angular/core';

interface Action {
  label: string;
  onClick: (id: string) => void;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  @Input({ required: true }) actions!: Action[];
  @Input({ required: true }) itemId!: string;
  isOpen = false;

  clickInside = false

  @HostListener('document:click')
  clickedOut() {
    if (this.clickInside) {
      this.clickInside = false;
      return;
    }
    this.isOpen = false;
  }

  @HostListener('click')
  clicked() {
    this.clickInside = true;

    if (this.isOpen) {
      this.isOpen = false;
      return;
    }

    this.isOpen = true;
  }

  handleClick(action: Action): void {
    action.onClick(this.itemId);
  }
}
