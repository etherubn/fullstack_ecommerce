import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from "./components/productCard/productCard.component";
import { Product } from '../../../model/product';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FiltrosComponent } from "./components/filtros/filtros.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, FiltrosComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit{
  
  products: Product[] = []


  constructor(
    private productService:ProductService
  ){
  
  }
  
  ngOnInit(): void {
    this.productService.findAll().subscribe(
      response=> {
        this.products = response
      }
    )
  } 

}
