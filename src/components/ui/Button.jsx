/**
 * Reusable Button Component
 * Tüm uygulamada kullanılan primary/secondary button stilleri
 * 
 * @param {string} variant - 'primary' | 'secondary' | 'danger'
 * @param {boolean} loading - Loading durumu
 * @param {boolean} disabled - Devre dışı durumu
 * @param {function} onClick - Tıklama handler
 * @param {string} children - Button text/content
 * @param {object} style - Additional styles
 */

import { COLORS } from "../../constants/color";

export default function Button({
  variant = "primary",
  loading = false,
  disabled = false,
  onClick,
  children,
  style = {},
  className = "",
  icon = null,
}) {
  const getVariantStyles = () => {
    const baseStyle = {
      border: "none",
      padding: "0.75rem 1.5rem",
      fontSize: "0.9rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
      borderRadius: "8px",
      cursor: disabled || loading ? "not-allowed" : "pointer",
    };

    const variants = {
      primary: {
        ...baseStyle,
        backgroundColor: disabled || loading ? "#ccc" : COLORS.accent,
        color: "white",
      },
      secondary: {
        ...baseStyle,
        backgroundColor: disabled || loading ? "#f0f0f0" : "transparent",
        border: `2px solid ${COLORS.text}`,
        color: disabled || loading ? "#999" : COLORS.text,
      },
      danger: {
        ...baseStyle,
        backgroundColor: "#ef4444",
        color: "white",
      },
    };

    return variants[variant] || variants.primary;
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      style={{
        ...getVariantStyles(),
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          if (variant === "primary") {
            e.target.style.backgroundColor = "white";
            e.target.style.color = COLORS.accent;
            e.target.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.15)";
            e.target.style.transform = "translateY(-2px)";
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          if (variant === "primary") {
            e.target.style.backgroundColor = COLORS.accent;
            e.target.style.color = "white";
            e.target.style.boxShadow = "none";
            e.target.style.transform = "translateY(0)";
          }
        }
      }}
    >
      {icon && <i className={icon} style={{ marginRight: "0.5rem" }}></i>}
      {loading ? "Yükleniyor..." : children}
    </button>
  );
}
