import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(
    protected http: HttpClient,
    @Inject('url') protected url: string
  ) { }

  findAll() {
    return this.http.get<{ status: number; message: string; data: T[] }>(this.url).pipe(
      map(response => response.data) // Extraemos solo el campo `data`
    );
  }
  

  findById(id: number){
    return this.http.get<T>(`${this.url}/${id}`);
  }

  save(t: T){
    return this.http.post(this.url, t);
  }

  update(id: number, t: T){
    return this.http.put(`${this.url}/${id}`, t);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
