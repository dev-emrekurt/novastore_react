import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../constants/color";
import setOrderService from "../services/setOrderService";
import logger from "../utils/logger";
import Button from "../components/ui/Button";
import Toast from "../components/ui/Toast";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { formatPrice } from "../utils/formatters";
import { saveCart, getCart, clearCart } from "../utils/storage";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage'dan sepet verilerini al
    const cart = getCart();
    logger.debug("🛒 Cart Loaded", cart);
    setCartItems(cart);
    setLoading(false);
  }, []);

  /**
   * Sepetten ürün kaldır
   * @param {number} productId - Silinecek ürün ID'si
   */
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.ProductID !== productId);
    setCartItems(updatedCart);
    saveCart(updatedCart);
    logger.info(`🗑️ Item Removed from Cart: ${productId}`);
  };

  /**
   * Ürünün miktar değerini güncelle
   * @param {number} productId - Ürün ID'si
   * @param {number} newQuantity - Yeni miktar
   */
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.ProductID === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    saveCart(updatedCart);
    logger.debug(`📝 Quantity Updated: ${productId} → ${newQuantity}`);
  };

  /**
   * Sepet toplamı fiyatı hesapla
   * @returns {number} - Toplam fiyat
   */
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.Price) * (item.quantity || 1)), 0);
  };

  /**
   * Sepetten sipariş oluştur
   * User kontrol → Cart kontrol → API çağrısı → Redirect
   */
  const handleCreateOrder = async () => {
    try {
      setIsCreatingOrder(true);
      setNotification(null);
      
      // User kontrolü
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        logger.warning("⚠️ User Not Found for Order Creation");
        setNotification({
          type: "error",
          message: "Siparişi oluşturmak için lütfen giriş yapınız.",
        });
        setIsCreatingOrder(false);
        return;
      }

      // Sepet kontrolü
      if (cartItems.length === 0) {
        logger.warning("⚠️ Empty Cart");
        setNotification({
          type: "error",
          message: "Sepetiniz boş. Lütfen ürün ekleyiniz.",
        });
        setIsCreatingOrder(false);
        return;
      }

      logger.info("🛒 Creating Order", { itemCount: cartItems.length, total: getTotalPrice() });
      
      // Siparişi oluştur
      const response = await setOrderService.createOrderFromCart();
      
      logger.success("✅ Order Created Successfully", response);
      setNotification({
        type: "success",
        message: "Siparişiniz başarıyla oluşturuldu!",
      });
      
      // Sepeti boşalt
      setCartItems([]);
      clearCart();
      
      // 2 saniye sonra geçmiş siparişlere yönlendir
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } catch (error) {
      logger.error("❌ Failed to Create Order", error);
      setNotification({
        type: "error",
        message: `Hata: ${error.message}`,
      });
    } finally {
      setIsCreatingOrder(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "calc(100vh - 200px)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: COLORS.secondary }}>
        <LoadingSpinner message="Sepet yükleniyor..." size="large" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "calc(100vh - 200px)", backgroundColor: COLORS.secondary, paddingTop: "2rem", paddingBottom: "3rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <h1 style={{ color: COLORS.text, marginBottom: "0.5rem", fontSize: "2.5rem", fontWeight: "700" }}>
            <i className="bi bi-cart3"></i> Alışveriş Sepeti
          </h1>
          <p style={{ color: "#666", margin: 0 }}>{cartItems.length} ürün</p>
        </div>

        {/* Empty State */}
        {cartItems.length === 0 ? (
          <EmptyState
            icon="bi-cart-x"
            title="Sepetiniz Boş"
            description="Alışveriş yapmaya başlamak için ürünlere göz atın!"
            action={{
              label: "Ürünleri İncele",
              onClick: () => navigate("/products"),
            }}
          />
        ) : (
          /* Cart Items + Summary */
          <div className="row g-4">
            {/* Cart Items Column */}
            <div className="col-lg-8">
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {cartItems.map((item) => (
                  <Card
                    key={item.ProductID}
                    hoverable={true}
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      alignItems: "center",
                    }}
                  >
                    {/* Product Image */}
                    {item.image && (
                      <div
                        style={{
                          width: "100px",
                          height: "100px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: COLORS.secondary,
                          borderRadius: "8px",
                          fontSize: "2.5rem",
                          flexShrink: 0,
                        }}
                      >
                        {item.image}
                      </div>
                    )}

                    {/* Product Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h5 style={{ color: COLORS.text, marginBottom: "0.5rem", fontWeight: "600" }}>
                        {item.ProductName}
                      </h5>
                      <p style={{ color: "#999", fontSize: "0.9rem", margin: 0, marginBottom: "0.75rem" }}>
                        Ürün ID: {item.ProductID}
                      </p>

                      <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
                        {/* Price */}
                        <span style={{ color: COLORS.accent, fontWeight: "700", fontSize: "1.25rem" }}>
                          {formatPrice(item.Price)}
                        </span>

                        {/* Quantity Controls */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#f5f5f5", borderRadius: "8px", padding: "0.25rem" }}>
                          <button
                            onClick={() => updateQuantity(item.ProductID, (item.quantity || 1) - 1)}
                            style={{
                              backgroundColor: "transparent",
                              color: COLORS.text,
                              border: "none",
                              padding: "0.4rem 0.6rem",
                              fontSize: "1.1rem",
                              transition: "all 0.2s ease",
                              cursor: "pointer",
                            }}
                            title="Miktarı azalt"
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = COLORS.accent;
                              e.target.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "transparent";
                              e.target.style.color = COLORS.text;
                            }}
                          >
                            −
                          </button>
                          <span style={{ minWidth: "35px", textAlign: "center", color: COLORS.text, fontWeight: "600" }}>
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.ProductID, (item.quantity || 1) + 1)}
                            style={{
                              backgroundColor: "transparent",
                              color: COLORS.text,
                              border: "none",
                              padding: "0.4rem 0.6rem",
                              fontSize: "1.1rem",
                              transition: "all 0.2s ease",
                              cursor: "pointer",
                            }}
                            title="Miktarı arttır"
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = COLORS.accent;
                              e.target.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "transparent";
                              e.target.style.color = COLORS.text;
                            }}
                          >
                            +
                          </button>
                        </div>

                        {/* Subtotal */}
                        <span style={{ color: COLORS.accent, fontWeight: "600", fontSize: "1rem" }}>
                          Toplam: {formatPrice(parseFloat(item.Price) * (item.quantity || 1))}
                        </span>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeFromCart(item.ProductID)}
                      style={{
                        backgroundColor: "transparent",
                        color: "#dc3545",
                        border: "none",
                        fontSize: "1.3rem",
                        padding: "0.5rem",
                        transition: "all 0.2s ease",
                        flexShrink: 0,
                        cursor: "pointer",
                      }}
                      title="Sepetten kaldır"
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#fff5f5";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-lg-4">
              <Card
                header={<h4 style={{ margin: 0, color: COLORS.text }}>Sipariş Özeti</h4>}
                style={{
                  position: "sticky",
                  top: "90px",
                }}
              >
                {/* Items Count */}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <span style={{ color: "#666" }}>Ürün Sayısı:</span>
                  <span style={{ color: COLORS.text, fontWeight: "600" }}>
                    {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                  </span>
                </div>

                {/* Subtotal */}
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "1rem", borderBottom: "1px solid #e0e0e0", marginBottom: "1rem" }}>
                  <span style={{ color: "#666" }}>Ara Toplam:</span>
                  <span style={{ color: COLORS.accent, fontWeight: "600" }}>
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>

                {/* Shipping */}
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "1rem", borderBottom: "1px solid #e0e0e0", marginBottom: "1rem" }}>
                  <span style={{ color: "#666" }}>Kargo:</span>
                  <span style={{ color: COLORS.accent, fontWeight: "600" }}>Ücretsiz</span>
                </div>

                {/* Total */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "1.5rem",
                    marginBottom: "2rem",
                    borderBottom: `2px solid ${COLORS.accent}`,
                  }}
                >
                  <span style={{ color: COLORS.text, fontWeight: "700" }}>Toplam:</span>
                  <span style={{ color: COLORS.accent, fontWeight: "700", fontSize: "1.4rem" }}>
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>

                {/* Create Order Button */}
                <Button
                  variant="primary"
                  loading={isCreatingOrder}
                  disabled={cartItems.length === 0}
                  onClick={handleCreateOrder}
                  icon="bi bi-check-circle"
                  style={{ width: "100%" }}
                >
                  Sipariş Oluştur
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          duration={3000}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default Cart;
