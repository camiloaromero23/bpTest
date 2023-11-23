import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { ComponentsModule } from '../components.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ProductService } from '../../pages/product.service';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let productsService: ProductService; // Mocked products service

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
    productsService = TestBed.inject(ProductService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to product details on "Editar" click', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    const productId = '123';
    component.actions[0].onClick(productId);

    expect(router.navigate).toHaveBeenCalledWith(['/product', productId]);
  });

  // Add more tests as needed

  // Example test for data binding
  it('should display data in the table', () => {
    const testData: any[] = [
      { id: '1', name: 'Product 1', description: 'Description 1' },
      { id: '2', name: 'Product 2', description: 'Description 2' },
    ];

    const observableTestData: Observable<any[]> = of(testData);

    component.data = observableTestData;
    fixture.detectChanges(); // Trigger change detection

    // Add your expectations for the rendered table content here
    // For example, check if the table rows contain the correct data
  });

  it('should handle "Eliminar" click and invoke the action', () => {
    // Assuming the first product ID is '1'
    component.actions[1].onClick('1');

    // Check if the deleteProduct method is called with the correct argument
    expect(productsService.deleteProduct).toHaveBeenCalledWith('1');
  });
});
