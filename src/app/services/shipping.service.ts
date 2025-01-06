import { Injectable } from '@angular/core';
import { Shipping } from '../model/shipping';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShippingService extends GenericService<Shipping> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/v1/shipping`);
  }

  // private BASE_URL = `${environment.HOST}/api/v1/shipping`

  // constructor(private http:HttpClient) { }

  // getShipping():Observable<Shipping|undefined>{
  //   return this.http.get<Response<Shipping>>(`${this.BASE_URL}`)
  //     .pipe(
  //       tap(e=> console.log(e)),
  //       map(({data})=> data[0]),
  //       tap(e=> console.log(e)),
  //       catchError(err=> of(undefined))
  //     )
  // }

  // Permite emitir actualizaciones de la lista de shippingos a los componentes suscritos
  private shippingChange: Subject<Shipping[]> = new Subject<Shipping[]>();

  // Permite emitir mensajes (como confirmaciones o errores) a los componentes suscritos
  private messageChange: Subject<string> = new Subject<string>();

  setShippingChange(shippings: Shipping[]) {
    this.shippingChange.next(shippings);
  }

  getShippingChange() {
    return this.shippingChange.asObservable();
  }

  setMessageChange(message: string) {
    this.messageChange.next(message);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }

  // Nuevo método update que solo toma el objeto Shipping
  updateShipping(shipping: Shipping): Observable<Shipping> {
    return this.http.put<Shipping>(`${this.url}`, shipping);
  }
}
