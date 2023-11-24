import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Action, DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dropdown on click', () => {
    component.clicked();
    expect(component.isOpen).toBeTrue();
  });

  it('should close the dropdown when clicked 2 times', () => {
    component.clicked();
    component.clicked();
    expect(component.isOpen).toBeFalse();
  });

  it('should stay open when clicked once out', () => {
    component.clicked();
    component.clickedOut();
    expect(component.isOpen).toBeTrue();
  });

  it('should close when clicked twice out', () => {
    component.clicked();
    component.clickedOut();
    component.clickedOut();
    expect(component.isOpen).toBeFalse();
  });

  it('should emit action when handleClick is called', () => {
    const testAction: Action = { label: 'Test Action' };
    let emittedAction: Action | undefined;
    component.actionClick.subscribe((action) => (emittedAction = action));

    component.handleClick(testAction);

    expect(emittedAction).toEqual(testAction);
  });
});
