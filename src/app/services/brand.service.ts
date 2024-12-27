import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Brand } from '../model/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends GenericService<Brand> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/v1/brand`);
  }

}
