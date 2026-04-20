import api from './api';
import logger from '../utils/logger';

const getOrdersService = {
  getOrdersByCustomerId: async (customerId) => {
    try {
      if (!customerId) {
        throw new Error("Customer ID gereklidir");
      }
      
      const response = await api.get(`/orders/${customerId}`);
      return response.data;
    } catch (error) {
      // 404 hatası = siparişi yok, boş array döndür
      if (error.response?.status === 404) {
        logger.info("ℹ️ Kullanıcının Siparişi Yok", `Customer ID: ${customerId}`);
        return { orders: [] };
      }
      
      // Diğer hatalar gerçek hatalar
      logger.error("❌ Siparişler Getirilemedi", error);
      throw error;
    }
  }
};

export default getOrdersService;