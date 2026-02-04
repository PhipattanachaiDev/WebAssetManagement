import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../models/api-response.model';
import { Category } from '../../models/category.model';
import { environment } from '../../../environment/environment.development';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private api = `${environment.apiUrl}/Category`;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<ApiResponse<Category[]>>(this.api);
  }
}
