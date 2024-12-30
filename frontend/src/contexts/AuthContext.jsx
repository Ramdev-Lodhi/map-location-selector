/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthModal = () => setAuthModalVisible(!isAuthModalVisible);
  const switchToLogin = () => setIsLogin(true);
  const switchToSignup = () => setIsLogin(false);

  return (
    <AuthContext.Provider
      value={{
        isAuthModalVisible,
        toggleAuthModal,
        isLogin,
        switchToLogin,
        switchToSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
