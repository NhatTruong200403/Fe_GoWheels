// src/services/auth/TokenService.js

const TokenService = {
    saveToken(token) {
      localStorage.setItem('auth_token', token);
    },
    getToken() {
      return localStorage.getItem('auth_token');
    },
    getUser() {
      return localStorage.getItem('User');
    },
    removeToken() {
      localStorage.removeItem('User');
      localStorage.removeItem('auth_token');
    }
  };
  
  export default TokenService;
  