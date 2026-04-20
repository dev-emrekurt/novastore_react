import axios from "axios";

// TEMEL YAPILANDIRMA
const api = axios.create({
  baseURL: "https://site--novastore--8vnyqvdcq6fp.code.run/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Token ekleme
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Token hatası durumunda
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token geçersiz/süresi dolmuş - çıkış yap
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default api;