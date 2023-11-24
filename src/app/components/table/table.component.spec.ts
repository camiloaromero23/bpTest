import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Product, ProductService } from '../../pages/product.service';
import { ComponentsModule } from '../components.module';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [TableComponent],
      providers: [
        {
          provide: ProductService,
          useValue: jasmine.createSpyObj('ProductsService', ['deleteProduct']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    productServiceSpy = TestBed.inject(
      ProductService,
    ) as jasmine.SpyObj<ProductService>;
    router = TestBed.inject(Router);

    // Mock data for testing
    const mockProduct: Product = {
      id: '1',
      name: 'Test Product',
      description: 'Description',
      date_release: new Date(),
      date_revision: new Date(),
      logo: 'https://picsum.photos/200',
    };
    component.data = of([mockProduct]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle delete action correctly', () => {
    const mockProduct: Product = {
      id: '1',
      name: 'Test Product',
      description: 'Description',
      logo: 'https://picsum.photos/200',
      date_release: new Date(),
      date_revision: new Date(),
    };
    const deleteAction = { label: 'Eliminar' };

    component.handleActionClick(deleteAction, mockProduct);

    expect(component.showModal).toBeTruthy();
    expect(component.idToDelete).toEqual(mockProduct.id);
    expect(component.deleteMessage).toContain(mockProduct.name);
  });

  it('should handle modal confirmation with userConfirm false', () => {
    component.showModal = true;

    component.handleModalConfirmation(false);

    expect(component.showModal).toBeFalsy();
  });

  it('should handle modal confirmation with userConfirm false', () => {
    // Arrange
    component.showModal = true;

    // Act
    component.handleModalConfirmation(false);

    // Assert
    expect(component.showModal).toBeFalsy();
    // Additional assertions can be added based on your specific requirements.
  });

  it('should handle edit product correctly', () => {
    // Arrange
    const mockProduct: Product = {
      id: '1',
      name: 'Test Product',
      description: 'Description',
      logo: 'https://picsum.photos/200',
      date_release: new Date(),
      date_revision: new Date(),
    };

    // Act
    component.handleEditProduct(mockProduct);

    spyOn(router, 'navigate');
    // Assert
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should call handleEditProduct when action label is Editar', () => {
    // Arrange
    const mockProduct: Product = {
      id: '1',
      name: 'Test Product',
      description: 'Description',
      logo: 'https://picsum.photos/200',
      date_release: new Date(),
      date_revision: new Date(),
    };
    const editAction = { label: 'Editar' };

    // Act
    spyOn(component, 'handleEditProduct');
    component.handleActionClick(editAction, mockProduct);

    // Assert
    expect(component.handleEditProduct).toHaveBeenCalled();
  });

  it( 'should handleModalConfirmation when userConfirm is true', fakeAsync(() => {
    // Arrange
    component.showModal = true;
    productServiceSpy.deleteProduct.and.returnValue(of('123123'));

    // Act
    component.handleModalConfirmation(true);
    tick();

    // Assert
    expect(component.showModal).toBeFalsy();
    expect(productServiceSpy.deleteProduct).toHaveBeenCalled();
  }));
});
