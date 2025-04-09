import Dexie from 'dexie';
import { EncryptJWT, jwtDecrypt, decodeJwt } from 'jose';

import { UserPayload } from '@/interfaces';
import { ConfigService } from '@/services';

const db = new Dexie('TasksDB');
db.version(1).stores({
  tokens: 'id, value',
});

export class TokenService {
  private static readonly tableName = 'tokens';
  private static readonly tokenId = 'authToken';

  // save encrypted token to indexedDB
  public static async setToken(token: string) {
    try {
      const signedToken = await this.encryptToken(token);
      await db
        .table(this.tableName)
        .put({ id: this.tokenId, value: signedToken });
    } catch (error) {
      console.error('Error saving token', error);
    }
  }

  // get decrypted token from indexedDB
  public static async getToken(): Promise<
    string | undefined
  > {
    try {
      const encryptedToken = (
        await db.table(this.tableName).get(this.tokenId)
      )?.value as string | undefined;

      if (!encryptedToken) return;

      return this.decryptToken(encryptedToken);
    } catch (error) {
      console.error('Error getting token', error);
    }
  }

  // delete token from indexedDB
  public static async clearToken(): Promise<void> {
    try {
      await db.table(this.tableName).delete(this.tokenId);
    } catch (error) {
      console.error('Error clearing token', error);
    }
  }

  // decode token to get user info payload
  public static decodeToken(token: string): UserPayload {
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
  private static async encryptToken(
    token: string
  ): Promise<string> {
    const secretKey = ConfigService.get('secretKey');

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
  private static async decryptToken(
    encryptedToken: string
  ): Promise<string> {
    const secretKey = ConfigService.get('secretKey');

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
  private static hexToBytes(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
  }
}
