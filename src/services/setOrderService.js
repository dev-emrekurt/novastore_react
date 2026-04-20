import api from './api';
import logger from '../utils/logger';

const setOrderService = {
  setOrder: async (orderData) => {
    try {
      logger.apiRequest('POST', '/orders', orderData);
      const response = await api.post("/orders", orderData);
      logger.apiResponse('POST', '/orders', response.data);
      return response.data;
    } catch (error) {
      logger.apiError('POST', '/orders', error);
      console.error("Sipariş oluşturulamadı:", error);
      throw error;
    }
  },

  createOrderFromCart: async () => {
    try {
      // localStorage'dan user ve cart bilgilerini al
      const storedUser = localStorage.getItem("user");
      const storedCart = localStorage.getItem("cart");

      if (!storedUser) {
        throw new Error("Kullanıcı bilgisi bulunamadı. Lütfen giriş yapınız.");
      }

      if (!storedCart) {
        throw new Error("Sepet boş. Lütfen ürün ekleyiniz.");
      }

      const userData = JSON.parse(storedUser);
      const cartItems = JSON.parse(storedCart);

      if (!userData.customer_id) {
        throw new Error("Müşteri ID bulunamadı.");
      }

      if (cartItems.length === 0) {
        throw new Error("Sepet boş.");
      }

      // API için gerekli formatı oluştur
      const orderData = {
        customerId: userData.customer_id,
        items: cartItems.map(item => ({
          productId: item.ProductID,
          quantity: item.quantity || 1
        }))
      };

      logger.info("🛒 Sepetden Sipariş Oluşturuluyor", orderData);

      // Siparişi oluştur
      const response = await setOrderService.setOrder(orderData);

      logger.success("✅ Sipariş Başarıyla Oluşturuldu", response);

      // Başarılı olursa sepeti temizle
      logger.storageRemove("cart");
      localStorage.removeItem("cart");

      return response;
    } catch (error) {
      logger.error("❌ Sipariş Oluşturulamadı", error);
      throw error;
    }
  }
};

export default setOrderService;