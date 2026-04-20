/**
 * Empty State Component
 * Hiçbir veri olmadığında gösterilecek görselle beraber mesaj
 * 
 * @param {string} icon - Bootstrap icon class
 * @param {string} title - Başlık
 * @param {string} description - Açıklama
 * @param {object} action - Optional action button { label, onClick }
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
      {/* Icon */}
      <i
        className={`bi ${icon}`}
        style={{
          fontSize: "4rem",
          color: COLORS.accent,
          marginBottom: "1rem",
          display: "block",
        }}
      ></i>

      {/* Title */}
      <h3 style={{ color: COLORS.text, marginBottom: "1rem", marginTop: 0 }}>
        {title}
      </h3>

      {/* Description */}
      <p style={{ color: COLORS.text, fontSize: "1rem", marginBottom: "1.5rem", opacity: 0.8 }}>
        {description}
      </p>

      {/* Optional Action Button */}
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
