import api from './api';

const authService = {
  register: async (email, password, fullName) => {
    try {
      const response = await api.post('/auth/register', {
        email: email,
        password: password,
        full_name: fullName
      });
      return response.data;
    } catch (error) {
      // Hata mesajını daha anlamlı hale getirmek için
      const message = error.response?.data?.message || "Kayıt sırasında bir hata oluştu.";
      throw new Error(message);
    }
  },
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email: email,
        password: password
      });
      return response.data;
    } catch (error) {
      // Hata mesajını daha anlamlı hale getirmek için
      const message = error.response?.data?.message || "Giriş sırasında bir hata oluştu.";
      throw new Error(message);
    }
  }
};

export default authService;