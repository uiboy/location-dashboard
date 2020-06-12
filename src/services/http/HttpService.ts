import IHttpService from '@/services/http/IHttpService';
import { inject, injectable } from 'inversify';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import IEnvironmentService from '@/services/environment/IEnvironmentService';
import { TYPES } from '@/types/Inversify';

/**
 * Generic adapter for all Http requests. Axios instance is
 * set during Vue App setup in main.ts.
 */
@injectable()
export default class HttpService implements IHttpService {
  private axios!: AxiosInstance;

  constructor(@inject(TYPES.EnvironmentService) private environmentService?: IEnvironmentService) {}

  setAxiosInstance(axios: AxiosInstance) {
    this.axios = axios;
    this.setBaseUrl();
  }

  async get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.axios.get(url, config);
  }

  setBaseUrl() {
    this.axios.defaults.baseURL = this.environmentService.apiUrl;
  }
}
