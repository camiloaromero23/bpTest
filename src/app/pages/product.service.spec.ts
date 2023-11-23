import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Product, ProductService, getAuthorId } from './product.service';

describe('ProductService', () => {
  let productService: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should get a list of products', () => {
    const mockProducts: Product[] = [
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

    productService.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne('/bp/products');
    expect(req.request.method).toEqual('GET');

    req.flush(mockProducts);
  });

  it('should create a new product', () => {
    const newProduct: Product = {
      id: '3',
      name: 'New Product',
      description: 'New Description',
      logo: 'new_logo.png',
      date_release: new Date(),
      date_revision: new Date(),
    };

    productService.createProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(newProduct);
    });

    const req = httpTestingController.expectOne('/bp/products');
    expect(req.request.method).toEqual('POST');

    req.flush(newProduct);
  });

  it('should update an existing product', () => {
    const updatedProduct: Product = {
      id: '1',
      name: 'Updated Product',
      description: 'Updated Description',
      logo: 'updated_logo.png',
      date_release: new Date(),
      date_revision: new Date(),
    };

    productService.updateProduct(updatedProduct).subscribe((product) => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpTestingController.expectOne('/bp/products');
    expect(req.request.method).toEqual('PUT');

    req.flush(updatedProduct);
  });

  it('should delete a product by ID', () => {
    const productId = '1';

    productService.deleteProduct(productId).subscribe((product) => {
      expect(product.id).toEqual(productId);
    });

    const req = httpTestingController.expectOne(`/bp/products?id=${productId}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush({ id: productId } as Product);
  });

  it('should verify a product by ID', () => {
    const productId = '1';

    productService.verifyProduct(productId).subscribe((product) => {
      expect(product).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `/bp/products/verification?id=${productId}`,
    );
    expect(req.request.method).toEqual('GET');

    req.flush({ id: productId } as Product);
  });

  it('should generate a valid authorId if not present in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');

    const authorId = getAuthorId();

    expect(localStorage.getItem).toHaveBeenCalledWith('authorId');
    expect(localStorage.setItem).toHaveBeenCalledWith('authorId', authorId);
    expect(authorId).toMatch(/^\d+$/); // Checks if the generated ID is a number
  });

  it('should return the authorId from localStorage if present', () => {
    const existingAuthorId = '123456';

    spyOn(localStorage, 'getItem').and.returnValue(existingAuthorId);
    spyOn(localStorage, 'setItem');

    const authorId = getAuthorId();

    expect(localStorage.getItem).toHaveBeenCalledWith('authorId');
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(authorId).toEqual(existingAuthorId);
  });
});
