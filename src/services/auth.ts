import { UserPayload, TAuth } from '@/interfaces';
import { Token } from './core/token';
import { Sync } from './core/sync';
import { API_ROUTES } from './core/api-routes';

interface LoginData {
  identifier: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

const syncService = Sync.getInstance({ public: true });
const tokenService = Token.getInstance();

export class Auth {
  private static _instance: Auth;

  private constructor() {}

  public static getInstance(): Auth {
    if (!Auth._instance) {
      Auth._instance = new Auth();
    }

    return Auth._instance;
  }

  public async login(data: LoginData): Promise<UserPayload> {
    const { accessToken } = await syncService.save<
      TAuth,
      LoginData
    >(API_ROUTES.AUTH.LOGIN, data);

    tokenService.setToken(accessToken);

    return tokenService.decodeToken(accessToken);
  }

  public async register(
    data: RegisterData
  ): Promise<UserPayload> {
    const { accessToken } = await syncService.save<
      TAuth,
      RegisterData
    >(API_ROUTES.AUTH.REGISTER, data);

    tokenService.setToken(accessToken);

    return tokenService.decodeToken(accessToken);
  }

  public async logout(): Promise<void> {
    await tokenService.clearToken();
  }
}
