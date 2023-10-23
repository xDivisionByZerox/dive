import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
  readonly form = new FormGroup({
    name: new FormControl<string | null>(null),
    category: new FormControl<null>(null),
    description: new FormControl<string | null>(null),
    condition: new FormControl<null>(null),
    delivery: new FormControl<boolean>(false, { nonNullable: true }),
  });
}
