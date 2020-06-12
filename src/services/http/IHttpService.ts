import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export default interface IHttpService {
  setAxiosInstance(axios: AxiosInstance): void;
  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R>;
  setBaseUrl(): void;
}
