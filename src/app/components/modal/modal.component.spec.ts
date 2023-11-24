import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { ComponentsModule } from '../components.module';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsModule],
      declarations: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially hide the modal', () => {
    expect(component.showModal).toBeFalsy();
  });

  it('should hide the modal and emit false on cancel', () => {
    let emittedValue: boolean | undefined;
    component.userConfirm.subscribe((value) => (emittedValue = value));
    component.cancel();
    expect(component.showModal).toBeFalsy();
    expect(emittedValue).toBeFalsy();
  });

  it('should hide the modal and emit true on confirm', () => {
    let emittedValue: boolean | undefined;
    component.userConfirm.subscribe((value) => (emittedValue = value));
    component.confirm();
    expect(component.showModal).toBeFalsy();
    expect(emittedValue).toBeTruthy();
  });
});
