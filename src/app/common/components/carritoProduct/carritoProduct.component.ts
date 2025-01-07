import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../../model/product';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-carrito-product',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './carritoProduct.component.html',
  styleUrl: './carritoProduct.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarritoProductComponent { 
  @Input() product:Product = undefined
}
