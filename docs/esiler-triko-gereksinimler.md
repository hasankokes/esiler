# Eşiler Triko — Website Gereksinim Dokümanı
*Hazırlayan: Claude | Tarih: Şubat 2026*

---

## 1. Proje Özeti

**Marka:** Eşiler Triko  
**Kuruluş:** 1964 (60+ yıllık geçmiş)  
**Sektör:** Toptan Giyim — Triko & Penye  
**Amaç:** Online satış yok. Marka tanıtımı + ürün kataloğu sergisi.  
**Hedef Kitle:** Butik sahipleri, perakende mağaza alıcıları, B2B müşteriler

---

## 2. Piyasa Analizi

### Rakip Sitelerin Zayıf Noktaları
Mevcut toptan giyim siteleri (Lonca, Qustyle, Modacan vb.) ortak sorunlar taşıyor:
- Fiyat odaklı, marka ruhu sıfır
- Aşırı kalabalık, ürün yığını görünümü
- Geçiciliği hissettiren, ucuz hissiyat
- Mobil deneyim zayıf
- Güven inşa eden hikaye anlatımı yok

### Eşiler Triko'nun Fırsatı
60 yıllık bir geçmiş **rekabet avantajıdır.** Rakiplerin hiçbiri bu köklülüğü sunamaz. Site bunu merkezine almalı: "Bizi 1964'ten beri tercih ediyorlar — ve neden önemli?"

---

## 3. Marka Kimliği & Tasarım Dili

### Konsept: "Zamana Dayanan Sadelik"
Geleneksel + modern ikilemi değil, **gelenekselin modern anlatımı.**  
Tıpkı Japon lonca markalarının web siteleri gibi: Sade, güvenilir, her pikseli düşünülmüş.

### Renk Paleti
| Rol | Renk | Hex |
|-----|------|-----|
| Ana Zemin | Kırık Beyaz / Krem | `#F5F0E8` |
| Birincil | Antrasit / Koyu Lacivert | `#1C2B3A` |
| Vurgu | Fil dişi tonu | `#D4C5A9` |
| İkincil Vurgu | Terracotta / Kiremit | `#B5622C` |
| Metin | Koyu Gri | `#2D2D2D` |

### Tipografi
- **Başlık:** Cormorant Garamond (serif — asalet, köklülük)
- **Alt başlık:** Playfair Display (serif — editorial his)
- **Gövde:** DM Sans (clean, modern, okunabilir)
- **Etiket/Tag:** DM Mono (teknik, sade)

### Tasarım İlkeleri
- Bol negatif boşluk
- Yatay çizgi kullanımı (iplik metaforu)
- Ürün fotoğraflarında sade arka plan (beyaz/krem studio çekimi)
- Sayfa geçişlerinde yumuşak fade animasyonları
- Grid-breaking layout — sol tarafa offset büyük başlık

---

## 4. Site Haritası

```
Anasayfa (/)
├── Hakkımızda (/hakkimizda)
├── Koleksiyon (/koleksiyon)
│   ├── Penye (/koleksiyon/penye)
│   ├── Penye Büyük Beden (/koleksiyon/penye-buyuk-beden)
│   ├── Hırka & Yelek (/koleksiyon/hirka-yelek)
│   └── Badi (/koleksiyon/badi)
├── Toplu Sipariş / İletişim (/iletisim)
└── (Opsiyonel) Katalog PDF indirme
```

---

## 5. Sayfa Gereksinimleri

### 5.1 Anasayfa (Hero Section)
**Amaç:** İlk 3 saniyede kimliği hissettir.

**Bileşenler:**
- Logo (sol üst) — minimal, serif tipografi tabanlı
- Navigasyon (sağ üst) — 4-5 link, düz, alt çizgisiz
- Hero Bölümü:
  - Büyük, offset başlık: *"1964'ten beri / Türk Dokusunun Sesi"*
  - Sağda ürün görseli (büyük, dramatik crop)
  - Küçük italik alt metin: "60 yılın güveniyle toptan triko & penye"
  - CTA: "Koleksiyonu Keşfet" butonu (outline stil)
- Sayı/stat bandı: `60+ Yıl` / `4 Kategori` / `Yüzlerce Renk`
- Kategori Kartları (4'lü grid): Her kategori için görsel kart
- "Biz Kimiz" kısa excerpt + "Devamını Oku" linki
- Footer

**Animasyonlar:**
- Hero başlığı: Aşağıdan yukarı slide-in (stagger)
- Stat sayaçları: Sayfa görünüre girince count-up
- Kategori kartları: Hover'da hafif scale + renk overlay

---

### 5.2 Hakkımızda Sayfası
**Amaç:** Güven ve köklülük hissettir. Duygu yarat.

**Bileşenler:**
- Büyük Sayı: *"1964"* — sayfa ortasında dramatik boyutta
- Zaman çizelgesi (Timeline): 
  - 1964 — Kuruluş
  - 1970s — Ürün çeşitlendirme
  - 1980s — Büyük beden koleksiyonu
  - 2000s — Dijitalleşme
  - 2024 — Yeni nesil, köklü değerler
- "Atölye'den Sahneye" kısa hikaye metni
- Değerler bölümü: Kalite, Güvenilirlik, Köklülük (3 sütun, ikon + kısa metin)
- Ekip / Aile fotoğrafı (varsa)

---

### 5.3 Koleksiyon Sayfası (Ana)
**Amaç:** Tüm kategorilere hızlı erişim + profesyonel sunum.

**Bileşenler:**
- Filtreleme çubuğu: Kategori seçimi (tab'lar)
- Ürün grid (3 sütun): Ürün fotoğrafı + isim + renk seçenekleri (renkli nokta gösterimi)
- Renk filtresi: Yan panelde renk paleti filtreleme
- Her ürün kartında: Hover'da "Detay Gör" overlay

**Kategoriler ve içerikler:**
| Kategori | Renk Seçenekleri |
|----------|-----------------|
| Penye | Beyaz, Siyah, Lacivert, Gri, Bej, Haki, Bordo, Pembe, Mavi, Yeşil |
| Penye (Büyük Beden) | Aynı renk paleti, beden 2XL-6XL |
| Hırka & Yelek | Camel, Ekru, Gri Melanj, Siyah, Lacivert, Bordo, Hardal |
| Badi | Beyaz, Siyah, Ten, Gri, Pembe, Leylak |

---

### 5.4 Ürün Detay Sayfası
**Bileşenler:**
- Büyük ürün görseli (solda)
- Ürün adı, kategori etiketi (sağda)
- Renk seçici: Tıklanabilir renkli daireler
- Kumaş bilgisi: %100 Penye Pamuk vb.
- Beden aralığı: S / M / L / XL vb.
- "Toplu Sipariş İçin İletişime Geçin" CTA butonu
- Benzer ürünler bölümü

---

### 5.5 İletişim / Toplu Sipariş Sayfası
**Bileşenler:**
- Adres + Harita embed
- Telefon, E-posta
- Çalışma saatleri
- Basit iletişim formu: Ad/Soyad, Firma Adı, E-posta, Telefon, Mesaj, İlgilenilen Kategori
- WhatsApp hızlı iletişim butonu (sticky veya sayfada belirgin)

---

## 6. Teknik Gereksinimler (Tech Stack)

### Önerilen Stack: Next.js (React)

#### Neden Next.js?
- SEO için Server-Side Rendering (Google'da görünürlük)
- Görsel optimizasyonu (next/image — ürün fotoğrafları hızlı yüklenir)
- Static Generation ile blazing fast yükleme
- Türkiye'den hosting için Vercel çok uygun (ücretsiz tier)

#### Detaylı Stack
| Katman | Teknoloji | Neden |
|--------|-----------|-------|
| Framework | Next.js 14 (App Router) | SEO + performans |
| Styling | Tailwind CSS | Hızlı geliştirme, tutarlılık |
| Animasyon | Framer Motion | Smooth, profesyonel animasyonlar |
| Fontlar | Google Fonts (Cormorant + DM Sans) | Ücretsiz, hızlı |
| Görseller | next/image | Otomatik optimizasyon |
| İkon | Lucide React | Minimal, tutarlı |
| Form | React Hook Form | İletişim formu |
| E-posta | Resend veya Nodemailer | Form bildirimleri |
| Hosting | Vercel | Next.js için ideal, ücretsiz başlangıç |
| Domain | .com.tr | Yerel güven |
| CMS (Opsiyonel) | Sanity veya Notion API | Ürün/içerik yönetimi |

#### Alternatif (Daha Basit): Astro + Tailwind
Eğer geliştirici kaynağı kısıtlıysa Astro daha az karmaşıklık sunar. %100 statik site için idealdir.

#### Alternatif (No-Code): Webflow
Eğer geliştirici yoksa Webflow + CMS ile aylar içinde profesyonel sonuç alınır. Aylık ~$23-39 USD.

---

## 7. SEO Gereksinimleri

- Her sayfa için unique `<title>` ve `<meta description>`
- Türkçe URL yapısı: `/koleksiyon/penye-buyuk-beden`
- Schema markup: LocalBusiness + Product
- Google Business Profile bağlantısı
- Sitemap.xml otomatik oluşturma
- robots.txt yapılandırması
- OG görselleri (sosyal medya paylaşımı için)

**Hedef Anahtar Kelimeler:**
- "toptan triko istanbul"
- "penye toptan"
- "toptan hırka tedarikçi"
- "büyük beden penye toptan"
- "eşiler triko"

---

## 8. Mobil & Performans

- Mobile-first tasarım
- Core Web Vitals hedef: LCP < 2.5s, CLS < 0.1
- Görsel lazy loading
- WebP formatı
- Minimum 90 Lighthouse skoru

---

## 9. Faz Planı

### Faz 1 — MVP (4-6 Hafta)
- [ ] Anasayfa
- [ ] Koleksiyon sayfası (statik)
- [ ] Hakkımızda
- [ ] İletişim formu
- [ ] Temel SEO

### Faz 2 — Geliştirme (6-10 Hafta)
- [ ] Ürün detay sayfaları
- [ ] Renk filtreleme
- [ ] Katalog PDF indirme
- [ ] WhatsApp entegrasyonu
- [ ] Google Analytics

### Faz 3 — Büyüme
- [ ] CMS entegrasyonu (ürünleri kolayca güncelleyebilmek)
- [ ] Çoklu dil (TR/EN) — ihracat için
- [ ] Instagram feed entegrasyonu

---

## 10. İçerik Gereksinimleri (Hazırlanması Gereken)

### Görseller
- [ ] Logo (vektör formatında, SVG)
- [ ] Tüm ürünlerin profesyonel stüdyo çekimleri (beyaz/krem arka plan)
- [ ] Atölye / mağaza fotoğrafları (atmosfer için)
- [ ] Ekip / kurucu fotoğrafı (isteğe bağlı)

### Metinler
- [ ] Marka hikayesi (250-400 kelime)
- [ ] Her kategori için kısa açıklama (50-100 kelime)
- [ ] Firma değerleri (3 madde)
- [ ] İletişim bilgileri (adres, tel, e-posta, çalışma saatleri)

---

## 11. Tahmini Bütçe

| Kalem | Düşük | Orta | Yüksek |
|-------|-------|------|--------|
| Tasarım & Geliştirme | ₺15.000 | ₺35.000 | ₺70.000+ |
| Domain (.com.tr/yıl) | ₺200 | ₺200 | ₺200 |
| Hosting (Vercel/yıl) | Ücretsiz | ₺0 | ₺2.400 |
| Fotoğraf Çekimi | ₺3.000 | ₺8.000 | ₺20.000 |
| Webflow (alternatif) | ₺800/ay | ₺1.200/ay | — |

---

*Bu doküman yaşayan bir belgedir. Geliştirme sürecinde güncellenmelidir.*
