import { AuthProvider } from 'react-admin';

export const authProvider: AuthProvider = {
  login: () => Promise.resolve(),
  logout: () => {
    localStorage.removeItem('adminToken');
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem('adminToken') ? Promise.resolve() : Promise.reject();
  },
  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem('adminToken');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => Promise.resolve('admin'),
};