export interface IClientService {
  get<Response>(endpoint: string): Promise<Response>;
  post<Response>(endpoint: string): Promise<Response>;
  delete<Response>(endpoint: string): Promise<Response>;
  patch<Response>(endpoint: string): Promise<Response>;
}