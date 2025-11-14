# Translation System - Quick Reference

## 🎯 Fitur Utama
✅ Support Bahasa Indonesia & English  
✅ Persistent language selection (localStorage)  
✅ Auto reload saat ganti bahasa  
✅ Mudah digunakan di semua halaman  
✅ TypeScript support penuh  

---

## 📁 Files Yang Dibuat

### 1. Core Files
- `/resources/js/utils/language.ts` - Language utility functions
- `/resources/js/translations/index.ts` - Semua teks translasi (ID & EN)

### 2. Updated Files
- `/resources/js/components/welcome-navigation.tsx` - Navigation dengan language toggle

### 3. Documentation Files
- `TRANSLATION_GUIDE.md` - Panduan lengkap sistem translasi
- `TRANSLATION_IMPLEMENTATION_EXAMPLES.md` - 8 contoh implementasi
- `TRANSLATION_README.md` - Quick reference (file ini)

---

## 🚀 Quick Start (3 Langkah)

### 1. Import Hook
```typescript
import { useTranslation } from '@/translations';
```

### 2. Gunakan di Component
```typescript
export default function MyPage() {
    const { t, lang } = useTranslation();
    
    return (
        <div>
            <h1>{t('welcomeTitle')}</h1>
        </div>
    );
}
```

### 3. Selesai!
Saat user klik toggle language, semua teks akan berubah otomatis.

---

## 🔑 Translation Keys Tersedia

**Navigation:** `home`, `culture`, `event`, `shop`, `about`, `dashboard`

**Common:** `loading`, `error`, `success`, `save`, `cancel`, `delete`, `edit`, `close`, `submit`

**Search:** `search`, `searchPlaceholder`, `searchResults`, `searching`

**Welcome:** `welcomeTitle`, `welcomeSubtitle`, `exploreNow`, `learnMore`

**About:** `aboutUs`, `ourMission`, `ourVision`, `ourTeam`

**Events:** `culturalEvents`, `eventDetails`, `eventDate`, `eventLocation`, `joinEvent`

**Products:** `featuredProducts`, `addToCart`, `buyNow`, `outOfStock`

**Dan banyak lagi...** (Lihat `/resources/js/translations/index.ts` untuk daftar lengkap)

---

## 💡 Contoh Penggunaan

### Basic Usage
```typescript
const { t } = useTranslation();

<h1>{t('welcomeTitle')}</h1>
<button>{t('submit')}</button>
<p>{t('loading')}</p>
```

### Conditional Content
```typescript
const { t, lang } = useTranslation();

{lang === 'id' ? (
    <p>Konten dalam Bahasa Indonesia</p>
) : (
    <p>Content in English</p>
)}
```

### Button States
```typescript
<button disabled={loading}>
    {loading ? t('loading') : t('submit')}
</button>
```

---

## ➕ Menambah Key Baru

Edit `/resources/js/translations/index.ts`:

```typescript
export const translations = {
    id: {
        myNewKey: 'Teks Bahasa Indonesia',
    },
    en: {
        myNewKey: 'English Text',
    },
};
```

Lalu gunakan: `{t('myNewKey')}`

---

## 🎨 Language Toggle Button

Sudah terintegrasi di Navigation:
- **Desktop:** Button di kanan atas dengan icon + kode bahasa (ID/EN)
- **Mobile:** Panel di dalam mobile menu dengan toggle button
- **Action:** Klik → Save ke localStorage → Reload page

---

## ✅ Testing

1. Buka aplikasi di browser
2. Klik tombol language (EN/ID) di navigation
3. Page akan reload dengan bahasa baru
4. Refresh page - bahasa tetap tersimpan
5. Navigate ke page lain - bahasa tetap sama

---

## 📖 Dokumentasi Lengkap

- **`TRANSLATION_GUIDE.md`** - Panduan lengkap dengan semua detail
- **`TRANSLATION_IMPLEMENTATION_EXAMPLES.md`** - 8 contoh implementasi nyata

---

## 🔧 Cara Kerja

1. User pilih bahasa → Disimpan di `localStorage.setItem('language', 'id' atau 'en')`
2. Page reload → `window.location.reload()`
3. Component load → `useTranslation()` baca dari localStorage
4. Teks ditampilkan sesuai bahasa yang dipilih

---

## 🎯 Next Steps

Untuk mengimplementasikan translasi di page lain:

1. Import: `import { useTranslation } from '@/translations';`
2. Use hook: `const { t, lang } = useTranslation();`
3. Replace text: `{t('keyName')}`
4. Test di kedua bahasa (ID & EN)

---

## 📞 Troubleshooting

**Language tidak tersimpan?**
- Check `localStorage.getItem('language')` di browser console
- Clear cache dan reload

**Translation tidak muncul?**
- Pastikan key ada di `/resources/js/translations/index.ts`
- Check console untuk error TypeScript
- Pastikan `useTranslation()` sudah dipanggil di component

**Page tidak reload saat ganti bahasa?**
- Check implementasi `toggleLanguage()` di navigation
- Pastikan `window.location.reload()` dipanggil
- Check browser console untuk error

---

## 🌟 Features

- ✨ **Mudah digunakan** - Hanya 1 hook, 1 function
- 🔄 **Auto reload** - Ganti bahasa langsung reload
- 💾 **Persistent** - Bahasa tersimpan di localStorage
- 🎯 **Type-safe** - Full TypeScript support
- 🚀 **Performant** - Minimal overhead
- 📱 **Responsive** - Works di desktop & mobile

---

## 👨‍💻 Developed for BudayaKu App

Sistem translasi ini dibuat khusus untuk BudayaKu App dengan fokus pada:
- Kemudahan penggunaan
- Konsistensi di seluruh aplikasi
- Performance optimal
- Developer experience yang baik

**Happy Coding! 🎉**
