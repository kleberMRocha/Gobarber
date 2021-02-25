/* eslint-disable camelcase */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface UserData {
  email: string;
  password: string;
}

interface UserObj {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContexData {
  user: UserObj;
  sigin(data: UserData): Promise<void>;
  signOut(): void;
  updateUser(user: UserObj): void;
}

interface AuthState {
  token: string;
  user: UserObj;
}

const AuthContext = createContext<AuthContexData>({} as AuthContexData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@goBarber:token');
    const user = localStorage.getItem('@goBarber:user');

    if (token && user) {
      api.defaults.headers.token = `Bearer ${JSON.parse(token)}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const updateUser = useCallback(
    (user: UserObj) => {
      localStorage.setItem('@goBarber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  const sigin = useCallback(async ({ email, password }) => {
    const response = await api.post('session', { email, password });
    const { token, user } = response.data;
    const parcedToken = { token };
    api.defaults.headers.token = `Bearer ${parcedToken.token}`;

    localStorage.setItem('@goBarber:token', JSON.stringify(token));
    localStorage.setItem('@goBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@goBarber:token');
    localStorage.removeItem('@goBarber:user');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, sigin, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContexData {
  const authcontex = useContext(AuthContext);
  if (!authcontex) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }
  return authcontex;
}
