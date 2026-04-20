/**
 * Storage Utilities
 * localStorage işlemlerini yönetmek için merkezi fonksiyonlar
 */

import { STORAGE_KEYS } from "../constants/app";
import logger from "./logger";

/**
 * User bilgisini kaydet
 * @param {object} user - User object
 */
export const saveUser = (user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    logger.storageSet("User", user);
  } catch (error) {
    logger.error("Failed to save user", error);
  }
};

/**
 * User bilgisini getir
 * @returns {object|null} - User object
 */
export const getUser = () => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    if (user) {
      logger.storageGet("User", JSON.parse(user));
      return JSON.parse(user);
    }
    return null;
  } catch (error) {
    logger.error("Failed to get user", error);
    return null;
  }
};

/**
 * User bilgisini sil
 */
export const removeUser = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
    logger.storageRemove("User");
  } catch (error) {
    logger.error("Failed to remove user", error);
  }
};

/**
 * Auth token'ı kaydet
 * @param {string} token - Token
 */
export const saveAuthToken = (token) => {
  try {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    logger.storageSet("AuthToken", token);
  } catch (error) {
    logger.error("Failed to save auth token", error);
  }
};

/**
 * Auth token'ı getir
 * @returns {string|null} - Token
 */
export const getAuthToken = () => {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      logger.storageGet("AuthToken", token);
      return token;
    }
    return null;
  } catch (error) {
    logger.error("Failed to get auth token", error);
    return null;
  }
};

/**
 * Auth token'ı sil
 */
export const removeAuthToken = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    logger.storageRemove("AuthToken");
  } catch (error) {
    logger.error("Failed to remove auth token", error);
  }
};

/**
 * Sepeti kaydet
 * @param {array} cart - Cart items
 */
export const saveCart = (cart) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    logger.storageSet("Cart", cart);
  } catch (error) {
    logger.error("Failed to save cart", error);
  }
};

/**
 * Sepeti getir
 * @returns {array} - Cart items
 */
export const getCart = () => {
  try {
    const cart = localStorage.getItem(STORAGE_KEYS.CART);
    if (cart) {
      logger.storageGet("Cart", JSON.parse(cart));
      return JSON.parse(cart);
    }
    return [];
  } catch (error) {
    logger.error("Failed to get cart", error);
    return [];
  }
};

/**
 * Sepeti temizle
 */
export const clearCart = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CART);
    logger.storageRemove("Cart");
  } catch (error) {
    logger.error("Failed to clear cart", error);
  }
};

/**
 * Hatırlanmış emaili kaydet
 * @param {string} email - Email
 */
export const saveRememberedEmail = (email) => {
  try {
    localStorage.setItem(STORAGE_KEYS.REMEMBERED_EMAIL, email);
    logger.storageSet("RememberedEmail", email);
  } catch (error) {
    logger.error("Failed to save remembered email", error);
  }
};

/**
 * Hatırlanmış emaili getir
 * @returns {string|null} - Email
 */
export const getRememberedEmail = () => {
  try {
    const email = localStorage.getItem(STORAGE_KEYS.REMEMBERED_EMAIL);
    if (email) {
      logger.storageGet("RememberedEmail", email);
      return email;
    }
    return null;
  } catch (error) {
    logger.error("Failed to get remembered email", error);
    return null;
  }
};

/**
 * Hatırlanmış emaili sil
 */
export const removeRememberedEmail = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.REMEMBERED_EMAIL);
    logger.storageRemove("RememberedEmail");
  } catch (error) {
    logger.error("Failed to remove remembered email", error);
  }
};

/**
 * Tüm storage'i temizle (logout sırasında)
 */
export const clearAllStorage = () => {
  try {
    removeUser();
    removeAuthToken();
    clearCart();
    logger.info("🧹 All storage cleared");
  } catch (error) {
    logger.error("Failed to clear all storage", error);
  }
};
