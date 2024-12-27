import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Product } from '../model/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends GenericService<Product> {
  // Permite emitir actualizaciones de la lista de productos a los componentes suscritos
  private productChange: Subject<Product[]> = new Subject<Product[]>();

  // Permite emitir mensajes (como confirmaciones o errores) a los componentes suscritos
  private messageChange: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/v1/product`);
  }

  setProductChange(products: Product[]) {
    this.productChange.next(products);
  }

  getProductChange() {
    return this.productChange.asObservable();
  }

  setMessageChange(message: string) {
    this.messageChange.next(message);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }

}
