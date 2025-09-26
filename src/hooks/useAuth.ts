import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  Id: number;
  Nome: string;
  Email: string;
  Tipo: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userAuth');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem('userAuth', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('userAuth');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  const requireAuth = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return false;
    }
    return true;
  };

  const requireAdmin = () => {
    if (!isAuthenticated || user?.Tipo !== 'Admin') {
      navigate('/dashboard');
      return false;
    }
    return true;
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    requireAuth,
    requireAdmin
  };
};