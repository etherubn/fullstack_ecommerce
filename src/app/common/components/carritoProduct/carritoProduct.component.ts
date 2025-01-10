import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../../model/product';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';

@Component({
  selector: 'app-carrito-product',
  standalone: true,
  imports: [
    MatButton,
    CommonModule
  ],
  templateUrl: './carritoProduct.component.html',
  styleUrl: './carritoProduct.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarritoProductComponent { 
  @Input() product:Product = undefined

  constructor(private carritoService:CarritoService){

  }

  eliminarProducto(id:number){
    this.carritoService.eliminarProducto(id)
  }
}
