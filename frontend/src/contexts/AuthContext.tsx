import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import UserData from '../services/api/users';
import type { User } from '../services/api/users';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Função para verificar se o usuário está logado ao carregar a aplicação
  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const response = await UserData.me();
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
      const response = await UserData.login(email, password);
      setUser(response.data);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de registro
  const register = async (userData: User) => {
    try {
      setIsLoading(true);
      const response = await UserData.register(userData);
      setUser(response.data);
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      setIsLoading(true);
      await UserData.logout();
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
      const response = await UserData.me();
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