import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  shareReplay,
} from 'rxjs';
import { Product, ProductService } from '../product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements AfterViewInit, OnDestroy {
  products!: Product[];
  productsToShow$ = new BehaviorSubject<Product[]>([]);
  productsSubscription!: Subscription;
  searchSubscription!: Subscription;
  selectSubscription!: Subscription;
  productsAmountToShow = 5;
  page = 1;
  maxPages!: number;

  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('select') select!: ElementRef;

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  ngAfterViewInit() {
    this.productsSubscription = this.productService
      .getProducts()
      .pipe(shareReplay())
      .subscribe((products) => {
        this.productsToShow$.next(products);
        this.products = products;
        this.maxPages = Math.ceil(products.length / this.productsAmountToShow);
        this.productsAmountToShow = +this.select.nativeElement.value;
        this.updateProductsToShow();
      });

    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(filter(Boolean), debounceTime(150), distinctUntilChanged())
      .subscribe(() => {
        this.updateProductsToShow();
      });

    fromEvent(this.select.nativeElement, 'change').subscribe(() => {
      this.productsAmountToShow = +this.select.nativeElement.value;
      this.updateProductsToShow();
    });
  }

  updateProductsToShow() {
    this.maxPages = Math.ceil(
      this.products?.length / this.productsAmountToShow,
    );
    const searchText = this.searchInput.nativeElement.value || '';
    const productsAmount = +this.select.nativeElement.value || 5;

    const pageToShow = 0 + (this.page - 1) * productsAmount;
    const pageProductsToShow = this.page * productsAmount;

    this.productsToShow$.next(
      this.products
        .filter((product) =>
          product.name
            .toLowerCase()
            .includes(searchText.toString().toLowerCase()),
        )
        .slice(pageToShow, pageProductsToShow),
    );
  }
  handleAddProduct() {
    this.router.navigate(['product']);
  }

  increasePage() {
    if (this.page === this.maxPages) return;
    this.page++;
    this.updateProductsToShow();
  }

  decreasePage() {
    if (this.page === 1) return;
    this.page--;
    this.updateProductsToShow();
  }

  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
    this.selectSubscription?.unsubscribe();
  }
}
