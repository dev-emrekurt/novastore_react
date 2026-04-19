// Logger Utility - Tüm işlemleri, API response'larını ve localStorage işlemlerini log etmek için

const LogLevel = {
  INFO: "INFO",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  WARNING: "WARNING",
  DEBUG: "DEBUG",
};

const LogColors = {
  INFO: "color: #0284c7; font-weight: bold;",
  SUCCESS: "color: #16a34a; font-weight: bold;",
  ERROR: "color: #dc2626; font-weight: bold;",
  WARNING: "color: #ea580c; font-weight: bold;",
  DEBUG: "color: #7c3aed; font-weight: bold;",
};

const getTimestamp = () => {
  const now = new Date();
  return now.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  });
};

const log = (level, title, data = null) => {
  const timestamp = getTimestamp();
  const color = LogColors[level];

  console.log(
    `%c[${timestamp}] [${level}] ${title}`,
    color
  );

  if (data) {
    console.log("Data:", data);
  }
};

const logger = {
  // API işlemleri
  apiRequest: (method, url, data = null) => {
    log(LogLevel.INFO, `📡 API Request: ${method.toUpperCase()} ${url}`, data);
  },

  apiResponse: (method, url, response) => {
    log(LogLevel.SUCCESS, `✅ API Response: ${method.toUpperCase()} ${url}`, response);
  },

  apiError: (method, url, error) => {
    log(LogLevel.ERROR, `❌ API Error: ${method.toUpperCase()} ${url}`, {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
  },

  // Auth işlemleri
  authLogin: (email) => {
    log(LogLevel.INFO, `🔐 Giriş Denemesi: ${email}`);
  },

  authLoginSuccess: (user) => {
    log(LogLevel.SUCCESS, `✅ Giriş Başarılı`, user);
  },

  authRegister: (email, fullName) => {
    log(LogLevel.INFO, `📝 Kayıt Denemesi: ${email} - ${fullName}`);
  },

  authRegisterSuccess: (user) => {
    log(LogLevel.SUCCESS, `✅ Kayıt Başarılı`, user);
  },

  authLogout: () => {
    log(LogLevel.INFO, `🚪 Çıkış Yapıldı`);
  },

  // localStorage işlemleri
  storageSet: (key, value) => {
    log(LogLevel.DEBUG, `💾 LocalStorage Set: ${key}`, value);
  },

  storageGet: (key, value) => {
    log(LogLevel.DEBUG, `📖 LocalStorage Get: ${key}`, value);
  },

  storageRemove: (key) => {
    log(LogLevel.DEBUG, `🗑️ LocalStorage Remove: ${key}`);
  },

  // UI işlemleri
  uiAction: (action, details = null) => {
    log(LogLevel.INFO, `🎯 UI Action: ${action}`, details);
  },

  // Hata ve uyarılar
  error: (title, error) => {
    log(LogLevel.ERROR, title, error);
  },

  warning: (title, details = null) => {
    log(LogLevel.WARNING, title, details);
  },

  info: (title, details = null) => {
    log(LogLevel.INFO, title, details);
  },

  success: (title, details = null) => {
    log(LogLevel.SUCCESS, title, details);
  },

  debug: (title, details = null) => {
    log(LogLevel.DEBUG, title, details);
  },
};

export default logger;
