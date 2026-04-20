/**
 * useAuth Hook
 * Authentication state ve işlemlerini yönetmek için custom hook
 * 
 * @returns {object} - { user, isLoading, logout, login }
 */

import { useState, useEffect } from "react";
import { STORAGE_KEYS } from "../constants/app";
import logger from "../utils/logger";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Uygulama açıldığında user bilgisini kontrol et
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        logger.debug("👤 User Loaded from Storage", userData);
      } catch (error) {
        logger.error("❌ Failed to Parse User Data", error);
      }
    }
    setIsLoading(false);
  }, []);

  /**
   * Kullanıcıyı oturumdan çıkart
   */
  const logout = () => {
    logger.info("🚪 User Logout");
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    setUser(null);
  };

  /**
   * Kullanıcıyı giriş yaptır (AuthModal tarafından çağrılır)
   */
  const setUserData = (userData) => {
    try {
      setUser(userData);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      
      // Token'ı ayrıca kaydet
      if (userData.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, userData.token);
      }
      
      logger.success("✅ User Logged In", userData);
    } catch (error) {
      logger.error("❌ Failed to Set User Data", error);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
    setUserData,
  };
}
