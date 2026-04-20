# 🛍️ NovaStore - Modern E-Ticaret Platformu

**NovaStore**, kullanıcıların ürün satın alması, siparişlerini takip etmesi ve hesaplarını yönetebileceği modern ve responsive bir React tabanlı e-ticaret uygulamasıdır.

## ✨ Özellikler

### 🎯 Ana Özellikler
- **Ürün Kataloğu**: Kategorilere göre filtrelenmiş ürün listeleme
- **Kategori Filtreleme**: Horizontal scrollable kategori seçimi (mobilde ve masaüstünde optimize)
- **Stok Durumu Göstergesi**: Renkli stok durumu (Kırmızı: <20, Sarı: 20-50, Yeşil: >50)
- **Sepet Yönetimi**: Ürün ekleme/çıkarma, miktar ayarlama
- **Sipariş Yönetimi**: Kullanıcı siparişlerini görüntüleme ve takip etme
- **Kullanıcı Kimlik Doğrulaması**: Giriş/Kayıt işlevselliği
- **Responsive Tasarım**: Mobil, tablet ve masaüstü cihazlar için optimize edilmiş

### 🎨 Tasarım & UX
- **Bootstrap 5 Tabanlı UI**: Modern ve tutarlı tasarım sistemi
- **Bootstrap Icons**: Yaygın olarak kullanılan ikonlar
- **Dual Layout Navbar**: Masaüstünde yatay menü, mobilde dropdown menü
- **Renkli UI Bileşenleri**: Button, Card, Toast, EmptyState vb.
- **Hızlı Bildirimler**: Toast notifications sistem
- **Türkçe Arayüz**: Tüm metinler ve yardım içeriği Türkçe

## 🛠️ Teknoloji Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Routing**: React Router v7
- **UI Framework**: Bootstrap 5
- **Icons**: Bootstrap Icons
- **Stil**: CSS3 + Bootstrap
- **State Management**: localStorage (Local Storage)

## 📋 Proje Yapısı

```
novastore_react/
├── src/
│   ├── components/         # Yeniden kullanılabilir bileşenler
│   │   ├── NavBar.jsx     # Responsive navigasyon çubuğu
│   │   ├── Footer.jsx     # Alt bilgi bölümü
│   │   ├── Main.jsx       # Ana layout wrapper
│   │   ├── LogoSVG.jsx    # Marka logosu
│   │   └── ui/            # UI bileşen kütüphanesi
│   │       ├── Button.jsx       # Özelleştirilebilir buton
│   │       ├── Card.jsx         # İçerik kartı
│   │       ├── Toast.jsx        # Bildirim sistemi
│   │       ├── EmptyState.jsx   # Boş durum göstergesi
│   │       └── LoadingSpinner.jsx # Yükleme göstergesi
│   ├── pages/             # Sayfa bileşenleri
│   │   ├── Home.jsx       # Ana sayfa
│   │   ├── Products.jsx   # Ürün kataloğu
│   │   ├── Cart.jsx       # Alışveriş sepeti
│   │   └── Orders.jsx     # Sipariş tarihi
│   ├── features/
│   │   └── auth/
│   │       └── AuthModal.jsx # Giriş/Kayıt modalı
│   ├── services/          # API servisler
│   │   ├── api.js               # Axios konfigürasyonu
│   │   ├── authService.js       # Kimlik doğrulama
│   │   ├── getProductsService.js # Ürün listesi
│   │   └── getCategoriesService.js # Kategoriler
│   ├── utils/             # Yardımcı fonksiyonlar
│   │   ├── storage.js     # localStorage yönetimi
│   │   ├── logger.js      # Konsol logging
│   │   ├── formatters.js  # Veri formatlamı
│   │   └── validators.js  # İnput doğrulama
│   ├── constants/
│   │   └── color.js       # Uygulama renkleri
│   ├── data/
│   │   └── products.js    # Statik ürün verisi
│   ├── App.jsx            # Ana uygulaması
│   └── main.jsx           # Giriş noktası
├── public/                # Statik dosyalar
├── index.html             # HTML şablonu
├── vite.config.js         # Vite konfigürasyonu
├── eslint.config.js       # ESLint kuralları
└── package.json           # Proje bağımlılıkları
```

## 🚀 Kurulum & Başlangıç

### Ön Gereksinimler
- **Node.js** 16.0 veya üzeri
- **npm** 7.0 veya üzeri

### Adım 1: Repository'yi klonlayın
```bash
git clone <repository-url>
cd novastore_react
```

### Adım 2: Bağımlılıkları yükleyin
```bash
npm install
```

### Adım 3: Geliştirme sunucusunu başlatın
```bash
npm run dev
```

Uygulama `http://localhost:5173` adresinde açılacaktır.

### Adım 4: Üretim için build yapın
```bash
npm run build
```

Optimize edilmiş dosyalar `dist/` klasöründe oluşturulacaktır.

## 🔧 Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusunu başlat (hot reload) |
| `npm run build` | Üretim için optimize et ve build et |
| `npm run preview` | Build edilmiş uygulamayı önizle |
| `npm run lint` | Kod kalitesi kontrolü (ESLint) |

## 🔌 API Entegrasyonu

Uygulama aşağıdaki API endpoint'leri ile haberleşir:

### Base URL
```
https://site--novastore--8vnyqvdcq6fp.code.run/api
```

### Authentication
- **Header**: `Authorization: Bearer <token>`
- **Token Storage**: localStorage'da `authToken` olarak saklanır

### Temel Endpoint'ler

#### Ürünler
```
GET /products              # Tüm ürünleri getir
GET /products/:id          # Belirli ürünü getir
```

#### Kategoriler
```
GET /categories            # Kategorileri getir (Bootstrap icon bilgisi içerir)
```

#### Sipariş Yönetimi
```
GET /orders/:customerId    # Müşteri siparişlerini getir
POST /orders               # Yeni sipariş oluştur
```

#### Kimlik Doğrulama
```
POST /auth/login           # Kullanıcı girişi
POST /auth/register        # Yeni hesap oluşturma
GET /auth/profile          # Profil bilgisini getir
```

## 📱 Responsive Tasarım

Uygulama **Bootstrap 5** breakpoints'i kullanarak responsive davranır:

| Cihaz | Genişlik | Davranış |
|-------|----------|----------|
| Mobil | < 576px | Dropdown menü, dikey layout |
| Tablet | 576px - 991px | Yarı responsive |
| Masaüstü | ≥ 992px | Yatay menü, tam layout |

### Navbar Responsive Davranışı
- **Masaüstü**: Logo | Yatay Menü (Merkez) | Sepet & Kullanıcı Menüsü (Sağ)
- **Mobil**: Logo | Hamburger Menüsü (Dropdown) | Sepet İkonu

### Kategoriler
- **Masaüstü**: Merkez hizalı, yatay scroll (kaydırılabilir)
- **Mobil**: Sol hizalı, yatay scroll (touch optimizasyonu)

## 🎨 Renk Sistemi

Uygulama uyumlu bir renk paleti kullanır:

```javascript
// src/constants/color.js
- Primary: #7A9D96 (Yeşil-mavi)
- Secondary: #CAE4DB (Açık yeşil)
- Accent: #DCAE1D (Altın)
- Text: #00303F (Koyu)
- Danger: #EF4444 (Kırmızı)
- Warning: #FBF24 (Sarı)
- Success: #10B981 (Yeşil)
```

### Stok Renklendirmesi
- **Kırmızı (#EF4444)**: Stok < 20 (Kritik)
- **Sarı (#FBF24)**: Stok 20-50 (Sınırlı)
- **Yeşil (#10B981)**: Stok > 50 (Yeterli)

## 💾 Local Storage Yönetimi

Uygulama aşağıdaki verileri yerel olarak saklar:

| Anahtar | Tip | Açıklama |
|---------|-----|----------|
| `user` | Object | Kullanıcı profili (email, ad, müşteri ID) |
| `authToken` | String | Bearer kimlik doğrulama token'ı |
| `cart` | Array | Sepet ürünleri ve miktarları |
| `rememberedEmail` | String | Giriş formunda hatırlanan e-posta |

## 📚 Bileşen Kütüphanesi

### Button Bileşeni
```jsx
<Button variant="primary" onClick={handleClick} icon="bi-plus">
  Ekle
</Button>
```

**Varyantlar**: `primary`, `secondary`, `danger`

### Card Bileşeni
```jsx
<Card header="Başlık" footer="Alt" hoverable>
  İçerik
</Card>
```

### Toast Bildirimleri
```jsx
<Toast type="success" message="Başarılı!" duration={3000} />
```

**Tipler**: `success`, `error`, `info`

### EmptyState
```jsx
<EmptyState 
  icon="bi-inbox"
  title="Sipariş Yok"
  description="Henüz sipariş vermemiştiniz"
/>
```

## 🔐 Güvenlik

- **Token Tabanlı Kimlik Doğrulama**: Bearer token localStorage'da saklanır
- **HTTPS**: Tüm API çağrıları HTTPS üzerinden yapılır
- **localStorage İzolasyonu**: Domain başına ayrı storage

## 📊 Utilities & Yardımcılar

### storage.js - localStorage Yönetimi
```javascript
saveUser(), getUser(), removeUser()           // Kullanıcı
saveAuthToken(), getAuthToken(), removeAuthToken() // Token
saveCart(), getCart(), clearCart()            // Sepet
saveRememberedEmail(), getRememberedEmail()   // E-posta
```

### formatters.js - Veri Formatlamı
```javascript
formatPrice(100) // "100,00 ₺"
formatDate(new Date()) // "20.04.2026"
formatQuantity(5) // "Adet: 5"
truncateText("Uzun metin", 20) // "Uzun metin..."
formatDateTime(new Date()) // "20.04.2026 14:30"
```

### validators.js - İnput Doğrulama
```javascript
validateEmail(email)      // E-posta formatı
validatePassword(pwd)     // Minimum 6 karakter
validateName(name)        // Minimum 2 karakter
validatePrice(price)      // Geçerli fiyat
validateQuantity(qty)     // Pozitif sayı
```

### logger.js - Logging Sistemi
```javascript
logger.info("Bilgi mesajı")     // Mavi
logger.success("Başarı")        // Yeşil
logger.error("Hata")            // Kırmızı
logger.warning("Uyarı")         // Turuncu
logger.debug("Debug info")      // Mor
```

## 🎯 Sayfa Rehberi

### 🏠 Anasayfa (Home)
- Karşılama başlığı ve "Alışverişe Başla" butonu
- Şirket özellikleri: Hızlı Teslimat, Güvenli Ödeme, 7/24 Destek, Kalite Garantisi

### 📦 Ürünler (Products)
- Kategoriye göre filtreleme (horizontal scroll)
- Ürün kartları: Resim, ad, fiyat, stok durumu
- Ürünü sepete ekle butonları
- Responsive grid layout

### 🛒 Sepet (Cart)
- Sepetteki ürünleri görüntüle
- Miktar ayarla (+/- butonları)
- Ürünü sepetten çıkar
- Sipariş özeti (Toplam, Kargo, Genel Toplam)

### 📋 Siparişlerim (Orders)
- Geçmiş siparişleri görüntüle
- Sipariş tarihleri ve durumları
- Boş durum göstergesi

### 👤 Giriş / Kayıt
- Modal tabanlı authentication
- "Beni Hatırla" seçeneği
- Giriş / Kayıt yapma seçenekleri
- Form validasyonu

## 📝 Kod Standartları

- **Dil**: Tüm açıklamalar ve yorumlar **Türkçe**
- **Komponenti Adlandırması**: PascalCase (örn: `UserProfile.jsx`)
- **Dosya Adlandırması**: kebab-case veya PascalCase
- **JSDoc Yorumları**: Tüm fonksiyonlar ve bileşenler JSDoc ile belgelenmiş
- **Linting**: ESLint kurallarına uygunluk

## 👨‍💻 Geliştirici

**Emre Kurt** tarafından geliştirilmiş. 

## 📞 İletişim & Destek

- **Link**: https://linktr.ee/dev.emrekurt

---

**Son Güncelleme**: 20 Nisan 2026 
