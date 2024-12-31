/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  console.log(user);

  const toggleAuthModal = () => setAuthModalVisible(!isAuthModalVisible);
  const switchToLogin = () => setIsLogin(true);
  const switchToSignup = () => setIsLogin(false);

  const loginUser = (userData) => setUser(userData);
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");
    console.log(token, userData);
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthModalVisible,
        toggleAuthModal,
        isLogin,
        switchToLogin,
        switchToSignup,
        user,
        loginUser,
        logoutUser,
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
