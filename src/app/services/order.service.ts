import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Selling } from '../model/selling';
import { Subject } from 'rxjs';
import { CreateSelling } from '../model/createSelling';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends GenericService<Selling> {
  // Permite emitir actualizaciones de la lista de useros a los componentes suscritos
  private sellingChange: Subject<Selling[]> = new Subject<Selling[]>();

  // Permite emitir mensajes (como confirmaciones o errores) a los componentes suscritos
  private messageChange: Subject<string> = new Subject<string>();

  private createdSelling: Subject<CreateSelling> = new Subject<CreateSelling>();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/v1/selling`);
  }

  setOrderChange(sellings: Selling[]) {
    this.sellingChange.next(sellings);
  }

  getOrderChange() {
    return this.sellingChange.asObservable();
  }

  setMessageChange(message: string) {
    this.messageChange.next(message);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }

  getCreateSelling(){
    return this.createdSelling.asObservable()
  }

  createSelling(selling:CreateSelling){
    return this.http.post(`${environment.HOST}/api/v1/selling`,selling)
  };
}
