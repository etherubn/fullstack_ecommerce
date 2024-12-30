import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Category } from '../model/category';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends GenericService<Category> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/v1/category`);
  }

}
