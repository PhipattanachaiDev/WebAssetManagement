import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../models/api-response.model';
import { Asset, AssetRequest } from '../../models/asset.model';
import { environment } from '../../../environment/environment.development';

@Injectable({ providedIn: 'root' })
export class AssetService {
  private api = `${environment.apiUrl}/Asset`;

  constructor(private http: HttpClient) {}

  getAssets() {
    return this.http.get<ApiResponse<Asset[]>>(this.api);
  }

  createAsset(data: AssetRequest) {
    return this.http.post<ApiResponse<any>>(this.api, data);
  }

  updateAsset(id: number, data: AssetRequest) {
    return this.http.put<ApiResponse<any>>(`${this.api}/${id}`, data);
  }

  deleteAsset(id: number) {
    return this.http.delete<ApiResponse<any>>(`${this.api}/${id}`);
  }
}
