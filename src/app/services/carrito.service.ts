import { Injectable, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ShippingService } from './shipping.service';
import { Shipping } from '../model/shipping';


@Injectable({
  providedIn: 'root'
})

export class CarritoService{

  constructor(private shippingService:ShippingService) {
     
  }
  

  carrito:  Product[] = JSON.parse(localStorage.getItem("shoppingCart")) || []

  private carro:BehaviorSubject<Product[]> = new BehaviorSubject(this.carrito)

  shipping:Shipping = {
    id:0,
    base_price:0,
    limit_price:0
  }

  private isShowCarrito:BehaviorSubject<boolean> = new BehaviorSubject(false)


  getCarrito(){
    return this.carro.asObservable()
  }

  setShowCArrito(value: boolean){
    this.isShowCarrito.next(value)
  }

  showCarrito(){
    this.isShowCarrito
  }


  getShowCarrito():Observable<boolean>{
    return this.isShowCarrito.asObservable()
  }



  saveCarrito(carro:Product[]){
    this.carro.next(carro)
    localStorage.setItem("shoppingCart",JSON.stringify(carro))
  }

  agregarProducto(producto:Product){
    const indice = this.carrito.findIndex(product=> product.idProduct===producto.idProduct)
    if (indice!==-1) {
      this.carrito[indice] = {
        ...producto,cantidad: this.carrito[indice].cantidad+1
      }
    }else{
      this.carrito = [...this.carrito,{...producto,cantidad:1}]
    }

    this.saveCarrito(this.carrito)
    
  }

  disminuirProducto(id:number){
    const indice = this.carrito.findIndex(product=> product.idProduct===id)
    if (this.carrito[indice].cantidad===1) {
      this.carrito = [
        ...this.carrito.slice(0, indice),  
        ...this.carrito.slice(indice + 1) 
      ];
    }else{
      this.carrito = this.carrito.map(product=> product.idProduct===id? {...product,cantidad:product.cantidad-1}:product)
    }

    this.saveCarrito(this.carrito)
  }

  eliminarProducto(id:number){
    this.carrito = this.carrito.filter(product=> product.idProduct!==id)
    this.saveCarrito(this.carrito)
  }

  

  vaciarCarrito(){
    this.carrito=[]
    this.saveCarrito(this.carrito)
  }

  
  getCantidadProducto(id:number):number{
    const indice = this.carrito.findIndex(product=> product.idProduct===id)
    return indice>=0? this.carrito[indice].cantidad:0 
  }

  calcularTotal():number{
    this.shippingService.findAll().subscribe(val=>{
      this.shipping= {...val[0]}
    })

    let total = 0;
    this.carrito.forEach(producto=>{
      total += producto.cantidad*producto.price
    })

    return total
  }

}
