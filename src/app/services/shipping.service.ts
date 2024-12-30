import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Shipping } from '../model/shipping';
import { Response } from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  private BASE_URL = `${environment.HOST}/api/v1/shipping`

  constructor(private http:HttpClient) { }

  getShipping():Observable<Shipping|undefined>{
    return this.http.get<Response<Shipping>>(`${this.BASE_URL}`)
      .pipe(
        tap(e=> console.log(e)),
        map(({data})=> data[0]),
        tap(e=> console.log(e)),
        catchError(err=> of(undefined))
      )
  }
  
}
