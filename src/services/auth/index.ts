import Dexie from 'dexie';
import { EncryptJWT, jwtDecrypt, decodeJwt } from 'jose';

import { publicApi, handle } from '@/lib/axios';
import type { SuccessRes } from '@/interfaces/api-res';
import type { TUser } from '@/interfaces/user';

const db = new Dexie('MyDatabase');
db.version(1).stores({
  tokens: 'id, value',
});

export class Auth {
  public static readonly defaultUser: TUser = {
    isAuthenticated: false,
    id: '',
    username: '',
    email: '',
    avatarPath: '',
    roles: [],
  };
  public static readonly loginUrl = '/auth/login';
  public static readonly registerUrl = '/auth/register';
  private static readonly secretKey =
    (import.meta.env.VITE_TOKEN_SECRET as string) ?? '';
  private static readonly tokenId = 'authToken';

  public static async login(data: {
    identifier: string;
    password: string;
  }): Promise<SuccessRes<{ accessToken: string }>> {
    return handle(() => publicApi.post(Auth.loginUrl, data));
  }

  public static async register(data: {
    username: string;
    email: string;
    password: string;
  }): Promise<SuccessRes<{ accessToken: string }>> {
    return handle(() => publicApi.post(Auth.registerUrl, data));
  }

  public static async setToken(token: string) {
    const signedToken = await Auth.encryptToken(token);

    await db
      .table('tokens')
      .put({ id: Auth.tokenId, value: signedToken });
  }

  public static async getToken(): Promise<string | null> {
    const encryptedToken = (
      await db.table('tokens').get(Auth.tokenId)
    )?.value as string | null;

    if (!encryptedToken) return null;

    return await Auth.decryptToken(encryptedToken);
  }

  public static async clearToken(): Promise<void> {
    await db.table('tokens').delete(Auth.tokenId);
  }

  public static async isAuthenticated(): Promise<boolean> {
    try {
      const token = await Auth.getToken();
      return !!token;
    } catch {
      return false;
    }
  }

  public static async getUser(): Promise<TUser> {
    try {
      const token = await Auth.getToken();

      return Auth.decodeToken(token);
    } catch {
      return Auth.defaultUser;
    }
  }

  private static decodeToken(token: string | null): TUser {
    if (!token) return Auth.defaultUser;

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
      return Auth.defaultUser;
    }
  }

  private static async encryptToken(token: string): Promise<string> {
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
      const { payload } = await jwtDecrypt(encryptedToken, secret);

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
