/**
 * Standart kartlar için wrapper - başlık, içerik, footer opsiyonları ile
 * 
 * @param {object} children - Card içeriği
 * @param {object} header - Başlık bölümü
 * @param {object} footer - Alt bölümü
 * @param {boolean} hoverable - Hover efektleri
 */

import { COLORS } from "../../constants/color";

export default function Card({
  children,
  header = null,
  footer = null,
  hoverable = true,
  style = {},
}) {
  return (
    <div
      style={{
        backgroundColor: COLORS.secondary,
        borderRadius: "12px",
        border: `2px solid ${COLORS.text}`,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        transition: hoverable ? "all 0.3s ease" : "none",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (hoverable) {
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.1)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable) {
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
          e.currentTarget.style.transform = "translateY(0)";
        }
      }}
    >
      {/* Header bölümü */}
      {header && (
        <div
          style={{
            backgroundColor: `${COLORS.primary}15`,
            padding: "1.5rem",
            borderBottom: `1px solid ${COLORS.text}`,
          }}
        >
          {header}
        </div>
      )}

      {/* Main bölümü */}
      <div style={{ padding: "1.5rem" }}>
        {children}
      </div>

      {/* Footer bölümü */}
      {footer && (
        <div
          style={{
            backgroundColor: `${COLORS.accent}10`,
            padding: "1.5rem",
            borderTop: `2px solid ${COLORS.text}`,
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
