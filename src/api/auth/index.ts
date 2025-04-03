import { publicApi, handle } from '@/api/axios';
import { SuccessRes } from '@/interfaces/api-res';

export class Auth {
  static readonly loginUrl = '/auth/login';
  static readonly registerUrl = '/auth/register';

  static async login(data: {
    identifier: string;
    password: string;
  }): Promise<SuccessRes<{ accessToken: string }>> {
    return handle(() =>
      publicApi.post(Auth.loginUrl, data)
    );
  }

  static async register() {}
}
