import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Subject } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends GenericService<User> {
  // Permite emitir actualizaciones de la lista de useros a los componentes suscritos
  private userChange: Subject<User[]> = new Subject<User[]>();

  // Permite emitir mensajes (como confirmaciones o errores) a los componentes suscritos
  private messageChange: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/v1/user`);
  }

  setUserChange(users: User[]) {
    this.userChange.next(users);
  }

  getUserChange() {
    return this.userChange.asObservable();
  }

  setMessageChange(message: string) {
    this.messageChange.next(message);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }

}
