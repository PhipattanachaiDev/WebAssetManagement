import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../models/api-response.model';
import { LoginRequest, LoginResponse } from '../../models/user.model';
import { environment } from '../../../environment/environment.development';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private api = `${environment.apiUrl}/Auth`;

    constructor(private http: HttpClient) { }

    register(data: any) {
        return this.http.post<ApiResponse<any>>(`${this.api}/register`, data);
    }

    login(data: any) {
        return this.http.post<ApiResponse<LoginResponse>>(`${this.api}/login`, data);
    }
    saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    logout() {
  localStorage.removeItem('token');
}

getUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

}
