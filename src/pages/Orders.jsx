import { useState, useEffect } from "react";
import { COLORS } from "../constants/color";
import Main from "../components/Main";
import getOrdersService from "../services/getOrdersService";
import logger from "../utils/logger";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import Card from "../components/ui/Card";
import { formatPrice, formatDateTime } from "../utils/formatters";
import { getUser } from "../utils/storage";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Kullanıcının siparişlerini API'den getir
   */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // localStorage'dan user bilgisini al
        const userData = getUser();
        if (userData) {
          setUser(userData);
          logger.debug("📋 User Data Loaded", userData);

          // Customer ID var mı kontrol et
          if (userData.customer_id) {
            logger.info(`🔄 Fetching Orders (Customer ID: ${userData.customer_id})`);
            // API'den siparişleri getir
            const ordersData = await getOrdersService.getOrdersByCustomerId(userData.customer_id);
            logger.success("✅ Orders Fetched Successfully", ordersData);

            // Response'un yapısını kontrol et - farklı formatları handle et
            let ordersList = [];
            if (Array.isArray(ordersData)) {
              ordersList = ordersData;
            } else if (ordersData?.orders && Array.isArray(ordersData.orders)) {
              ordersList = ordersData.orders;
            } else if (ordersData?.data && Array.isArray(ordersData.data)) {
              ordersList = ordersData.data;
            } else {
              ordersList = [ordersData];
            }

            // Siparişleri günümüzden geçmişe doğru sırala (yeni siparişler en üstte)
            const sortedOrders = ordersList.sort((a, b) => {
              const dateA = new Date(a.orderDate || 0);
              const dateB = new Date(b.orderDate || 0);
              return dateB - dateA;
            });

            logger.info("📊 Orders Sorted (Newest First)", sortedOrders.map(o => ({ orderId: o.orderId, orderDate: o.orderDate })));
            setOrders(sortedOrders);
          } else {
            const errorMsg = "Müşteri ID bulunamadı. Lütfen yeniden giriş yapınız.";
            logger.warning("⚠️ Customer ID Missing", userData);
            setError(errorMsg);
          }
        } else {
          const errorMsg = "Kullanıcı bilgisi bulunamadı.";
          logger.warning("⚠️ User Data Not Found");
          setError(errorMsg);
        }
      } catch (err) {
        logger.error("❌ Error Loading Orders", err);
        setError(err.message || "Siparişler yüklenemedi");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "calc(100vh - 200px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <LoadingSpinner message="Siparişleriniz yükleniyor..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Main>
        <div className="col-12">
          <EmptyState
            icon="bi-exclamation-circle"
            title="Hata"
            description={error}
          />
        </div>
      </Main>
    );
  }

  return (
    <Main>
      <div className="col-12">
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <h1 style={{ color: COLORS.text, marginBottom: "0.5rem", fontSize: "2.5rem", fontWeight: "700" }}>
            <i className="bi bi-bag-check"></i> Geçmiş Siparişlerim
          </h1>
          <p style={{ color: "#666", margin: 0 }}>{orders.length} sipariş</p>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <EmptyState
            icon="bi-inbox"
            title="Siparış Bulunmuyor"
            description="Henüz bir sipariş vermemişsiniz. Alışveriş yapmaya başlamak için ürünlere göz atın!"
          />
        ) : (
          /* Orders List */
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {orders.map((order, index) => (
              <Card
                key={index}
                header={
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                        <h4 style={{ color: COLORS.text, margin: 0, fontWeight: "700", fontSize: "1.3rem" }}>
                          Sipariş #{order.orderId || index + 1}
                        </h4>
                        <span
                          style={{
                            backgroundColor: COLORS.accent,
                            color: "white",
                            padding: "0.35rem 0.75rem",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            fontWeight: "700",
                            textTransform: "uppercase",
                          }}
                        >
                          {order.status || "Tamamlandı"}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                        {/* Order Date */}
                        <div>
                          <p style={{ color: "#999", fontSize: "0.75rem", margin: "0.25rem 0", fontWeight: "600", textTransform: "uppercase" }}>
                            TARİH
                          </p>
                          <p style={{ color: COLORS.text, fontSize: "0.95rem", margin: 0, fontWeight: "600" }}>
                            {formatDateTime(order.orderDate)}
                          </p>
                        </div>

                        {/* Customer ID */}
                        <div>
                          <p style={{ color: "#999", fontSize: "0.75rem", margin: "0.25rem 0", fontWeight: "600", textTransform: "uppercase" }}>
                            MÜŞTERI ID
                          </p>
                          <p style={{ color: COLORS.text, fontSize: "0.95rem", margin: 0, fontWeight: "600" }}>
                            #{order.customerId}
                          </p>
                        </div>

                        {/* Item Count */}
                        <div>
                          <p style={{ color: "#999", fontSize: "0.75rem", margin: "0.25rem 0", fontWeight: "600", textTransform: "uppercase" }}>
                            ÜRÜN SAYISI
                          </p>
                          <p style={{ color: COLORS.text, fontSize: "0.95rem", margin: 0, fontWeight: "600" }}>
                            {order.items?.length || 0} ürün
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                footer={
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ color: "#999", fontSize: "0.75rem", margin: "0 0 0.5rem 0", fontWeight: "600", textTransform: "uppercase" }}>
                        Sipariş Toplamı
                      </p>
                      <p style={{ margin: 0, color: COLORS.accent, fontWeight: "700", fontSize: "1.4rem" }}>
                        {formatPrice(order.totalAmount)}
                      </p>
                    </div>
                  </div>
                }
              >
                {/* Order Items */}
                <div>
                  <h5 style={{ color: COLORS.text, marginBottom: "1rem", fontWeight: "700", fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <i className="bi bi-bag-check" style={{ color: COLORS.accent }}></i>
                    Siparişin Ürünleri
                  </h5>

                  {order.items && order.items.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "2fr 1fr 1fr 1fr",
                            gap: "1rem",
                            padding: "1rem 0",
                            borderBottom: idx < order.items.length - 1 ? `1px solid #f0f0f0` : "none",
                            alignItems: "center",
                          }}
                        >
                          {/* Product Name */}
                          <div>
                            <p style={{ margin: 0, color: COLORS.text, fontWeight: "600", fontSize: "0.95rem" }}>
                              {item.productName || "Ürün"}
                            </p>
                            <p style={{ margin: "0.25rem 0 0 0", color: "#999", fontSize: "0.8rem" }}>
                              Ürün ID: {item.productId}
                            </p>
                          </div>

                          {/* Price */}
                          <div style={{ textAlign: "center" }}>
                            <p style={{ color: "#999", fontSize: "0.75rem", margin: "0 0 0.25rem 0", fontWeight: "600", textTransform: "uppercase" }}>
                              Fiyat
                            </p>
                            <p style={{ margin: 0, color: COLORS.text, fontWeight: "600" }}>
                              {formatPrice(item.price)}
                            </p>
                          </div>

                          {/* Quantity */}
                          <div style={{ textAlign: "center" }}>
                            <p style={{ color: "#999", fontSize: "0.75rem", margin: "0 0 0.25rem 0", fontWeight: "600", textTransform: "uppercase" }}>
                              Miktar
                            </p>
                            <p style={{ margin: 0, color: COLORS.text, fontWeight: "600", backgroundColor: COLORS.secondary, padding: "0.35rem 0.75rem", borderRadius: "6px", display: "inline-block" }}>
                              {item.quantity}x
                            </p>
                          </div>

                          {/* Subtotal */}
                          <div style={{ textAlign: "right" }}>
                            <p style={{ color: "#999", fontSize: "0.75rem", margin: "0 0 0.25rem 0", fontWeight: "600", textTransform: "uppercase" }}>
                              Toplam
                            </p>
                            <p style={{ margin: 0, color: COLORS.accent, fontWeight: "700", fontSize: "1.05rem" }}>
                              {formatPrice(item.subtotal || (item.price * item.quantity))}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: "#999", margin: 0 }}>Bu siparişte ürün bulunmuyor</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Main>
  );
}
