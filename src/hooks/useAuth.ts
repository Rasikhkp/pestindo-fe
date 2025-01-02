import { useAtom } from 'jotai';
import { authAtom } from '../store/auth';
import { User } from '../types/user';

export function useAuth() {
  const [auth, setAuth] = useAtom(authAtom);

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email,
      phone: '081234567890',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    };
    
    setAuth({ user: mockUser, isAuthenticated: true });
  };

  const logout = () => {
    setAuth({ user: null, isAuthenticated: false });
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!auth.user) return;
    
    const updatedUser = {
      ...auth.user,
      ...data,
    };
    
    setAuth({ ...auth, user: updatedUser });
  };

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    login,
    logout,
    updateProfile,
  };
}