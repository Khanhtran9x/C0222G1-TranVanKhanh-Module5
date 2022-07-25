import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../enviroment';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {Category} from '../model/category';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(API_URL + '/categories');
  }

  findById(id: number): Observable<Category> {
    return this.http.get<Category>(`${API_URL}/categories/${id}`);
  }
}
