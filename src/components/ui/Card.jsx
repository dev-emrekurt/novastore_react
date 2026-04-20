/**
 * Reusable Card Component
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
        backgroundColor: "white",
        borderRadius: "12px",
        border: `1px solid #e0e0e0`,
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
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          {header}
        </div>
      )}

      {/* Main content */}
      <div style={{ padding: "1.5rem" }}>
        {children}
      </div>

      {/* Footer bölümü */}
      {footer && (
        <div
          style={{
            backgroundColor: `${COLORS.accent}10`,
            padding: "1.5rem",
            borderTop: `2px solid ${COLORS.accent}`,
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
