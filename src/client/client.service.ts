import { Service } from 'typedi';
import { Axios } from 'axios';
import { CLIENT_SERVICE } from './client.constants';
import type { AllowMethods } from './types';

@Service({
  name: CLIENT_SERVICE,
})
export class ClientService {
  private readonly axios: Axios;

  constructor(url: string) {
    this.axios = new Axios({ url });
  }

  private async request(endpoint: string, method: AllowMethods, params?: any, body?: any) {
    return this.axios.request({
      method,
    })
  }

  public get<Response>(endpoint: string, params): Promise<Response> {
    return this.request(url, 'GET');
  }

  public post(endpoint: string): Promise<> {
    return this.request(url, 'POST')
  }

  public delete(endpoint: string): Promise<> {
    return this.axios.delete()
  }
  
  public patch(
    endpoint: string
  ) {
    return this.axios.patch()
  }
}