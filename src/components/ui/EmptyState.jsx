/**
 * Hiçbir veri olmadığında gösterilecek durum kartı
 * 
 * @param {string} icon - Bootstrap ikon class
 * @param {string} title - Başlık
 * @param {string} description - Açıklama metni
 * @param {object} action - Opsiyonel aksiyon butonu { label, onClick }
 */

import { COLORS } from "../../constants/color";
import Button from "./Button";

export default function EmptyState({ icon, title, description, action = null }) {
  return (
    <div
      className="text-center"
      style={{
        backgroundColor: COLORS.secondary,
        borderRadius: "12px",
        padding: "4rem 2rem",
        border: `2px solid ${COLORS.text}`,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* İkon */}
      <i
        className={`bi ${icon}`}
        style={{
          fontSize: "4rem",
          color: COLORS.accent,
          marginBottom: "1rem",
          display: "block",
        }}
      ></i>

      {/* Başlık */}
      <h3 style={{ color: COLORS.text, marginBottom: "1rem", marginTop: 0 }}>
        {title}
      </h3>

      {/* Açıklama */}
      <p style={{ color: COLORS.text, fontSize: "1rem", marginBottom: "1.5rem", opacity: 0.8 }}>
        {description}
      </p>

      {/* Opsiyonel Aksiyon Butonu */}
      {action && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <Button
            variant="primary"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}
