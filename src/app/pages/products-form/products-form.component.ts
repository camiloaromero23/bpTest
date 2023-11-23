import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css',
})
export class ProductsFormComponent {
  title: string = 'Product Form';

  // Declare the form group
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    // Initialize the form with the provided schema
    this.form = this.fb.group({
      date_release: [null, [Validators.required]],
      date_revision: [null],
      description: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      id: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      logo: [null, [Validators.required]],
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  // Add getter methods for easy access in the template
  get date_release() {
    return this.form.get('date_release');
  }

  get date_revision() {
    return this.form.get('date_revision');
  }

  get description() {
    return this.form.get('description');
  }

  get id() {
    return this.form.get('id');
  }

  get logo() {
    return this.form.get('logo');
  }

  get name() {
    return this.form.get('name');
  }

  onDateReleaseChange() {
    if (!this.date_release?.value) return;

    const dateValues = new Date(this.date_release?.value);

    const newDate = new Date(
      dateValues.getFullYear() + 1,
      dateValues.getMonth(),
      dateValues.getDate() + 1,
    );

    this.date_revision?.setValue(newDate.toISOString().split('T')[0]);
  }

  // Add a method to handle form submission
  onSubmit() {
    if (this.form.invalid) {
      // Mark all fields as touched to display validation messages
      this.form.markAllAsTouched();
      return;
    }

    this.productService.createProduct(this.form.value).subscribe(() => {
      this.clearForm();
      this.router.navigate(['']);
    });
  }

  clearForm() {
    // Reset the form
    this.form.reset();
  }
}
