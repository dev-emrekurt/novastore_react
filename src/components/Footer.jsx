import { COLORS } from "../constants/color";
import LogoSVG from "./LogoSVG";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: COLORS.primary,
        color: COLORS.text,
        borderTop: `1px solid ${COLORS.text}`,
      }}
    >
      {/* Ana Footer İçeriği */}
      <div className="container py-5">
        <div className="row mb-4">
          {/* Şirket Hakkında */}
          <div className="col-md-4 mb-4 mb-md-0 text-center text-md-start">
            <h5
              className="fw-bold mb-3"
              style={{ color: COLORS.text, fontSize: "1.1rem" }}
            >
             <LogoSVG width="40" height="40" /> NovaStore
            </h5>
            <p
              style={{ fontSize: "0.875rem", opacity: 0.9, lineHeight: "1.6" }}
            >
              Kaliteli ürünler ve mükemmel müşteri hizmetini bir araya getiren
              e-ticaret platformu.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div className="col-md-4 mb-4 mb-md-0 text-center">
            <h5
              className="fw-bold mb-3"
              style={{ color: COLORS.text, fontSize: "1.1rem" }}
            >
              Hızlı Linkler
            </h5>
            <ul
              className="list-unstyled"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <li className="mb-2">
                <Link
                  to="/"
                  style={{
                    color: COLORS.text,
                    opacity: 0.85,
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = COLORS.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = COLORS.text;
                  }}
                >
                  Ana Sayfa
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/products"
                  style={{
                    color: COLORS.text,
                    opacity: 0.85,
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = COLORS.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = COLORS.text;
                  }}
                >
                  Ürünler
                </Link>
              </li>
              
            </ul>
          </div>

          {/* İletişim & Sosyal Medya */}
          <div className="col-md-4 text-center">
            <h5
              className="fw-bold mb-3"
              style={{ color: COLORS.text, fontSize: "1.1rem" }}
            >
              Bize Ulaşın
            </h5>
            <p
              style={{
                fontSize: "0.875rem",
                opacity: 0.9,
                marginBottom: "1rem",
                lineHeight: "1.8",
              }}
            >
              <a
                href="mailto:info@novastore.com"
                style={{
                  color: COLORS.text,
                  opacity: 0.85,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  display: "block",
                  marginBottom: "0.5rem",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = COLORS.text;
                }}
              >
                info@novastore.com
              </a>
              <a
                href="tel:+905331234567"
                style={{
                  color: COLORS.text,
                  opacity: 0.85,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  display: "block",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = COLORS.text;
                }}
              >
                +90 (533) 123-4567
              </a>
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <a
                href="#"
                style={{
                  color: COLORS.secondary,
                  backgroundColor: COLORS.text,
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.text;
                }}
              >
                f
              </a>
              <a
                href="#"
                style={{
                  color: COLORS.secondary,
                  backgroundColor: COLORS.text,
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.text;
                }}
              >
                𝕏
              </a>
              <a
                href="#"
                style={{
                  color: COLORS.secondary,
                  backgroundColor: COLORS.text,
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.text;
                }}
              >
                in
              </a>
            </div>
          </div>
        </div>

        {/* Ayırıcı Çizgi */}
        <hr style={{ opacity: 0.3, borderColor: COLORS.text }} />

        {/* Alt Footer */}
        <div className="text-center pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p
            style={{
              fontSize: "0.875rem",
              opacity: 0.85,
              marginBottom: "1rem",
            }}
          >
            © 2026{" "}
            <a
              href="#"
              style={{
                color: COLORS.text,
                fontWeight: "bold",
                textDecoration: "none",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.color = COLORS.accent;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = COLORS.text;
              }}
            >
              NovaStore
            </a>
            . Tüm hakları saklıdır.
          </p>
          <div style={{ marginBottom: "1rem" }}>
            <a
              href="#"
              style={{
                color: COLORS.text,
                opacity: 0.8,
                textDecoration: "none",
                marginRight: "2rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = COLORS.accent;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = COLORS.text;
              }}
            >
              Gizlilik Politikası
            </a>
            <a
              href="#"
              style={{
                color: COLORS.text,
                opacity: 0.8,
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = "1";
                e.target.style.color = COLORS.accent;
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = "1";
                e.target.style.color = COLORS.text;
              }}
            >
              Kullanım Şartları
            </a>
          </div>
          <p style={{ fontSize: "0.875rem", opacity: 0.85, marginBottom: 0 }}>
            👨‍💻{" "}
            <a
              href="https://www.linkedin.com/in/dev-emrekurt/"
              style={{
                color: COLORS.text,
                textDecoration: "none",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = COLORS.accent;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = COLORS.text;
              }}
            >
              Emre Kurt
            </a>{" "}
            tarafından geliştirildi
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
