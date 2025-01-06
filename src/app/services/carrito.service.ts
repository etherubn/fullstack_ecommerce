import { Injectable, OnInit } from '@angular/core';
import { Product } from '../model/product';


@Injectable({
  providedIn: 'root'
})

export class CarritoService{

  constructor() {
     
  }
  

  carrito: Product[] = JSON.parse(localStorage.getItem("shoppingCart")) || []

  agregarProducto(producto:Product){
    const indice = this.carrito.findIndex(product=> product.idProduct===producto.idProduct)
    if (indice!==-1) {
      this.carrito[indice] = {
        ...producto,cantidad: this.carrito[indice].cantidad+1
      }
      localStorage.setItem("shoppingCart",JSON.stringify(this.carrito))
    }else{
      this.carrito = [...this.carrito,{...producto,cantidad:1}]
      localStorage.setItem("shoppingCart",JSON.stringify(this.carrito))
    }
  }

  eliminarProducto(id:number){
    const indice = this.carrito.findIndex(product=> product.idProduct===id)
    if (this.carrito[indice].cantidad===1) {
      this.carrito = [
        ...this.carrito.slice(0, indice),  
        ...this.carrito.slice(indice + 1) 
      ];
    }else{
      this.carrito = this.carrito.map(product=> product.idProduct===id? {...product,cantidad:product.cantidad-1}:product)
    }

    localStorage.setItem("shoppingCart",JSON.stringify(this.carrito))
  }

  vaciarCarrito(){
    this.carrito=[]
  }

  
  getCantidadProducto(id:number):number{
    const indice = this.carrito.findIndex(product=> product.idProduct===id)
    return indice>=0? this.carrito[indice].cantidad:0 
  }

}
