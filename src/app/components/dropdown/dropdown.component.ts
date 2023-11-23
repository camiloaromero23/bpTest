import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

export interface Action {
  label: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  @Input({ required: true }) actions!: Action[];
  isOpen = false;
  clickInside = false;
  @Output() actionClick = new EventEmitter<Action>();

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

  handleClick(action: Action) {
    this.actionClick.emit(action);
  }
}
