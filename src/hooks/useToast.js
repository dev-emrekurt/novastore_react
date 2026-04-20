/**
 * useToast Hook
 * Toast notification'ları yönetmek için custom hook
 * 
 * @returns {object} - { toasts, addToast, removeToast }
 */

import { useState, useCallback } from "react";

export default function useToast() {
  const [toasts, setToasts] = useState([]);

  /**
   * Toast notification ekle
   * @param {string} message - Mesaj
   * @param {string} type - 'success' | 'error' | 'info'
   * @param {number} duration - Görünme süresi (ms)
   */
  const addToast = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }

    return id;
  }, []);

  /**
   * Toast notification kaldır
   */
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
