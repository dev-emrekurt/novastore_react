import { COLORS } from "../constants/color";
import Main from "../components/Main";
import { testimonials, products } from "../data/products";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

/**
 * Ana sayfa özellikleri
 * Müşterilere sunulan hizmetler ve avantajlar
 */
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
      {/* Hero Section */}
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
          {/* Decorative Background Shapes */}
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

          {/* Content */}
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
            <Link
              to="/products"
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="primary"
                icon="bi bi-arrow-right"
                style={{ fontSize: "1rem", padding: "12px 30px" }}
              >
                Alışverişe Başla
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
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
              <Card hoverable={true} style={{ height: "100%" }}>
                {/* Feature Icon */}
                <div style={{ fontSize: "3rem", marginBottom: "1rem", textAlign: "center" }}>
                  {feature.icon}
                </div>

                {/* Feature Title */}
                <h5 className="fw-bold mb-2 text-center" style={{ color: COLORS.text }}>
                  {feature.title}
                </h5>

                {/* Feature Description */}
                <p
                  className="mb-0 text-center"
                  style={{
                    color: COLORS.text,
                    opacity: 0.8,
                    fontSize: "0.95rem",
                  }}
                >
                  {feature.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Main>
  );
}
