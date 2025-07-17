import {  useState } from 'react';
import { AuthContext } from './auth-context.js';

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;