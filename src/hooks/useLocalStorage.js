/**
 * useLocalStorage Hook
 * localStorage işlemlerini yönetmek için custom hook
 * 
 * @param {string} key - Storage key
 * @param {any} initialValue - İlk değer
 * @returns {[any, function]} - Current value ve setter
 */

import { useState, useEffect } from "react";
import logger from "../utils/logger";

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        logger.debug(`📖 LocalStorage Get: ${key}`);
        return JSON.parse(item);
      }
      return initialValue;
    } catch (error) {
      logger.error(`❌ LocalStorage Read Error: ${key}`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      logger.debug(`💾 LocalStorage Set: ${key}`, valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      logger.error(`❌ LocalStorage Write Error: ${key}`, error);
    }
  };

  const removeValue = () => {
    try {
      logger.debug(`🗑️ LocalStorage Remove: ${key}`);
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      logger.error(`❌ LocalStorage Remove Error: ${key}`, error);
    }
  };

  return [storedValue, setValue, removeValue];
}
