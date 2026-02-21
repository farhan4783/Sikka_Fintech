import { getToken, getUser, removeToken, setToken, setUser, authAPI } from './api';

export const isAuthenticated = () => {
  return !!getToken();
};

export const login = async (email, password) => {
  const response = await authAPI.login({ email, password });
  return response;
};

export const signup = async (name, email, password) => {
  const response = await authAPI.signup({ name, email, password });
  return response;
};

export const getUserData = () => {
  return getUser();
};

export const logout = () => {
  removeToken();
  window.location.href = '/login';
};
