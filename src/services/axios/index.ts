import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';

import type { ErrorRes, SuccessRes } from '@/interfaces';
import { ConfigService, TokenService } from '@/services';

export class AxiosService {
  private static baseUrl: string;
  private static publicInstance: AxiosInstance;
  private static authInstance: AxiosInstance;
  // ---------- Public Methods ----------

  public static init() {
    this.baseUrl = ConfigService.get('baseUrl');

    this.publicInstance = axios.create({
      baseURL: this.baseUrl,
    });

    this.authInstance = axios.create({
      baseURL: this.baseUrl,
    });

    this.authInstance.interceptors.request.use(
      async (config) => {
        const token = await TokenService.getToken();
        if (!token) {
          return Promise.reject({
            code: 401,
            message: 'Unauthorized: Token is missing.',
            error: true,
          });
        }
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }
    );
  }

  public static publicGet<T>(
    url: string,
    config?: AxiosRequestConfig
  ) {
    return this.handle<T>(() =>
      this.publicInstance.get(url, config)
    );
  }

  public static publicPost<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.handle<T>(() =>
      this.publicInstance.post(url, data, config)
    );
  }

  // ---------- Auth Methods (with Token) ----------

  public static authGet<T>(
    url: string,
    config?: AxiosRequestConfig
  ) {
    return this.handle<T>(() =>
      this.authInstance.get(url, config)
    );
  }

  public static authPost<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) {
    return this.handle<T>(() =>
      this.authInstance.post(url, data, config)
    );
  }

  public static authPut<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) {
    return this.handle<T>(() =>
      this.authInstance.put(url, data, config)
    );
  }

  public static authPatch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) {
    return this.handle<T>(() =>
      this.authInstance.patch(url, data, config)
    );
  }

  public static authDelete<T>(
    url: string,
    config?: AxiosRequestConfig
  ) {
    return this.handle<T>(() =>
      this.authInstance.delete(url, config)
    );
  }

  private static async handle<T>(
    fn: () => Promise<{ data: SuccessRes<T> }>
  ): Promise<T> {
    try {
      const res = await fn();
      return res.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          const err = error.response.data as ErrorRes;
          throw {
            ...err.status,
          };
        }

        if (error.request) {
          throw {
            code: 0,
            message:
              'Network Error: Unable to connect to server.',
            error: true,
            validationsErrors: null,
          };
        }

        throw {
          code: 0,
          message: `Request Error: ${error.message}`,
          error: true,
          validationsErrors: null,
        };
      }

      throw {
        code: 0,
        message:
          error instanceof Error
            ? error.message
            : 'Unknown error',
        error: true,
        validationsErrors: null,
      };
    }
  }
}
