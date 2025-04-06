export interface TUser {
  isAuthenticated: boolean;
  id: string;
  username: string;
  email: string;
  avatarPath: string;
  roles: string[];
}
