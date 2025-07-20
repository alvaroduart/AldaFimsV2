import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {apiUser} from '../services';
import type { User, UserToken } from '../types';
import { useLocalStorage } from '../hooks';
import { AxiosError } from 'axios';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (apiUser: User) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  refreshUser: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [storedUser, setStoredUser] = useLocalStorage<UserToken | null>("currentUser", null);

  const isAuthenticated = !!user;

  useEffect(() => {
    // Check if user is stored in localStorage
    //const storedUser = storedUser()
    console.log(storedUser)
    if (storedUser) {
      setUser(storedUser.user)
    }
    setIsLoading(false)
  }, [storedUser]);

  // Função para verificar se o usuário está logado ao carregar a aplicação
  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const response = await apiUser.me();
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao verificar status de autenticação:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Função de login
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await apiUser.login(email, password);
      setUser(response.data.user);
      setStoredUser(response.data);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de registro
  const register = async (user: User) => {
    try {
      setIsLoading(true);
      const response = await apiUser.register(user);
      if (response.status !== 200) {
        throw new Error('Failed to register user');
      }
      login(user.email, user.password!); // Assume que o usuário já tem uma senha definida
    } catch (error) {
      if (error instanceof AxiosError && error.response){
        if (error.response?.data.errors){
          throw new Error(error.response.data.errors[0].message)
        }else{
          throw new Error(error.response.data.detail)
        }
      } 
      throw new Error("Email ou senha inválida")
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      setIsLoading(true);
      await apiUser.logout();
      setUser(null);
    } catch (error) {
      console.error('Erro no logout:', error);
      // Mesmo com erro, limpa o usuário localmente
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para atualizar dados do usuário
  const refreshUser = async () => {
    if (!isAuthenticated) return;
    
    try {
      const response = await apiUser.me();
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
      // Se falhar ao buscar dados, pode ser que o token expirou
      setUser(null);
    }
  };

  // Verificar status de autenticação ao montar o componente
  useEffect(() => {
    
    checkAuthStatus();
  }, []);

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Removido useAuth e export default AuthContext para evitar Fast Refresh error