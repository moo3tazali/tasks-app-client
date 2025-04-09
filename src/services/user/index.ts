import { UserPayload } from '@/interfaces';
import { TokenService } from '@/services';

export class UserService {
  // check if user is authenticated
  public static async isAuthenticated(): Promise<boolean> {
    try {
      const token = await TokenService.getToken();
      return !!token;
    } catch {
      return false;
    }
  }

  // get user info from token
  public static async getUser(): Promise<UserPayload | null> {
    try {
      const token = await TokenService.getToken();

      if (!token) return null;

      const payload = TokenService.decodeToken(token);

      return {
        id: payload.id,
        username: payload.username,
        email: payload.email,
        avatarPath: payload.avatarPath,
        roles: payload.roles,
      };
    } catch {
      return null;
    }
  }
}
