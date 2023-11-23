import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date;
  date_revision: Date;
}

export const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getAuthorId = (): string => {
  return '1234'; // TODO: Remove this line
  // let authorId = localStorage.getItem('authorId');
  // if (!authorId) {
  //   authorId = String(randomIntFromInterval(1, 99999999));
  //   localStorage.setItem('authorId', authorId);
  // }
  // return authorId;
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/bp/products', {
      headers: {
        authorId: getAuthorId(),
      },
    });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('/bp/products', product, {
      headers: {
        authorId: getAuthorId(),
      },
    });
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`/bp/products`, product, {
      headers: {
        authorId: getAuthorId(),
      },
    });
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>('/bp/products', {
      headers: {
        authorId: getAuthorId(),
      },
      params: {
        id,
      },
    });
  }
  verifyProduct(id: string): Observable<Product> {
    return this.http.get<Product>('/bp/products/verification', {
      headers: {
        authorId: getAuthorId(),
      },
      params: {
        id,
      },
    });
  }
}
