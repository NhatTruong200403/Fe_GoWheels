// src/services/SessionStorageService.js

const SessionStorageService = {
    setItem(key, value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
    getItem(key) {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    },
    removeItem(key) {
      sessionStorage.removeItem(key);
    },
    clear() {
      sessionStorage.clear();
    }
  };
  
  export default SessionStorageService;
      