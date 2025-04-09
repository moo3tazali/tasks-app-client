import { UserPayload } from '@/interfaces';
import {
  AxiosService,
  ApiService,
  TokenService,
} from '@/services';

export class AuthService {
  public static async login(data: {
    identifier: string;
    password: string;
  }): Promise<UserPayload> {
    const url = ApiService.getUrl('login');

    const res = await AxiosService.publicPost<{
      accessToken: string;
    }>(url, data);

    TokenService.setToken(res.accessToken);

    return TokenService.decodeToken(res.accessToken);
  }

  public static async register(data: {
    username: string;
    email: string;
    password: string;
  }): Promise<UserPayload> {
    const url = ApiService.getUrl('register');

    const res = await AxiosService.publicPost<{
      accessToken: string;
    }>(url, data);

    TokenService.setToken(res.accessToken);

    return TokenService.decodeToken(res.accessToken);
  }

  public static async logout(): Promise<void> {
    await TokenService.clearToken();
  }
}
