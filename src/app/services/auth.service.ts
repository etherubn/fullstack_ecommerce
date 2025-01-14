import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { RegisterUser } from '../model/registerUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUser } from '../model/loginUser';
import { UserStorageService } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = '/api/v1/auth'
  private URL = `${environment.HOST}${this.API}`

  constructor(private http:HttpClient,private userStorage:UserStorageService) { 

  }

  register(registerUser:RegisterUser):Observable<string>{
    return this.http.post<{ status: number; message: string; data: string[] }>(`${this.URL}/register`,registerUser)
      .pipe(
        map(response=> {
          console.log(response.data[0]);
          
          return response.data[0]
        })
      )
  }

  login(loginUser:LoginUser):Observable<string>{

    return this.http.post<{ status: number; message: string; data: string[] }>(`${this.URL}/login`,loginUser)
      .pipe(
        map(response=> {
          this.userStorage.saveToken(response.data[0]['jwtToken'])
          this.userStorage.saveUser(response.data[0]['username'])
          return "succes"
        }),
        catchError((error)=> {
          console.error("Error en el inicio de sesión:",error.message);
          console.log(error);
          
          return throwError(()=> 
            new Error(error.error?.message || 'Error inesperado en autenticación')
          )
        })
      )
  }

}
