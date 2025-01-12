import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { RegisterUser } from '../model/registerUser';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../model/loginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = '/api/v1/auth'
  private URL = `${environment.HOST}${this.API}`

  constructor(private http:HttpClient) { 

  }

  register(registerUser:RegisterUser):Observable<string>{
    return this.http.post<{ status: number; message: string; data: string[] }>(`${this.URL}/register`,registerUser)
      .pipe(
        map(response=> response.data[0])
      )
  }

  login(loginUser:LoginUser):Observable<string>{
    return this.http.post<{ status: number; message: string; data: string[] }>(`${this.URL}/login`,loginUser)
      .pipe(
        map(response=> response.data[0]),
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
