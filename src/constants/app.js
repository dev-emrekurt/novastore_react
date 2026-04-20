/**
 * Uygulamada kullanılan tüm sabit değerler
 * Herhangi bir değişiklik gerekirse burada yapmak yeterli
 */

// API endpoints
export const API_ENDPOINTS = {
  ORDERS: "/orders",
  PRODUCTS: "/products",
  CATEGORIES: "/categories",
};

// Storage keys
export const STORAGE_KEYS = {
  USER: "user",
  CART: "cart",
  AUTH_TOKEN: "authToken",
  REMEMBERED_EMAIL: "rememberedEmail",
};

// UI messages
export const MESSAGES = {
  // Success
  SUCCESS_LOGIN: "✅ Giriş başarılı!",
  SUCCESS_REGISTER: "✅ Kayıt başarılı!",
  SUCCESS_ORDER_CREATED: "✅ Siparişiniz başarıyla oluşturuldu!",
  SUCCESS_LOGOUT: "Çıkış yapılıyor...",

  // Errors
  ERROR_NO_USER: "Kullanıcı bilgisi bulunamadı.",
  ERROR_NO_CUSTOMER_ID: "Müşteri ID bulunamadı. Lütfen yeniden giriş yapınız.",
  ERROR_EMPTY_CART: "Sepetiniz boş. Lütfen ürün ekleyiniz.",
  ERROR_LOGIN_REQUIRED: "Siparişi oluşturmak için lütfen giriş yapınız.",
  ERROR_FAILED_ORDER: "Sipariş oluşturulamadı: ",

  // Info
  INFO_LOADING: "Yükleniyor...",
  INFO_NO_ORDERS: "Henüz bir sipariş vermemişsiniz.",
  INFO_EMPTY_CART: "Sepetiniz boş.",
};

// API Timeouts
export const API_TIMEOUTS = {
  SHORT: 3000, // 3 seconds
  MEDIUM: 5000, // 5 seconds
  LONG: 10000, // 10 seconds
};

// Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};
