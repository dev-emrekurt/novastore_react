import api from './api';

const getProductsService = {
  getAllProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error("Ürünler getirilemedi:", error);
      throw error;
    }
  },
};

export default getProductsService;