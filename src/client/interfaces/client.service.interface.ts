export interface IClientService {
  get<Resposne>(): Promise<Response>
  post<Response>(): Promise<Response>
  delete<Response>(): Promise<Response>
  patch<Response>(): Promise<Response>
}