# Translation System Guide

## Overview
Sistem translasi untuk BudayaKu App mendukung bahasa Indonesia (ID) dan English (EN). Bahasa yang dipilih akan disimpan di localStorage dan halaman akan reload otomatis saat bahasa diganti.

## Files Created

### 1. `/resources/js/utils/language.ts`
Utility functions untuk mengelola bahasa:
- `getLanguage()` - Ambil bahasa saat ini dari localStorage
- `setLanguage(lang)` - Set bahasa baru
- `toggleLanguage()` - Toggle antara ID/EN dan reload page
- `useLanguage()` - Hook untuk get bahasa saat ini

### 2. `/resources/js/translations/index.ts`
File utama yang berisi semua teks translasi:
- `translations` - Object berisi semua teks dalam ID dan EN
- `t(key)` - Function untuk translate single key
- `useTranslation()` - Hook yang return `{ t, lang }`

## How to Use

### 1. Import Translation Hook
```typescript
import { useTranslation } from '@/translations';

export default function MyPage() {
    const { t, lang } = useTranslation();
    
    return (
        <div>
            <h1>{t('welcomeTitle')}</h1>
            <p>{t('welcomeSubtitle')}</p>
        </div>
    );
}
```

### 2. Add New Translation Keys
Edit `/resources/js/translations/index.ts` dan tambahkan key baru:

```typescript
export const translations = {
    id: {
        // ... existing keys
        myNewKey: 'Teks dalam Bahasa Indonesia',
    },
    en: {
        // ... existing keys
        myNewKey: 'Text in English',
    },
};
```

### 3. Conditional Content Based on Language
```typescript
import { useTranslation } from '@/translations';

export default function MyPage() {
    const { t, lang } = useTranslation();
    
    return (
        <div>
            <h1>{t('title')}</h1>
            {lang === 'id' ? (
                <p>Konten khusus Indonesia</p>
            ) : (
                <p>English specific content</p>
            )}
        </div>
    );
}
```

### 4. Using in Components
```typescript
import { useTranslation } from '@/translations';

export function MyComponent() {
    const { t } = useTranslation();
    
    return (
        <button>{t('submit')}</button>
    );
}
```

## Available Translation Keys

### Navigation
- `home`, `culture`, `event`, `shop`, `about`
- `search`, `dashboard`, `login`, `register`, `logout`

### Welcome Page
- `welcomeTitle`, `welcomeSubtitle`
- `exploreNow`, `learnMore`, `watchVideo`
- `discoverCulture`, `upcomingEvents`, `localProducts`
- `viewAll`, `readMore`

### About Page
- `aboutUs`, `ourMission`, `ourVision`, `ourTeam`
- `ourValues`, `whyChooseUs`, `getStarted`, `contactUs`

### Culture Page
- `indonesianCulture`, `exploreRegions`
- `traditionalArts`, `culturalHeritage`, `localWisdom`

### Events Page
- `culturalEvents`, `festivalCalendar`, `joinEvent`
- `eventDetails`, `eventDate`, `eventLocation`, `eventPrice`, `freeEntry`

### Products/Store
- `featuredProducts`, `handicrafts`, `traditionalClothing`
- `addToCart`, `buyNow`, `outOfStock`

### Common
- `loading`, `error`, `success`
- `cancel`, `save`, `delete`, `edit`, `close`
- `back`, `next`, `previous`, `submit`

### Search
- `searchPlaceholder`, `searchResults`, `noResults`
- `searchComingSoon`, `searching`

### Footer
- `followUs`, `copyright`, `allRightsReserved`
- `privacyPolicy`, `termsOfService`

### Stats
- `cultures`, `events`, `products`, `users`, `visitors`

### Categories
- `categories`, `allCategories`
- `music`, `dance`, `art`, `culinary`
- `traditional`, `modern`

## Language Toggle Button
Sudah terimplementasi di `welcome-navigation.tsx`:
- Desktop: Button dengan icon Languages + kode bahasa (ID/EN)
- Mobile: Panel dengan toggle button
- Saat diklik akan reload page dengan bahasa baru

## Testing
1. Buka aplikasi di browser
2. Klik tombol language toggle (EN/ID)
3. Page akan reload dan semua teks berubah
4. Refresh page - bahasa tetap tersimpan
5. Navigate ke page lain - bahasa tetap konsisten

## Example Implementation

### Update Welcome Page
```typescript
import { useTranslation } from '@/translations';

export default function Welcome() {
    const { t, lang } = useTranslation();
    
    return (
        <>
            <Head title={t('home')} />
            <div>
                <h1>{t('welcomeTitle')}</h1>
                <p>{t('welcomeSubtitle')}</p>
                <button>{t('exploreNow')}</button>
            </div>
        </>
    );
}
```

### Update About Page
```typescript
import { useTranslation } from '@/translations';

export default function About() {
    const { t } = useTranslation();
    
    return (
        <>
            <Head title={t('aboutUs')} />
            <div>
                <h1>{t('aboutUs')}</h1>
                <section>
                    <h2>{t('ourMission')}</h2>
                    <p>...</p>
                </section>
                <section>
                    <h2>{t('ourVision')}</h2>
                    <p>...</p>
                </section>
            </div>
        </>
    );
}
```

## Best Practices

1. **Always use translation keys**: Jangan hardcode teks, gunakan translation keys
2. **Add both languages**: Saat add key baru, selalu add di ID dan EN
3. **Keep keys semantic**: Gunakan nama key yang jelas (e.g., `submitButton` bukan `btn1`)
4. **Group related keys**: Organize keys by feature/section
5. **Test both languages**: Selalu test tampilan di kedua bahasa

## Extending Translations

Untuk add kategori translasi baru:

1. Edit `/resources/js/translations/index.ts`
2. Add keys baru di section yang sesuai
3. Update type `TranslationKey` akan auto-update
4. Use `t('yourNewKey')` di component

## Troubleshooting

### Language not persisting
- Check localStorage: `localStorage.getItem('language')`
- Clear cache dan reload

### Translation not showing
- Verify key exists di translations object
- Check console for TypeScript errors
- Ensure `useTranslation()` dipanggil di component

### Page not reloading on language change
- Check `toggleLanguage()` implementation
- Ensure `window.location.reload()` dipanggil
- Check browser console for errors

## Notes
- Default language: Indonesian (ID)
- Language stored in: localStorage key `'language'`
- Page reloads automatically on language change
- All navigation items support translation
- Search functionality supports both languages
