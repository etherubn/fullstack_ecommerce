import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../../../model/product';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CarritoService } from '../../../../../services/carrito.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './productCard.component.html',
  styleUrl: './productCard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input() product: Product = undefined;

  constructor(private carritoService: CarritoService) {}

  agregarProducto(productoSeleccionado: Product) {
    console.log(this.product);
    this.carritoService.agregarProducto(productoSeleccionado);
  }
}
