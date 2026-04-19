import { useState, useEffect } from "react";
import { COLORS } from "../../constants/color";
import authService from "../../services/authService";

function AuthModal({ show, type, onClose }) {
  const [currentType, setCurrentType] = useState(type);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Type prop değiştiğinde güncelle
  useEffect(() => {
    if (show) {
      setCurrentType(type);
      setStatus("");
    }
  }, [show, type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (currentType === "signup") {
      // Şifre uyuşması kontrolü
      if (formData.password !== formData.confirmPassword) {
        setStatus("Şifreler eşleşmiyor!");
        return;
      }

      if (formData.password.length < 6) {
        setStatus("Şifre en az 6 karakter olmalıdır!");
        return;
      }

      setLoading(true);
      setStatus("Kaydediliyor...");

      try {
        const result = await authService.register(
          formData.email,
          formData.password,
          formData.full_name
        );
        setStatus("✅ Kayıt başarılı! Giriş yapabilirsiniz.");
        console.log("Sunucu yanıtı:", result);
        
        setTimeout(() => {
          setFormData({ full_name: "", email: "", password: "", confirmPassword: "" });
          setStatus("");
          setLoading(false);
          setCurrentType("login");
        }, 1500);
      } catch (err) {
        setStatus(`❌ Hata: ${err.message}`);
        setLoading(false);
      }
    } else {
      // Login işlemi
      setLoading(true);
      setStatus("Giriş yapılıyor...");

      try {
        const result = await authService.login(
          formData.email,
          formData.password
        );
        setStatus("✅ Giriş başarılı!");
        console.log("Sunucu yanıtı:", result);
        
        // User bilgisini localStorage'a kaydet
        localStorage.setItem("user", JSON.stringify(result.user || { 
          email: formData.email, 
          full_name: formData.full_name 
        }));
        
        setTimeout(() => {
          setFormData({ full_name: "", email: "", password: "", confirmPassword: "" });
          setStatus("");
          setLoading(false);
          // Sayfayı yenile ki NavBar güncellensin
          window.location.reload();
        }, 1500);
      } catch (err) {
        setStatus(`❌ Hata: ${err.message}`);
        setLoading(false);
      }
    }
  };

  if (!show) return null;

  const isLogin = currentType === "login";

  const switchAuthType = () => {
    setCurrentType(isLogin ? "signup" : "login");
    setFormData({ full_name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: COLORS.secondary,
          borderRadius: "12px",
          padding: "2rem",
          maxWidth: "450px",
          width: "90%",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Başlık */}
        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          <h2
            className="fw-bold"
            style={{
              color: COLORS.text,
              fontSize: "30px",
              marginBottom: "0.5rem",
            }}
          >
            {isLogin ? "🔐 Giriş Yap" : "📝 Hesap Oluştur"}
          </h2>
          <p style={{ color: COLORS.primary, opacity: 0.8, marginBottom: 0 }}>
            {isLogin
              ? "Nova Store'a hoşgeldiniz"
              : "Bir hesap oluşturup alışverişe başlayın"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Ad-Soyad (Sadece Signup) */}
          {!isLogin && (
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: COLORS.text,
                  fontSize: "0.9rem",
                }}
              >
                Ad-Soyad
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Adınız ve Soyadınız"
                required={!isLogin}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: `2px solid ${COLORS.text}`,
                  borderRadius: "8px",
                  fontFamily: "Montserrat",
                  fontSize: "0.95rem",
                  boxSizing: "border-box",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = COLORS.accent;
                  e.target.style.boxShadow = `0 0 8px ${COLORS.accent}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = COLORS.primary;
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          )}

          {/* Email */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "600",
                color: COLORS.text,
                fontSize: "0.9rem",
              }}
            >
              E-mail Adresi
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ornek@mail.com"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: `2px solid ${COLORS.text}`,
                borderRadius: "8px",
                fontFamily: "Montserrat",
                fontSize: "0.95rem",
                boxSizing: "border-box",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = COLORS.accent;
                e.target.style.boxShadow = `0 0 8px ${COLORS.accent}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = COLORS.primary;
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Şifre */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "600",
                color: COLORS.text,
                fontSize: "0.9rem",
              }}
            >
              Şifre
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="En az 8 karakter"
              required
              minLength="6"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: `2px solid ${COLORS.text}`,
                borderRadius: "8px",
                fontFamily: "Montserrat",
                fontSize: "0.95rem",
                boxSizing: "border-box",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = COLORS.accent;
                e.target.style.boxShadow = `0 0 8px ${COLORS.accent}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = COLORS.primary;
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Şifre Onayla (Sadece Signup) */}
          {!isLogin && (
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: COLORS.text,
                  fontSize: "0.9rem",
                }}
              >
                Şifreyi Onayla
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Şifreyi tekrar girin"
                required={!isLogin}
                minLength="6"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: `2px solid ${COLORS.text}`,
                  borderRadius: "8px",
                  fontFamily: "Montserrat",
                  fontSize: "0.95rem",
                  boxSizing: "border-box",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = COLORS.accent;
                  e.target.style.boxShadow = `0 0 8px ${COLORS.accent}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = COLORS.primary;
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.875rem",
              backgroundColor: loading ? "#ccc" : COLORS.accent,
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "700",
              fontSize: "0.95rem",
              fontFamily: "Montserrat",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              marginBottom: "1rem",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = "#e6a300";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 12px rgba(220, 174, 29, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = COLORS.accent;
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }
            }}
          >
            {loading ? "⏳ İşleniyor..." : isLogin ? "🔓 Giriş Yap" : "✅ Hesap Oluştur"}
          </button>

          {/* Status Mesajı */}
          {status && (
            <div
              style={{
                padding: "0.75rem",
                marginBottom: "1rem",
                borderRadius: "8px",
                textAlign: "center",
                fontWeight: "600",
                backgroundColor: status.includes("❌") ? "#fee2e2" : "#dbeafe",
                color: status.includes("❌") ? "#dc2626" : "#0284c7",
                border: `2px solid ${status.includes("❌") ? "#fca5a5" : "#7dd3fc"}`,
              }}
            >
              {status}
            </div>
          )}

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            disabled
            style={{
              width: "100%",
              padding: "0.875rem",
              backgroundColor: "transparent",
              color: COLORS.text,
              border: `2px solid ${COLORS.text}`,
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "0.95rem",
              fontFamily: "Montserrat",
              cursor: "not-allowed",
              transition: "all 0.3s ease",
              opacity: 0.5,
              display: "none"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = COLORS.primary;
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = COLORS.text;
            }}
          >
            Kapat
          </button>
        </form>

        {/* Switch Modu */}
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <p
            style={{ color: COLORS.text, fontSize: "0.9rem", marginBottom: 0 }}
          >
            {isLogin ? (
              <>
                Hesabın yok mu?{" "}
                <button
                  type="button"
                  onClick={switchAuthType}
                  style={{
                    background: "none",
                    border: "none",
                    color: COLORS.accent,
                    fontWeight: "700",
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontSize: "inherit",
                  }}
                >
                  Hesap oluştur
                </button>
              </>
            ) : (
              <>
                Zaten hesabın var mı?{" "}
                <button
                  type="button"
                  onClick={switchAuthType}
                  style={{
                    background: "none",
                    border: "none",
                    color: COLORS.accent,
                    fontWeight: "700",
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontSize: "inherit",
                  }}
                >
                  Giriş yap
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
