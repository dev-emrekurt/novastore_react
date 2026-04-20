import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { COLORS } from "../constants/color";
import LogoSVG from "./LogoSVG";
import AuthModal from "../features/auth/AuthModal";
import logger from "../utils/logger";
import Button from "./ui/Button";
import { clearAllStorage, getUser } from "../utils/storage";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authModal, setAuthModal] = useState({ show: true, type: "login" });
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutNotification, setLogoutNotification] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    // localStorage'dan user bilgisini al
    const userData = getUser();
    if (userData) {
      logger.debug("👤 User Loaded from Storage", userData);
      setUser(userData);
      setAuthModal({ show: false, type: null });
    }
  }, []);

  /**
   * Dropdown dışında click yapıldığında dropdown'ı kapat
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Dropdown açık ise click listener'ı ekle
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [dropdownOpen]);

  const menuItems = [
    { id: "home", label: "ANASAYFA", href: "/" },
    { id: "products", label: "ÜRÜNLERİMİZ", href: "/products" }
  ];

  const isActive = (href) => location.pathname === href;

  const openAuthModal = (type) => {
    setAuthModal({ show: true, type });
  };

  const closeAuthModal = () => {
    setAuthModal({ show: false, type: null });
  };

  /**
   * Kullanıcıyı oturumdan çıkart
   */
  const handleLogout = () => {
    setLogoutNotification(true);
    setTimeout(() => {
      logger.authLogout();
      clearAllStorage();
      setUser(null);
      setDropdownOpen(false);
      setAuthModal({ show: true, type: "login" });
      setLogoutNotification(false);
      navigate("/");
    }, 800);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light sticky-top"
      style={{
        backgroundColor: COLORS.background,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        borderBottom: `1px solid ${COLORS.text}`,
        position: "relative",
      }}
    >
      <div className="container-fluid px-4 d-flex align-items-center">
        {/* Logo ve Brand - Sol */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2 flex-shrink-0"
          to="/"
          style={{ color: COLORS.text }}
        >
          <LogoSVG width="45" height="45" />
          <span className="fw-bold" style={{ fontSize: "1.25rem", color: COLORS.text }}>
            NovaStore
          </span>
        </Link>

        {/* Navbar Collapse - Menu Items (Desktop - Ortada / Mobile - Hamburger açıldığında) */}
        <div 
          className={`d-none d-lg-flex collapse navbar-collapse ${isOpen ? "show" : ""}`} 
          id="navbarNav"
          style={{
            position: "static",
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            zIndex: "auto",
            padding: "0",
            flex: "1",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
        >
          {/* Menu Items */}
          <ul 
            className="navbar-nav" 
            style={{ 
              flexDirection: "row",
              gap: "1rem",
              width: isOpen ? "100%" : "auto",
              margin: 0,
            }}
          >
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item w-100">
                <Link
                  className={`nav-link fw-semibold ${isActive(item.href) ? "active" : ""}`}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: isActive(item.href) ? COLORS.accent : COLORS.text,
                    transition: "all 0.3s ease",
                    fontWeight: isActive(item.href) ? "700" : "600",
                    fontSize: "0.95rem",
                    padding: "0.5rem 0.75rem",
                    border: "none",
                    borderBottom: isActive(item.href) ? `3px solid ${COLORS.accent}` : "3px solid transparent",
                    backgroundColor: "transparent",
                    width: "auto",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = COLORS.accent;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.href)) {
                      e.target.style.color = COLORS.text;
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Responsive Mobile Menu - Only shows on mobile when hamburger is clicked */}
        {isOpen && (
          <div
            className="d-lg-none"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: COLORS.secondary,
              borderTop: `2px solid ${COLORS.text}`,
              borderBottom: `2px solid ${COLORS.text}`,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              zIndex: 999,
              padding: "1rem 0",
              width: "100%",
            }}
          >
            <ul 
              className="navbar-nav"
              style={{
                flexDirection: "column",
                gap: 0,
                width: "100%",
                margin: 0,
                padding: 0,
              }}
            >
              {menuItems.map((item) => (
                <li key={`mobile-${item.id}`} className="nav-item w-100">
                  <Link
                    className={`nav-link fw-semibold ${isActive(item.href) ? "active" : ""}`}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      color: isActive(item.href) ? COLORS.accent : COLORS.text,
                      transition: "all 0.3s ease",
                      fontWeight: isActive(item.href) ? "700" : "600",
                      fontSize: "0.95rem",
                      padding: "0.75rem 1.5rem",
                      borderLeft: isActive(item.href) ? `4px solid ${COLORS.accent}` : "4px solid transparent",
                      backgroundColor: isActive(item.href) ? COLORS.background : "transparent",
                      width: "100%",
                      display: "block",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = COLORS.background;
                      e.target.style.color = COLORS.accent;
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(item.href)) {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = COLORS.text;
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Toggle Button + Action Buttons Container (Sağ taraf) */}
        <div className="d-flex gap-2 align-items-center flex-shrink-0 ms-auto">
          {/* Responsive Toggle Button */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              color: COLORS.text,
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Action Buttons - Cart & User (Daima Görünür) */}
          {user ? (
            <>
              {/* Cart Button */}
              <Link
                to="/cart"
                className="btn fw-semibold d-flex align-items-center gap-2"
                style={{
                  color: COLORS.text,
                  backgroundColor: "transparent",
                  border: `2px solid ${COLORS.text}`,
                  transition: "all 0.3s ease",
                  padding: "8px 12px",
                  fontSize: "0.85rem",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.text;
                  e.currentTarget.style.color = COLORS.background;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = COLORS.text;
                }}
              >
                <i className="bi bi-cart3"></i>
                <span className="d-none d-lg-inline">Sepetim</span>
              </Link>

              {/* User Dropdown */}
              <div style={{ position: "relative" }} ref={dropdownRef}>
                <button
                  className="btn fw-semibold d-flex align-items-center gap-2"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    color: "white",
                    backgroundColor: COLORS.accent,
                    border: `2px solid ${COLORS.accent}`,
                    transition: "all 0.3s ease",
                    padding: "8px 12px",
                    fontSize: "0.85rem",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = COLORS.accent;
                  }}
                  onMouseLeave={(e) => {
                    if (!dropdownOpen) {
                      e.currentTarget.style.backgroundColor = COLORS.accent;
                      e.currentTarget.style.color = "white";
                    }
                  }}
                >
                  <i className="bi bi-person-fill"></i>
                  <span className="d-none d-lg-inline">{user.full_name}</span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      backgroundColor: COLORS.secondary,
                      border: `2px solid ${COLORS.text}`,
                      borderRadius: "8px",
                      marginTop: "0.5rem",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      zIndex: 1000,
                      minWidth: "200px",
                    }}
                  >
                    <div
                      style={{
                        padding: "0.75rem 1rem",
                        borderBottom: `1px solid ${COLORS.text}`,
                        fontSize: "0.85rem",
                        color: COLORS.text,
                      }}
                    >
                      <p style={{ marginBottom: "0.25rem", fontWeight: "600" }}>
                        {user.full_name || "Kullanıcı"}
                      </p>
                      <p style={{ marginBottom: 0, opacity: 0.7 }}>
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/orders"
                      onClick={() => setDropdownOpen(false)}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        backgroundColor: "transparent",
                        border: "none",
                        color: COLORS.text,
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontSize: "0.85rem",
                        display: "block",
                        textDecoration: "none",
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
                      <i className="bi bi-bag-check" style={{ marginRight: "0.5rem" }}></i>
                      Geçmiş Siparişlerim
                    </Link>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        backgroundColor: "transparent",
                        border: "none",
                        color: COLORS.text,
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontSize: "0.85rem",
                        borderTop: `1px solid ${COLORS.text}`,
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
                      <i className="bi bi-box-arrow-right" style={{ marginRight: "0.5rem" }}></i>
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                className="btn fw-semibold d-flex align-items-center gap-2"
                onClick={() => openAuthModal("signup")}
                style={{
                  color: COLORS.text,
                  backgroundColor: "transparent",
                  border: `2px solid ${COLORS.text}`,
                  transition: "all 0.3s ease",
                  padding: "8px 12px",
                  fontSize: "0.85rem",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.text;
                  e.currentTarget.style.color = COLORS.background;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = COLORS.text;
                }}
              >
                <i className="bi bi-person-plus"></i>
                <span className="d-none d-lg-inline">Hesap Oluştur</span>
              </button>
              <button
                className="btn fw-semibold d-flex align-items-center gap-2"
                onClick={() => openAuthModal("login")}
                style={{
                  color: "white",
                  backgroundColor: COLORS.accent,
                  border: `2px solid ${COLORS.accent}`,
                  transition: "all 0.3s ease",
                  padding: "8px 12px",
                  fontSize: "0.85rem",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = COLORS.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.accent;
                  e.currentTarget.style.color = "white";
                }}
              >
                <i className="bi bi-box-arrow-in-right"></i>
                <span className="d-none d-lg-inline">Giriş Yap</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        show={authModal.show}
        type={authModal.type}
        onClose={closeAuthModal}
      />

      {/* Logout Notification */}
      {logoutNotification && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            zIndex: 10000,
            textAlign: "center",
            animation: "fadeInScale 0.3s ease",
          }}
        >
          <i
            className="bi bi-check-circle"
            style={{
              fontSize: "3rem",
              color: COLORS.accent,
              display: "block",
              marginBottom: "1rem",
              animation: "spin 0.8s ease-in-out",
            }}
          ></i>
          <p style={{ color: COLORS.text, fontWeight: "600", marginBottom: 0, fontSize: "1.1rem" }}>
            Çıkış yapılıyor...
          </p>
        </div>
      )}

      {/* Overlay for Logout */}
      {logoutNotification && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        ></div>
      )}

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </nav>
  );
}

export default NavBar;
