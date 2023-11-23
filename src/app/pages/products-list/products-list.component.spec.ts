import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentsModule } from '../../components/components.module';
import { ProductService } from '../product.service';
import { ProductsListComponent } from './products-list.component';
import { Router } from '@angular/router';

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

  afterEach(() => {
    fixture.destroy();
  });
});
