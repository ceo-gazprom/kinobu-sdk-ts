import { Service } from 'typedi';
import { Axios } from 'axios';
import type { AxiosResponse } from 'axios';
import { CLIENT_SERVICE } from './client.constants';
import { IClientService } from './interfaces';
import type { AllowMethods, ParamsType } from './types';

@Service({
  name: CLIENT_SERVICE,
})
export class ClientService implements IClientService {
  private readonly axios: Axios;

  constructor() {
    this.axios = new Axios({ url: process.env.API_HOST });
  }

  private request<Response>(endpoint: string, method: AllowMethods, body?: any): Promise<AxiosResponse<Response>>;
  private request<Response>(endpoint: string, method: AllowMethods, params?: ParamsType): Promise<AxiosResponse<Response>>;
  private request<Response>(endpoint: string, method: AllowMethods, body?: any, params?: ParamsType): Promise<AxiosResponse<Response>> {
    return this.axios.request({
      url: endpoint,
      method,
      data: body,
      params: params,
    })
  }

  public async get<Response>(endpoint: string, params?: ParamsType): Promise<Response> {
    const result = await this.request<Response>(endpoint, 'GET');
    if (result.status !== 200) throw new Error(result.statusText);

    return result.data;
  }

  // public async post(endpoint: string, body): any {
  //   return this.request(url, 'POST')
  // }

  // public delete(endpoint: string): Promise<> {
  //   return this.axios.delete()
  // }
  
  // public patch(
  //   endpoint: string
  // ) {
  //   return this.axios.patch()
  // }
}