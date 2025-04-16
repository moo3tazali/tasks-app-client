import { Auth } from './auth';
import { User } from './user';
import { Board } from './board';

export const services = {
  authService: Auth.getInstance(),
  userService: User.getInstance(),
  boardService: Board.getInstance(),
} as const;

export type TServices = typeof services;
