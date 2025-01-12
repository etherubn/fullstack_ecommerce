import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent { }
