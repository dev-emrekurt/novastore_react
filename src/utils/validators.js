/**
 * Validation Utilities
 * Form validasyonu ve kontrolleri
 */

/**
 * Email format'ını kontrol et
 * @param {string} email - Email
 * @returns {boolean} - Geçerli mi?
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Şifreyi kontrol et (minimum 6 karakter)
 * @param {string} password - Şifre
 * @returns {boolean} - Geçerli mi?
 */
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Ad-soyadı kontrol et
 * @param {string} name - Ad-soyad
 * @returns {boolean} - Geçerli mi?
 */
export const validateName = (name) => {
  return name && name.trim().length >= 2;
};

/**
 * Fiyatın geçerli olup olmadığını kontrol et
 * @param {number|string} price - Fiyat
 * @returns {boolean} - Geçerli mi?
 */
export const validatePrice = (price) => {
  const numPrice = parseFloat(price);
  return !isNaN(numPrice) && numPrice > 0;
};

/**
 * Quantity'nin geçerli olup olmadığını kontrol et
 * @param {number} quantity - Miktar
 * @returns {boolean} - Geçerli mi?
 */
export const validateQuantity = (quantity) => {
  const numQty = parseInt(quantity);
  return !isNaN(numQty) && numQty > 0;
};

/**
 * Ürün ID'sinin geçerli olup olmadığını kontrol et
 * @param {number} productId - Ürün ID
 * @returns {boolean} - Geçerli mi?
 */
export const validateProductId = (productId) => {
  const numId = parseInt(productId);
  return !isNaN(numId) && numId > 0;
};

/**
 * Müşteri ID'sinin geçerli olup olmadığını kontrol et
 * @param {number} customerId - Müşteri ID
 * @returns {boolean} - Geçerli mi?
 */
export const validateCustomerId = (customerId) => {
  const numId = parseInt(customerId);
  return !isNaN(numId) && numId > 0;
};
