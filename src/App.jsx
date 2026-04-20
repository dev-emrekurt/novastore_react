// Komponentlerin ve Router'ın import edilmesi
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Bootstrap ve ikon kütüphaneleriin import edilmesi
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

// Sayfaların import edilmesi
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

function App() {
  return (
    
    <Router>
      // NavBar komponenti tüm sayfalarda görünecek şekilde yerleştirildi
      <NavBar />
      <Routes>
        // Anasayfa rotası
        <Route path="/" element={<Home />} />

        // Ürünler sayfası rotası
        <Route path="/products" element={<Products />} />

        // Sepet sayfası rotası
        <Route path="/cart" element={<Cart />} />

        // Siparişler sayfası rotası  
        <Route path="/orders" element={<Orders />} />
      </Routes>
      // Footer komponenti tüm sayfalarda görünecek şekilde yerleştirildi
      <Footer />
    </Router>
  );
}

export default App;
