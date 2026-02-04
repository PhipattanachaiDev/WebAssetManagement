export interface Asset {
  id: number;
  name: string;
  serialNumber: string;
  categoryId: number;
  categoryName: string;
  categoryDescription?: string;
}

export interface AssetRequest {
  name: string;
  serialNumber: string;
  categoryId: number;
}
