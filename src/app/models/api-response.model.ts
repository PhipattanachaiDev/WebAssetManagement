export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  timestamp: string;
  data: T;
  createId?: number;
}
