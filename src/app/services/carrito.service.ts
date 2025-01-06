import { Injectable } from '@angular/core';
import { Product } from '../model/product';


@Injectable({
  providedIn: 'root'
})

export class CarritoService {

  constructor() {
   }

  carrito: Product[] = []

  agregarProducto(producto:Product){

    if(this.carrito.includes(producto)){
      this.carrito = this.carrito.map(product=> {
        if(product.idProduct==producto.idProduct){
          return {...product,cantidad:product.cantidad++}
        }
        return product
      })
    }else{
      this.carrito = [...this.carrito,{...producto,cantidad:1}]
    }

    console.log(this.carrito)
  }

  eliminarProducto(id:number){
    this.carrito = this.carrito.filter(producto=> producto.idProduct!==id)
  }

  vaciarCarrito(){
    this.carrito=[]
  }

  
}
