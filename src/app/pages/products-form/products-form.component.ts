import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css',
})
export class ProductsFormComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params); // { id: "foo" }
    });

    this.productService.getProducts().subscribe((products) => {
      console.log(products); // [ { id: "foo", ... } ]
    });
    this.productService.verifyProduct('trj-crd').subscribe((product) => {
      console.log(product); // [ { id: "foo", ... } ]
    });
  }
}
