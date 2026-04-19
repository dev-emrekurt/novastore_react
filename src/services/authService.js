import api from './api';
import logger from '../utils/logger';

const authService = {
  register: async (email, password, fullName) => {
    try {
      logger.apiRequest('POST', '/auth/register', { email, fullName });
      const response = await api.post('/auth/register', {
        email: email,
        password: password,
        full_name: fullName
      });
      logger.apiResponse('POST', '/auth/register', response.data);
      return response.data;
    } catch (error) {
      // Hata mesajını daha anlamlı hale getirmek için
      const message = error.response?.data?.message || "Kayıt sırasında bir hata oluştu.";
      logger.apiError('POST', '/auth/register', error);
      throw new Error(message);
    }
  },
  login: async (email, password) => {
    try {
      logger.apiRequest('POST', '/auth/login', { email });
      const response = await api.post('/auth/login', {
        email: email,
        password: password
      });
      logger.apiResponse('POST', '/auth/login', response.data);
      return response.data;
    } catch (error) {
      // Hata mesajını daha anlamlı hale getirmek için
      const message = error.response?.data?.message || "Giriş sırasında bir hata oluştu.";
      logger.apiError('POST', '/auth/login', error);
      throw new Error(message);
    }
  }
};

export default authService;