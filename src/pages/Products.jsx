import { useEffect, useState } from "react";
import { COLORS } from "../constants/color";
import Main from "../components/Main";
import productsService from "../services/getProductsService";
import categoriesService from "../services/getCategoriesService";
import logger from "../utils/logger";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Toast from "../components/ui/Toast";
import EmptyState from "../components/ui/EmptyState";
import { formatPrice } from "../utils/formatters";
import { saveCart, getCart } from "../utils/storage";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);

  const filteredProducts = 
    activeCategory === 0 
      ? products 
      : products.filter(p => p.CategoryID === activeCategory);

  /**
   * Ürünleri ve kategorileri API'den getir
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Kategorileri getir
        const categoriesData = await categoriesService.getAllCategories();
        setCategories(categoriesData);
        logger.debug("📂 Categories Loaded", categoriesData);
        // Icon property'yi kontrol et
        if (categoriesData.length > 0) {
          logger.debug("🎨 Category Icon Sample", {
            Name: categoriesData[0].CategoryName,
            Icon: categoriesData[0].Icon,
            IconName: categoriesData[0].IconName,
            AllProps: categoriesData[0]
          });
        }

        // Ürünleri getir
        const productsData = await productsService.getAllProducts();
        setProducts(productsData);
        logger.debug("📦 Products Loaded", productsData);
      } catch (error) {
        logger.error("❌ Error Loading Products/Categories", error);
      }
    };
    fetchData();
  }, []);

  /**
   * Window resize dinle ve desktop/mobile durumunu track et
   */
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Ürünü sepete ekle
   * @param {object} product - Sepete eklenecek ürün
   */
  const addToCart = (product) => {
    try {
      // localStorage'dan mevcut sepeti al
      const cart = getCart();

      // Ürün zaten sepette var mı kontrol et
      const existingItem = cart.find(item => item.ProductID === product.ProductID);

      if (existingItem) {
        // Varsa miktarını artır
        existingItem.quantity = (existingItem.quantity || 1) + 1;
        logger.debug(`📝 Product Quantity Increased: ${product.ProductID}`, existingItem.quantity);
      } else {
        // Yoksa yeni ürün olarak ekle
        cart.push({
          ...product,
          id: product.ProductID,
          quantity: 1
        });
        logger.debug(`➕ New Product Added to Cart: ${product.ProductID}`);
      }

      // localStorage'a kaydet
      saveCart(cart);
      logger.success(`✅ Cart Updated`, { itemCount: cart.length, total: cart.reduce((sum, item) => sum + (item.quantity || 1), 0) });

      // Bildirim göster
      setNotification({
        type: "success",
        message: `${product.ProductName} sepete eklendi!`
      });
    } catch (error) {
      logger.error("❌ Error Adding to Cart", error);
      setNotification({
        type: "error",
        message: "Sepete eklerken bir hata oluştu"
      });
    }
  };

  return (
    <Main>
      <div className="col-12">
        {/* Category Filters - with icons from API - Touch Scrollable */}
        <div 
          className="d-flex gap-1 mb-3 pb-2"
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            flexWrap: "nowrap",
            justifyContent: isDesktop ? "center" : "flex-start",
            paddingRight: "1rem",
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
          }}
        >
          <Button
            variant={activeCategory === 0 ? "primary" : "secondary"}
            onClick={() => setActiveCategory(0)}
            icon="bi bi-grid-3x3-gap"
            style={{ padding: "4px 14px", fontSize: "0.8rem", flexShrink: 0 }}
          >
            Tümü
          </Button>
          {categories.map((category) => (
            <Button
              key={category.CategoryID}
              variant={activeCategory === category.CategoryID ? "primary" : "secondary"}
              onClick={() => setActiveCategory(category.CategoryID)}
              icon={category.Icon ? `bi ${category.Icon}` : undefined}
              style={{ padding: "4px 14px", fontSize: "0.8rem", flexShrink: 0 }}
            >
              {category.CategoryName}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div key={product.ProductID} className="col-lg-4 col-md-6">
                <Card
                  hoverable={true}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  {/* Product Image */}
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      marginBottom: "1rem",
                      borderRadius: "8px",
                      backgroundColor: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {product.Image ? (
                      <img
                        src={product.Image}
                        alt={product.ProductName}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <i
                        className="bi bi-image"
                        style={{
                          fontSize: "3rem",
                          color: COLORS.accent,
                        }}
                      ></i>
                    )}
                  </div>

                  {/* Product Name */}
                  <h4 className="fw-bold mb-2" style={{ color: COLORS.text, textAlign: "center" }}>
                    {product.ProductName}
                  </h4>

                  {/* Price */}
                  <div style={{ marginBottom: "1rem", textAlign: "center" }}>
                    <span
                      className="fw-bold"
                      style={{ 
                        fontSize: "1.5rem", 
                        color: COLORS.accent 
                      }}
                    >
                      {formatPrice(product.Price)}
                    </span>
                  </div>

                  {/* Stock Status - Color coded: Red (<20), Yellow (20-50), Green (>50) */}
                  <div style={{ marginBottom: "1rem", textAlign: "center" }}>
                    <span 
                      style={{ 
                        color: product.Stock < 20 ? "#ef4444" : product.Stock < 50 ? "#fbbf24" : "#10b981",
                        fontSize: "0.9rem",
                        fontWeight: "600"
                      }}
                    >
                      Stok: <strong>{product.Stock}</strong> adet
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <div style={{ marginTop: "auto" }}>
                    <Button
                      variant={product.Stock === 0 ? "secondary" : "primary"}
                      disabled={product.Stock === 0}
                      onClick={() => addToCart(product)}
                      style={{ width: "100%" }}
                      icon="bi bi-cart-plus"
                    >
                      {product.Stock === 0 ? "Stokta Yok" : "Sepete Ekle"}
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <EmptyState
            icon="bi-inbox"
            title="Ürün Bulunmuyor"
            description="Bu kategoride ürün bulunmamaktadır."
          />
        )}
      </div>

      {/* Toast Notification */}
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          duration={2000}
          onClose={() => setNotification(null)}
        />
      )}
    </Main>
  );
}
