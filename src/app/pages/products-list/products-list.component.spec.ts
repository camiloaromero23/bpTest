import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ComponentsModule } from '../../components/components.module';
import { Product, ProductService } from '../product.service';
import { ProductsListComponent } from './products-list.component';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let router: Router;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProducts',
    ]);

    TestBed.configureTestingModule({
      imports: [ComponentsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ProductsListComponent],
      providers: [{ provide: ProductService, useValue: productServiceSpy }],
    });

    fixture = TestBed.createComponent(ProductsListComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    productService = TestBed.inject(
      ProductService,
    ) as jasmine.SpyObj<ProductService>;

    // Mock the elements
    const mockSearchInput = document.createElement('input');
    const mockSelect = document.createElement('select');

    spyOn(component, 'updateProductsToShow'); // Spy on the method to check if it's called

    component.searchInput = { nativeElement: mockSearchInput } as any;
    component.select = { nativeElement: mockSelect } as any;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the "product" route when handleAddProduct is called', () => {
    spyOn(router, 'navigate');

    component.handleAddProduct();

    expect(router.navigate).toHaveBeenCalledWith(['product']);
  });

  it('should increase the page and update products when increasePage is called', () => {
    // Assuming maxPages is set to 3
    component.maxPages = 3;
    component.page = 3;

    component.increasePage();

    expect(component.page).toBe(3);
    expect(component.updateProductsToShow).not.toHaveBeenCalled();
  });

  it('should increase the page and update products when increasePage is called', () => {
    // Assuming maxPages is set to 3
    component.maxPages = 3;
    component.page = 1;

    component.increasePage();

    expect(component.page).toBe(2);
    expect(component.updateProductsToShow).toHaveBeenCalled();
  });

  it('should decrease the page and update products when decreasePage is called', () => {
    // Assuming maxPages is set to 3
    component.maxPages = 3;
    component.page = 1;

    component.decreasePage();

    expect(component.page).toBe(1);
    expect(component.updateProductsToShow).not.toHaveBeenCalled();
  });

  it('should decrease the page and update products when decreasePage is called', () => {
    // Assuming maxPages is set to 3
    component.maxPages = 3;
    component.page = 2;

    component.decreasePage();

    expect(component.page).toBe(1);
    expect(component.updateProductsToShow).toHaveBeenCalled();
  });

  it('should set properties correctly when refreshProducts is called', fakeAsync(() => {
    // Arrange
    const products: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'logo1.png',
        date_release: new Date(),
        date_revision: new Date(),
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        logo: 'logo2.png',
        date_release: new Date(),
        date_revision: new Date(),
      },
    ];
    productService.getProducts.and.returnValue(of(products));

    // Act
    component.refreshProducts();
    tick();

    // Assert
    expect(component.products).toEqual(products);
    expect(component.productsAmountToShow).toEqual(
      +component.select.nativeElement.value,
    );
    expect(component.productsToShow$.value).toEqual(products);
  }));
});
describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let router: Router;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProducts',
    ]);

    TestBed.configureTestingModule({
      imports: [ComponentsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ProductsListComponent],
      providers: [{ provide: ProductService, useValue: productServiceSpy }],
    });

    fixture = TestBed.createComponent(ProductsListComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    productService = TestBed.inject(
      ProductService,
    ) as jasmine.SpyObj<ProductService>;

    // Mock the elements
    const mockSearchInput = document.createElement('input');
    const mockSelect = document.createElement('select');

    component.searchInput = { nativeElement: mockSearchInput } as any;
    component.select = { nativeElement: mockSelect } as any;
  });

  it('should handle pagination correctly when updateProductsToShow is called', () => {
    // Arrange
    component.products = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'logo1.png',
        date_release: new Date(),
        date_revision: new Date(),
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        logo: 'logo2.png',
        date_release: new Date(),
        date_revision: new Date(),
      },
      {
        id: '3',
        name: 'Product 3',
        description: 'Description 3',
        logo: 'logo3.png',
        date_release: new Date(),
        date_revision: new Date(),
      },
    ];
    spyOn(Math, 'ceil').and.returnValue(3); // Mock the ceil function to return 3
    component.page = 2;
    component.productsAmountToShow = 1;

    // Act
    component.updateProductsToShow();
    expect(Math.ceil).toHaveBeenCalled();
    expect(component.maxPages).toBe(3);
  });
});

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  beforeEach(() => {
    const productServiceMock = jasmine.createSpyObj('ProductService', [
      'getProducts',
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    spyOn(ProductsListComponent.prototype, 'refreshProducts');

    TestBed.configureTestingModule({
      imports: [ComponentsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ProductsListComponent],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should subscribe to select input changes', fakeAsync(() => {
    fixture.detectChanges();
    const nativeElement = fixture.debugElement.query(
      By.css('input'),
    ).nativeElement;
    spyOn(component, 'updateProductsToShow');

    nativeElement.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    tick(151);
    fixture.detectChanges();

    expect(component.updateProductsToShow).toHaveBeenCalled();
  }));

  it('should subscribe to select input changes', () => {
    fixture.detectChanges();
    const nativeElement = fixture.debugElement.query(
      By.css('select'),
    ).nativeElement;
    spyOn(component, 'updateProductsToShow');

    nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.updateProductsToShow).toHaveBeenCalled();
  });
});
