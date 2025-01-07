import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CarritoService } from '../../../services/carrito.service';
import { Product } from '../../../model/product';
import { CarritoProductComponent } from "../carritoProduct/carritoProduct.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    CarritoProductComponent,
    CommonModule
],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarritoComponent implements OnInit{

  carrito:Product[] = []

  constructor(private carritoService:CarritoService){

  }
  ngOnInit(): void {
    this.carritoService.getCarrito().subscribe(carro=> {
      this.carrito= carro
    })
  }
  
 }
