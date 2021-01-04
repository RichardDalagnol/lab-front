
import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface AuthData {
  token: string,
  user: object
}

interface SignInCredentials {
  email: string,
  senha: string
}

interface AuthContextData {
  user: object;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthData>(() => {
    const token = localStorage.getItem('@Lamivet:token')
    const user = localStorage.getItem('@Lamivet:user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthData;
  })

  const signIn = useCallback(async ({ email, senha }) => {
    const response = await api.post('session', {
      email,
      senha
    })

    const { user, token } = response.data;

    localStorage.setItem('@Lamivet:token', token)
    localStorage.setItem('@Lamivet:user', JSON.stringify(user))

    setData({ token, user });
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@Lamivet:token')
    localStorage.removeItem('@Lamivet:user')
    setData({} as AuthData)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, token: data.token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um um AuthProvider')
  }

  return context;
}

