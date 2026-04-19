import api from './api';

const getCategoriesService = {
  getAllCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error("Kategoriler getirilemedi:", error);
      throw error;
    }
  }
};

export default getCategoriesService;