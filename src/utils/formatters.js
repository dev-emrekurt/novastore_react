/**
 * Format Utilities
 * Veri formatlama işlemleri
 */

/**
 * Fiyatı format et (2 decimal)
 * @param {number} price - Fiyat
 * @returns {string} - Formatlı fiyat
 */
export const formatPrice = (price) => {
  if (!price) return "0.00 ₺";
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return `${numPrice.toFixed(2)} ₺`;
};

/**
 * Tarihi format et (DD.MM.YYYY)
 * @param {string|Date} date - Tarih
 * @returns {string} - Formatlı tarih
 */
export const formatDate = (date) => {
  if (!date) return "-";
  
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  
  return `${day}.${month}.${year}`;
};

/**
 * Tarihi ve saati format et (DD.MM.YYYY HH:mm)
 * @param {string|Date} date - Tarih
 * @returns {string} - Formatlı tarih-saat
 */
export const formatDateTime = (date) => {
  if (!date) return "-";
  
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

/**
 * Stringi truncate et
 * @param {string} text - Metin
 * @param {number} length - Karakter sayısı
 * @returns {string} - Truncated metin
 */
export const truncateText = (text, length = 50) => {
  if (!text) return "";
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text;
};

/**
 * Quantity'yi format et
 * @param {number} qty - Miktar
 * @returns {string} - Formatlı miktar
 */
export const formatQuantity = (qty) => {
  return `Adet: ${qty}`;
};
