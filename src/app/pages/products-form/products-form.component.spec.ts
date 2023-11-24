import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { ProductsFormComponent } from './products-form.component';

import { of } from 'rxjs';
import { ProductService } from '../product.service';

describe('ProductsFormComponent', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const productServiceMock = jasmine.createSpyObj('ProductService', [
      'verifyProduct',
      'getProducts',
      'createProduct',
      'updateProduct',
    ]);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ProductsFormComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
        { provide: Router, useValue: routerMock },
        { provide: ProductService, useValue: productServiceMock },
        FormBuilder,
      ],
    });

    fixture = TestBed.createComponent(ProductsFormComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    productServiceSpy = TestBed.inject(
      ProductService,
    ) as jasmine.SpyObj<ProductService>;

    // Mock ProductService methods
    productServiceSpy.verifyProduct.and.returnValue(of(true));
    productServiceSpy.getProducts.and.returnValue(of([]));
    productServiceSpy.createProduct.and.returnValue(
      of({
        id: '1',
        name: 'Test Product',
        description: 'Description',
        logo: 'logo.png',
        date_release: new Date(),
        date_revision: new Date(),
      }),
    );
    productServiceSpy.updateProduct.and.returnValue(
      of({
        id: '1',
        name: 'Test Product',
        description: 'Description',
        logo: 'logo.png',
        date_release: new Date(),
        date_revision: new Date(),
      }),
    );

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    // Arrange
    const expectedFormValue = {
      date_release: null,
      date_revision: null,
      description: null,
      id: null,
      logo: null,
      name: null,
    };

    // Assert
    expect(component.form.value).toEqual(expectedFormValue);
  });

  it('should set form values when editing an existing product', fakeAsync(() => {
    // Arrange
    productServiceSpy.getProducts.and.returnValue(
      of([
        {
          id: '1',
          name: 'Test Product',
          description: 'Description',
          logo: 'logo.png',
          date_release: new Date(),
          date_revision: new Date(),
        },
      ]),
    );

    // Act
    component.ngOnInit();
    tick();

    // Assert
    expect(component.form.value).toEqual({
      date_release: jasmine.any(String),
      date_revision: jasmine.any(String),
      description: 'Description',
      id: '1',
      logo: 'logo.png',
      name: 'Test Product',
    });
  }));

  it('should handle form submission for creating a new product', fakeAsync(() => {}));

  it('should handle form submission for updating an existing product', fakeAsync(() => {}));

  it('should navigate to home page if product does not exist during editing', fakeAsync(() => {}));

  it('should handle form submission error', fakeAsync(() => {}));

  it('should clear the form', () => {
    // Act
    component.clearForm();

    // Assert
    expect(component.form.value).toEqual({
      date_release: null,
      date_revision: null,
      description: null,
      id: null,
      logo: null,
      name: null,
    });
  });

  it('should update date_revision when onDateReleaseChange is called', fakeAsync(() => {
    // Arrange
    const date_release = new Date('2022-11-23');
    component.date_release?.setValue(date_release);

    // Act
    component.onDateReleaseChange();
    tick();

    // Assert
    const expectedDateRevision = new Date(
      date_release.getFullYear() + 1,
      date_release.getMonth(),
      date_release.getDate() + 1,
    );
    expect(component.date_revision?.value).toEqual(
      expectedDateRevision.toISOString().split('T')[0],
    );
  }));

  it('should mark all form fields as touched when submitForm is called and is invalid', () => {
    // Arrange
    component.form.markAsUntouched();

    // Act
    component.onSubmit();

    // Assert
    expect(component.form.invalid).toBeTrue();
    expect(component.form.touched).toBeTrue();
  });

  it('should not update date_revision when onDateReleaseChange is called and date_release is empty', fakeAsync(() => {
    // Arrange
    component.date_release?.setValue(null);

    // Act
    component.onDateReleaseChange();
    tick();

    // Assert
    expect(component.date_revision?.value).toBeNull();
  }));

  it('should call createProduct when submitForm is called and is valid', fakeAsync(() => {
    component.form.setValue({
      date_release: '2021-11-23',
      date_revision: '2022-11-24',
      description: 'Description',
      id: 'trj-crd',
      logo: 'logo.png',
      name: 'Test Product',
    });
    component.productId = null;
    // Act
    component.onSubmit();
    tick();

    // Assert
    expect(productServiceSpy.createProduct).toHaveBeenCalled();
  }));

  it('should call verifyProduct when submitForm is called and is valid and navigate to home if id does not exist', fakeAsync(() => {
    component.form.setValue({
      date_release: '2021-11-23',
      date_revision: '2022-11-24',
      description: 'Description',
      id: 'trj-crd',
      logo: 'logo.png',
      name: 'Test Product',
    });
    console.log('**********************************', {
      invalid: component.form.invalid,
      productId: component.productId,
    });
    productServiceSpy.verifyProduct.and.returnValue(of(false));
    // Act
    component.onSubmit();
    tick();

    // Assert
    expect(productServiceSpy.verifyProduct).toHaveBeenCalled();
  }));
});
describe('ProductsFormComponent', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const productServiceMock = jasmine.createSpyObj('ProductService', [
      'verifyProduct',
      'getProducts',
      'createProduct',
      'updateProduct',
    ]);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ProductsFormComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
        { provide: Router, useValue: routerMock },
        { provide: ProductService, useValue: productServiceMock },
        FormBuilder,
      ],
    });

    fixture = TestBed.createComponent(ProductsFormComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    productServiceSpy = TestBed.inject(
      ProductService,
    ) as jasmine.SpyObj<ProductService>;

    // Mock ProductService methods
    productServiceSpy.verifyProduct.and.returnValue(of(false));

    fixture.detectChanges();
  });

  it('should call verifyProduct when submitForm is called and is valid and navigate to home if id does not exist', fakeAsync(() => {
    expect(productServiceSpy.verifyProduct).toHaveBeenCalled();
  }));
});

describe('ProductsFormComponent', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const productServiceMock = jasmine.createSpyObj('ProductService', [
      'verifyProduct',
      'getProducts',
      'createProduct',
      'updateProduct',
    ]);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ProductsFormComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } },
        },
        { provide: Router, useValue: routerMock },
        { provide: ProductService, useValue: productServiceMock },
        FormBuilder,
      ],
    });

    fixture = TestBed.createComponent(ProductsFormComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    productServiceSpy = TestBed.inject(
      ProductService,
    ) as jasmine.SpyObj<ProductService>;

    // Mock ProductService methods
    productServiceSpy.verifyProduct.and.returnValue(of(false));

    fixture.detectChanges();
  });

  it('should return if productId does not exist in route', () => {
    // Arrange

    // Act
    component.ngOnInit();

    // Assert
    expect(productServiceSpy.verifyProduct).not.toHaveBeenCalled();
  });
});
