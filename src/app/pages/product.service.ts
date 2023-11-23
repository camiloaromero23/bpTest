import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

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

export const getAuthorId = (): string => {
  let authorId = localStorage.getItem('authorId');
  if (!authorId) {
    authorId = String(randomIntFromInterval(1, 99999999));
    localStorage.setItem('authorId', authorId);
  }
  return authorId;
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

  deleteProduct(id: string): Observable<string> {
    return this.http
      .delete('/bp/products', {
        headers: {
          authorId: getAuthorId(),
        },
        params: {
          id,
        },
        responseType: 'text'
      })
      .pipe(catchError(this.handleError));
  }
  verifyProduct(id: string): Observable<boolean> {
    return this.http.get<boolean>('/bp/products/verification', {
      headers: {
        authorId: getAuthorId(),
      },
      params: {
        id,
      },
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Handle the error in a way that fits your application
    let errorMessage = 'An error occurred.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
