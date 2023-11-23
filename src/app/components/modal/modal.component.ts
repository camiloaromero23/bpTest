import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() showModal: boolean = false;
  @Input({ required: true }) message!: string;
  @Output() userConfirm = new EventEmitter<boolean>();

  cancel() {
    this.showModal = false;
    this.userConfirm.emit(false);
  }

  confirm() {
    this.showModal = false;
    this.userConfirm.emit(true);
  }
}
