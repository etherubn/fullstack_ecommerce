import { Injectable, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CarritoService{

  constructor() {
     
  }
  

  carrito:  Product[] = JSON.parse(localStorage.getItem("shoppingCart")) || []

  carro:Subject<Product[]> = new Subject()


  setCarrito(carrito:Product[]){
    this.carro.next(carrito)
  } 

  getCarrito(){
    return this.carro.asObservable()
  }

  agregarProducto(producto:Product){
    const indice = this.carrito.findIndex(product=> product.idProduct===producto.idProduct)
    if (indice!==-1) {
      this.carrito[indice] = {
        ...producto,cantidad: this.carrito[indice].cantidad+1
      }
      this.setCarrito(this.carrito)
      localStorage.setItem("shoppingCart",JSON.stringify(this.carrito))
    }else{
      this.carrito = [...this.carrito,{...producto,cantidad:1}]
      this.setCarrito(this.carrito)
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
      this.setCarrito(this.carrito)
    }else{
      this.carrito = this.carrito.map(product=> product.idProduct===id? {...product,cantidad:product.cantidad-1}:product)
      this.setCarrito(this.carrito)
    }

    localStorage.setItem("shoppingCart",JSON.stringify(this.carrito))
  }

  vaciarCarrito(){
    this.carrito=[]
  }

  get carritoProducts(){
    return this.carrito
  }

  
  getCantidadProducto(id:number):number{
    const indice = this.carrito.findIndex(product=> product.idProduct===id)
    return indice>=0? this.carrito[indice].cantidad:0 
  }

}
