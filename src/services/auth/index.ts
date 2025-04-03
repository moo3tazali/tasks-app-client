import Cookies from 'universal-cookie';
import { EncryptJWT, jwtDecrypt, decodeJwt } from 'jose';

import { publicApi, handle } from '@/services/axios';
import { SuccessRes } from '@/interfaces/api-res';

const cookies = new Cookies(null, {
  path: '/',
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  sameSite: 'strict',
  secure: import.meta.env.PROD,
});

export interface User {
  isAuthenticated: boolean;
  id: string;
  username: string;
  email: string;
  avatarPath: string;
  roles: string[];
}

export interface AuthType {
  isAuthenticated: boolean;
  user: User;
  clear: () => void;
  set: (token: string, cb?: () => void) => void;
}

export const defaultUser: User = {
  isAuthenticated: false,
  id: '',
  username: '',
  email: '',
  avatarPath: '',
  roles: [],
};

export class Auth {
  static readonly loginUrl = '/auth/login';
  static readonly registerUrl = '/auth/register';
  private static readonly secretKey =
    (import.meta.env.VITE_TOKEN_SECRET as string) ?? '';
  private static readonly tokenKey = 'accessToken';

  static async login(data: {
    identifier: string;
    password: string;
  }): Promise<SuccessRes<{ accessToken: string }>> {
    return handle(() =>
      publicApi.post(Auth.loginUrl, data)
    );
  }

  static async register(data: {
    username: string;
    email: string;
    password: string;
  }): Promise<SuccessRes<{ accessToken: string }>> {
    return handle(() =>
      publicApi.post(Auth.registerUrl, data)
    );
  }

  static async setToken(token: string) {
    const signedToken = await Auth.encryptToken(token);
    cookies.set(Auth.tokenKey, signedToken);
  }

  static async getToken(): Promise<string | null> {
    const encryptedToken =
      (cookies.get(Auth.tokenKey) as string) ?? '';

    if (!encryptedToken) return null;

    return await Auth.decryptToken(encryptedToken);
  }

  static clearToken(): void {
    cookies.remove(Auth.tokenKey);
  }

  static async isAuthenticated(): Promise<boolean> {
    try {
      const token = await Auth.getToken();
      return !!token;
    } catch {
      return false;
    }
  }

  static async getUser(): Promise<User> {
    try {
      const token = await Auth.getToken();

      return Auth.decodeToken(token);
    } catch {
      return defaultUser;
    }
  }

  private static decodeToken(token: string | null): User {
    if (!token) return defaultUser;

    try {
      const decoded = decodeJwt(token);

      return {
        isAuthenticated: true,
        id: decoded?.sub as string,
        username: decoded?.username as string,
        email: decoded?.email as string,
        avatarPath: decoded?.avatarPath as string,
        roles: decoded?.roles as string[],
      };
    } catch {
      return defaultUser;
    }
  }

  private static async encryptToken(
    token: string
  ): Promise<string> {
    const secret = Auth.hexToBytes(Auth.secretKey);

    const encryptedToken = await new EncryptJWT({ token })
      .setProtectedHeader({
        alg: 'dir',
        enc: 'A256GCM',
      })
      .encrypt(secret);

    return encryptedToken;
  }

  private static async decryptToken(
    encryptedToken: string
  ): Promise<string | null> {
    if (!encryptedToken) return null;

    const secret = Auth.hexToBytes(Auth.secretKey);

    try {
      const { payload } = await jwtDecrypt(
        encryptedToken,
        secret
      );

      const decodedToken = payload.token as string;

      return decodedToken;
    } catch (error) {
      console.error('Error decrypting token', error);

      return null;
    }
  }

  private static hexToBytes(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
  }
}
