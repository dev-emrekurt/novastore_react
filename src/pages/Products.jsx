import { useEffect, useState } from "react";
import { COLORS } from "../constants/color";
import Main from "../components/Main";
import productsService from "../services/getProductsService";
import categoriesService from "../services/getCategoriesService";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const filteredProducts = 
    activeCategory === 0 
      ? products 
      : products.filter(p => p.CategoryID === activeCategory);

      useEffect(() => {
        const fetchProducts = async () => {
          try {
            const productsData = await productsService.getAllProducts();
            setProducts(productsData);
          } catch (error) {
            console.error("Ürünler getirilemedi:", error);
          }
        };
        const fetchCategories = async () => {
          try {
            const categoriesData = await categoriesService.getAllCategories();
            setCategories(categoriesData);
          } catch (error) {
            console.error("Kategoriler getirilemedi:", error);
          }
        };
        fetchCategories();

        fetchProducts();
      }, []);


  return (
    <Main>
      <div className="col-12">
        {/* Kategori Filtreleme */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
          <button
            onClick={() => setActiveCategory(0)}
            className="btn fw-semibold"
            style={{
              backgroundColor: activeCategory === 0 ? COLORS.accent : COLORS.secondary,
              color: activeCategory === 0 ? "white" : COLORS.text,
              border: `2px solid ${COLORS.text}`,
              transition: "all 0.3s ease",
              padding: "0.5rem 1.5rem",
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== 0) {
                e.target.style.backgroundColor = COLORS.primary;
                e.target.style.color = "white";
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== 0) {
                e.target.style.backgroundColor = COLORS.secondary;
                e.target.style.color = COLORS.text;
              }
            }}
          >
            Tümü
          </button>
          {categories.map((category) => (
            <button
              key={category.CategoryID}
              onClick={() => setActiveCategory(category.CategoryID)}
              className="btn fw-semibold"
              style={{
                backgroundColor: activeCategory === category.CategoryID ? COLORS.accent : COLORS.secondary,
                color: activeCategory === category.CategoryID ? "white" : COLORS.text,
                border: `2px solid ${COLORS.text}`,
                transition: "all 0.3s ease",
                padding: "0.5rem 1.5rem",
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category.CategoryID) {
                  e.target.style.backgroundColor = COLORS.primary;
                  e.target.style.color = "white";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.CategoryID) {
                  e.target.style.backgroundColor = COLORS.secondary;
                  e.target.style.color = COLORS.text;
                }
              }}
            >
              {category.CategoryName}
            </button>
          ))}
        </div>

        {/* Ürün Grid */}
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div key={product.ProductID} className="col-lg-4 col-md-6">
              <div
                style={{
                  backgroundColor: COLORS.secondary,
                  border: `2px solid ${COLORS.text}`,
                  borderRadius: "12px",
                  padding: "1.5rem",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = `0 8px 20px rgba(0,0,0,0.15)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
                  {product.image}
                </div>
                <h4 className="fw-bold mb-2" style={{ color: COLORS.text }}>
                  {product.ProductName}
                </h4>
                <div style={{ marginBottom: "1rem" }}>
                  <span
                    className="fw-bold"
                    style={{ 
                      fontSize: "1.5rem", 
                      color: COLORS.accent 
                    }}
                  >
                    ₺{product.Price}
                  </span>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <span 
                    style={{ 
                      color: product.Stock < 25 ? "#ef4444" : product.Stock < 50 ? COLORS.accent : "#10b981",
                      fontSize: "0.9rem",
                      fontWeight: "600"
                    }}
                  >
                    Stok: <strong>{product.Stock}</strong> adet
                  </span>
                </div>
                <button
                  className="btn fw-semibold w-100 mt-auto"
                  style={{
                    backgroundColor: COLORS.accent,
                    color: "white",
                    border: `2px solid ${COLORS.accent}`,
                    transition: "all 0.3s ease",
                    
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = COLORS.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = COLORS.accent;
                    e.target.style.color = "white";
                  }}
                >
                  Sepete Ekle
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Boş Sonuç Mesajı */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <p className="lead" style={{ color: COLORS.text }}>
              Bu kategoride ürün bulunamadı.
            </p>
          </div>
        )}
      </div>
    </Main>
  );
}
