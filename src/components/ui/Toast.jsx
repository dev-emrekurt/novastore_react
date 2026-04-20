/**
 * Bildirim Bileşeni
 * Ekranın sağ alt köşesinde kısa bildirimler gösterir
 * 
 * @param {string} message - Gösterilecek mesaj
 * @param {string} type - 'success' | 'error' | 'info'
 * @param {number} duration - Görünme süresi (ms), 0 ise kapanmaz
 * @param {function} onClose - Kapanma callback
 */

import { COLORS } from "../../constants/color";

export default function Toast({ message, type = "info", duration = 3000, onClose }) {
  // Otomatik kapanma
  if (duration > 0) {
    setTimeout(onClose, duration);
  }

  const getTypeStyles = () => {
    const styles = {
      success: {
        backgroundColor: COLORS.accent,
        icon: "bi-check-circle",
      },
      error: {
        backgroundColor: "#ef4444",
        icon: "bi-exclamation-circle",
      },
      info: {
        backgroundColor: COLORS.primary,
        icon: "bi-info-circle",
      },
    };
    return styles[type] || styles.info;
  };

  const typeStyles = getTypeStyles();

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        left: "auto",
        backgroundColor: typeStyles.backgroundColor,
        color: "white",
        padding: "1rem 1.5rem",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: 9999,
        animation: "slideIn 0.3s ease",
        maxWidth: "calc(100% - 4rem)",
        minWidth: "250px",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <i className={`bi ${typeStyles.icon}`}></i>
      <span>{message}</span>
    </div>
  );
}
