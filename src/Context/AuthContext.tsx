import { Children, createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface IContextProps {
  children?: ReactNode;
}

interface IUserContext {
  name: string;
  email: string;
}

interface IContextValues {
  user: IUserContext;
  loggedIn: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<IContextValues>({
  loggedIn: false,
  login: async (email, senha) => {
    return;
  },
  token: null,
  user: { email: '', name: '' },
});

export const AuthProvider = ({ children }: IContextProps) => {
  const [user, setUser] = useState<IUserContext>({ email: '', name: '' });
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const storageUser = localStorage.getItem('@App:user');
      const storageToken = localStorage.getItem('@App:token');
      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        setToken(JSON.parse(storageToken));
        api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });

    if (response.data.error) {
      alert(response.data.error);
    } else {
      setUser(response.data.user);
      setToken(response.data.token);
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.token}`;
      localStorage.setItem('@App:token', JSON.stringify(response.data.token));
      localStorage.setItem('@App:user', JSON.stringify(response.data.user));
      navigate('/');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loggedIn: !!token, login, token }}>
      {children}
    </AuthContext.Provider>
  );
};
