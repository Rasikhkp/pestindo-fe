import { atom } from 'jotai';
import { User } from '../types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const authAtom = atom<AuthState>({
  user: null,
  isAuthenticated: false,
});