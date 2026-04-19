import { COLORS } from "../constants/color";
import Main from "../components/Main";
import { testimonials, products } from "../data/products";
import { Link } from "react-router-dom";

const features = [
  {
    icon: "🚀",
    title: "Hızlı Teslimat",
    description: "48 saat içinde kapınıza ulaştırıyoruz",
  },
  {
    icon: "🛡️",
    title: "Güvenli Ödeme",
    description: "Tüm ödemeleriniz şifrelenmiş ve güvenlidir",
  },
  {
    icon: "💬",
    title: "7/24 Destek",
    description: "Müşteri hizmetimiz her zaman hazır",
  },
  {
    icon: "✓",
    title: "Kalite Garantisi",
    description: "Tüm ürünlerimiz %100 orijinaldir",
  },
];

export default function Home() {
  return (
    <Main>
      {/* Hero Bölümü */}
      <div className="col-12">
        <div
          style={{
            background: `radial-gradient(circle, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
            color: COLORS.text,
            padding: "4rem 2rem",
            borderRadius: "12px",
            textAlign: "center",
            marginBottom: "3rem",
            position: "relative",
            overflow: "hidden",
            minHeight: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `2px solid ${COLORS.text}`,
          }}
        >
          {/* Dekoratif Arka Planda Şekiller */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "300px",
              height: "300px",
              backgroundColor: `${COLORS.secondary}`,
              borderRadius: "50%",
              opacity: 0.3,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "-80px",
              left: "-80px",
              width: "200px",
              height: "200px",
              backgroundColor: `${COLORS.accent}`,
              borderRadius: "50%",
              opacity: 0.2,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "10%",
              width: "150px",
              height: "150px",
              border: `3px solid ${COLORS.secondary}`,
              borderRadius: "50%",
              opacity: 0.15,
            }}
          ></div>

          {/* İçerik */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <h1
              className="display-4 fw-bold mb-3"
              style={{ color: COLORS.text }}
            >
              NovaStore'a Hoşgeldiniz
            </h1>
            <p
              className="lead mb-4"
              style={{ color: COLORS.text, opacity: 0.95 }}
            >
              Kaliteli ürünler, harika fiyatlar ve mükemmel müşteri hizmetiyle
              sizin için buradayız.
            </p>
            <button
              className="btn btn-lg fw-bold"
              style={{
                backgroundColor: COLORS.accent,
                color: "white",
                border: `2px solid white`,
                padding: "12px 30px",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = COLORS.accent;
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = COLORS.accent;
                e.target.style.color = "white";
                e.target.style.transform = "scale(1)";
              }}
            >
              <Link
                to="/products"
                style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}
              >
                Alışverişe Başla
                <i className="bi bi-arrow-right"></i>
              </Link>
              
            </button>
          </div>
        </div>
      </div>

      {/* Özellikler Bölümü */}
      <div className="col-12 mb-5">
        <h2
          className="text-center fw-bold mb-5"
          style={{ color: COLORS.text, fontSize: "2rem" }}
        >
          Neden Bizi Seçmelisiniz?
        </h2>
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div
                className="p-4 rounded text-center h-100"
                style={{
                  backgroundColor: COLORS.secondary,
                  border: `2px solid ${COLORS.text}`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = `0 8px 20px rgba(0,0,0,0.15)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                  {feature.icon}
                </div>
                <h5 className="fw-bold mb-2" style={{ color: COLORS.text }}>
                  {feature.title}
                </h5>
                <p
                  className="mb-0"
                  style={{
                    color: COLORS.text,
                    opacity: 0.8,
                    fontSize: "0.95rem",
                  }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Main>
  );
}
