import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { switchMap } from 'rxjs';
import { Product } from '../../../model/product';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { PetType } from '../../../model/petType';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDivider,
    MatButtonModule,
    MatIcon,
    RouterLink
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent implements OnInit{
  
  producto?:Product
  caracteristicas:string[]= []
  constructor(
    private activatedRoute:ActivatedRoute,
    private productService:ProductService
  ){
    
  }
  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({id})=> this.productService.findById(id)),
    )
    .subscribe((prod)=>{
      this.producto= prod[0]
    })
  }

  determinatePetType():PetType{
    let typeProduct = this.producto?.pet_type=="cat"? PetType.CAT:PetType.DOG
    return typeProduct  
  }

  determinateProduct():string{
    switch(this.producto?.category.type){
      case 'food':
        return 'comida'
      case 'accesory':
        return 'accesorio'
      case 'hygiene':
        return 'higiene'
      default:
        return 'No tiene categoría'
    }
  }


}
