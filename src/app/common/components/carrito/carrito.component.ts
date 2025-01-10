import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CarritoService } from '../../../services/carrito.service';
import { Product } from '../../../model/product';
import { CarritoProductComponent } from "../carritoProduct/carritoProduct.component";
import { CommonModule } from '@angular/common';
import { ShippingService } from '../../../services/shipping.service';
import { Shipping } from '../../../model/shipping';
import { Observable } from 'rxjs';

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
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{

  carrito:Product[] = []
  total:number = 0
  shipping:Shipping = {
    id:0,
    base_price:0,
    limit_price:0
  }

  showCarrito:Observable<boolean>

  constructor(
    private carritoService:CarritoService,
    private shippingService:ShippingService
  ){
    this.showCarrito= carritoService.getShowCarrito()
  }



  
  ngOnInit(): void {
    this.carritoService.getCarrito().subscribe(carro=> {
      this.carrito= carro
      this.total = this.carritoService.calcularTotal()
      
  })

    

    this.shippingService.findAll().subscribe(value=>{
       this.shipping= value[0]
    })


  }

  vaciarCarrito(){
    this.carritoService.vaciarCarrito()
  }

  cerrarCarrito(){
    this.carritoService.setShowCArrito(false)
  }

  cerrarCarritoClickFuera(event:MouseEvent,cart:HTMLElement){
    if (!cart.contains(event.target as Node)) {
      this.cerrarCarrito()
    }
  }
}
