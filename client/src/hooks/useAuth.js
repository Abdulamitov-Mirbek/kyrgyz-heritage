import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore.js';

export const useAuth = () => {
  const { user, token, isAuthenticated, login, register, logout } = useAuthStore();
  
  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
  };
};

export const useRequireAuth = (redirectTo = '/') => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo]);

  return isAuthenticated;
};