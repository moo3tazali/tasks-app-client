import Dexie from 'dexie';
import { EncryptJWT, jwtDecrypt, decodeJwt } from 'jose';

import { Env, ENV } from './env';
import { UserPayload } from '@/interfaces';

export class Token {
  private static _instance: Token;
  private readonly _db: Dexie;
  private readonly _env: Env = Env.getInstance();
  private readonly _tableName = 'tokens';
  private readonly _tokenId = 'authToken';

  private constructor() {
    this._db = new Dexie('TasksDB');
    this._db.version(1).stores({
      tokens: 'id, value',
    });
  }

  // singleton pattern
  public static getInstance(): Token {
    if (!Token._instance) {
      Token._instance = new Token();
    }
    return Token._instance;
  }

  // save encrypted token to indexedDB
  public async setToken(token: string) {
    try {
      const signedToken = await this.encryptToken(token);
      await this._db
        .table(this._tableName)
        .put({ id: this._tokenId, value: signedToken });
    } catch (error) {
      console.error('Error saving token', error);
    }
  }

  // get decrypted token from indexedDB
  public async getToken(): Promise<string | undefined> {
    try {
      const encryptedToken = (
        await this._db.table(this._tableName).get(this._tokenId)
      )?.value as string | undefined;

      if (!encryptedToken) return;

      return this.decryptToken(encryptedToken);
    } catch (error) {
      console.error('Error getting token', error);
    }
  }

  // delete token from indexedDB
  public async clearToken(): Promise<void> {
    try {
      await this._db
        .table(this._tableName)
        .delete(this._tokenId);
    } catch (error) {
      console.error('Error clearing token', error);
    }
  }

  // decode token to get user info payload
  public decodeToken(token: string): UserPayload {
    try {
      const payload = decodeJwt<UserPayload>(token);

      return {
        id: payload.sub ?? '',
        username: payload.username,
        email: payload.email,
        avatarPath: payload.avatarPath,
        roles: payload.roles,
      };
    } catch {
      throw new Error('Error decoding token');
    }
  }

  // private method to encrypt Token with secret key
  private async encryptToken(token: string): Promise<string> {
    const secretKey = this._env.get(ENV.SECRET_KEY);

    const secret = this.hexToBytes(secretKey);

    try {
      const encryptedToken = await new EncryptJWT({ token })
        .setProtectedHeader({
          alg: 'dir',
          enc: 'A256GCM',
        })
        .encrypt(secret);

      return encryptedToken;
    } catch {
      throw new Error('Error encrypting token');
    }
  }

  // private method to decrypt Token with secret key
  private async decryptToken(
    encryptedToken: string
  ): Promise<string> {
    const secretKey = this._env.get(ENV.SECRET_KEY);

    const secret = this.hexToBytes(secretKey);

    try {
      const { payload } = await jwtDecrypt<{
        token: string;
      }>(encryptedToken, secret);

      const decodedToken = payload.token;

      return decodedToken;
    } catch {
      throw new Error('Error decrypting token');
    }
  }

  // private method to convert hex string to Uint8Array
  private hexToBytes(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
  }
}
