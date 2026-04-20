/**
 * Loading Spinner Component
 * Veri yükleme sırasında gösterilebilir spinner
 * 
 * @param {string} message - Yükleme mesajı
 * @param {string} size - 'small' | 'medium' | 'large'
 */

import { COLORS } from "../../constants/color";

export default function LoadingSpinner({ message = "Yükleniyor...", size = "medium" }) {
  const sizes = {
    small: { width: "20px", height: "20px", fontSize: "0.8rem" },
    medium: { width: "40px", height: "40px", fontSize: "1rem" },
    large: { width: "60px", height: "60px", fontSize: "1.2rem" },
  };

  const sizeStyle = sizes[size] || sizes.medium;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "2rem",
      }}
    >
      {/* Spinner */}
      <div
        style={{
          width: sizeStyle.width,
          height: sizeStyle.height,
          border: `3px solid #f0f0f0`,
          borderTop: `3px solid ${COLORS.accent}`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>

      {/* Message */}
      <p
        style={{
          color: COLORS.text,
          fontSize: sizeStyle.fontSize,
          fontWeight: "600",
          margin: 0,
        }}
      >
        {message}
      </p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
