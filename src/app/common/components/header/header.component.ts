import { Component, OnInit } from '@angular/core';
import { ShippingService } from '../../../services/shipping.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {

  constructor(private shippingService:ShippingService){

  }
  
  valor:string|undefined = "" 
  isVisible:boolean = false
  ngOnInit(): void {
    this.shippingService.getShipping().subscribe(
      {
        next: (value)=> {
          console.log(value);
          console.log(value?.limit_price+" valor de shippping")
          this.valor= value?.limit_price.toString()
          console.log(this.valor);
          
        },
        error: (err)=> {
          console.log(err);
        }
      }
    )
  }

  
  showSubMenu(show:boolean):void{
    this.isVisible=show
  }

}
