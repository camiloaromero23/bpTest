import { Component, EventEmitter, Input, Output } from '@angular/core';

export const enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() variant: keyof typeof ButtonVariant = ButtonVariant.primary;
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() type = 'button';

  @Output() buttonClick = new EventEmitter();

  text = 'Button';
}
