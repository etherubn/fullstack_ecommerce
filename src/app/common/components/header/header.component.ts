import { Component, OnInit } from '@angular/core';
import { ShippingService } from '../../../services/shipping.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { MatIconModule } from '@angular/material/icon';
import { CarritoComponent } from "../carrito/carrito.component";
import { CarritoService } from '../../../services/carrito.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    CarritoComponent
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {

  showCArrito:boolean= false

  constructor(
    private shippingService:ShippingService,
    private carritoService:CarritoService
  ){

  }
  
  valor:string|undefined = "" 
  isVisible:boolean = false
  ngOnInit(): void {
    this.shippingService.findAll().subscribe(
      {
        next: (data)=> {
          this.valor= data[0]?.limit_price.toString() 
        },
        error: (err)=> {
          console.log(err);
        }
      }
    )

    this.carritoService.getShowCarrito().subscribe(val=>{
      this.showCArrito= val
    })
  }

  
  showSubMenu(show:boolean):void{
    this.isVisible=show
  }

  showCart(){
    this.carritoService.setShowCArrito(true)
  }

}
