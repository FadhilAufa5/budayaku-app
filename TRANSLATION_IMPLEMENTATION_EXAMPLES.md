# Translation Implementation Examples

## Quick Start - 3 Steps

### 1. Import the hook
```typescript
import { useTranslation } from '@/translations';
```

### 2. Use in component
```typescript
const { t, lang } = useTranslation();
```

### 3. Replace hardcoded text
```typescript
// Before:
<h1>Jelajahi Budaya Indonesia</h1>

// After:
<h1>{t('welcomeTitle')}</h1>
```

---

## Example 1: Simple Page Component

```typescript
import { Head } from '@inertiajs/react';
import { useTranslation } from '@/translations';
import { WelcomeNavigation } from '@/components/welcome-navigation';

export default function MyPage() {
    const { t } = useTranslation();
    
    return (
        <>
            <Head title={t('home')} />
            <WelcomeNavigation />
            
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold">
                    {t('welcomeTitle')}
                </h1>
                <p className="mt-4 text-lg">
                    {t('welcomeSubtitle')}
                </p>
                
                <button className="mt-6 rounded-lg bg-amber-600 px-6 py-3 text-white">
                    {t('exploreNow')}
                </button>
            </div>
        </>
    );
}
```

---

## Example 2: Conditional Content by Language

```typescript
import { useTranslation } from '@/translations';

export default function AboutPage() {
    const { t, lang } = useTranslation();
    
    return (
        <div>
            <h1>{t('aboutUs')}</h1>
            
            {/* Different content for each language */}
            {lang === 'id' ? (
                <div>
                    <p>BudayaKu adalah platform yang didedikasikan untuk 
                    melestarikan dan mempromosikan kekayaan budaya Indonesia.</p>
                    <p>Bergabunglah dengan kami dalam perjalanan mengagumkan 
                    untuk mengeksplorasi keindahan nusantara.</p>
                </div>
            ) : (
                <div>
                    <p>BudayaKu is a platform dedicated to preserving and 
                    promoting the richness of Indonesian culture.</p>
                    <p>Join us on an amazing journey to explore the beauty 
                    of the archipelago.</p>
                </div>
            )}
        </div>
    );
}
```

---

## Example 3: Reusable Component with Translation

```typescript
import { useTranslation } from '@/translations';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
    name: string;
    nameEn: string;
    price: number;
    inStock: boolean;
}

export function ProductCard({ name, nameEn, price, inStock }: ProductCardProps) {
    const { t, lang } = useTranslation();
    
    return (
        <div className="rounded-lg border p-4">
            <h3 className="text-xl font-bold">
                {lang === 'id' ? name : nameEn}
            </h3>
            
            <p className="mt-2 text-2xl font-semibold">
                Rp {price.toLocaleString('id-ID')}
            </p>
            
            {inStock ? (
                <button className="mt-4 w-full rounded bg-amber-600 py-2 text-white">
                    <ShoppingBag className="mr-2 inline h-4 w-4" />
                    {t('addToCart')}
                </button>
            ) : (
                <button disabled className="mt-4 w-full rounded bg-gray-400 py-2 text-white">
                    {t('outOfStock')}
                </button>
            )}
        </div>
    );
}
```

---

## Example 4: Event List with Translation

```typescript
import { useTranslation } from '@/translations';
import { CalendarDays, MapPin } from 'lucide-react';

interface Event {
    id: number;
    title: string;
    titleEn: string;
    description: string;
    descriptionEn: string;
    date: string;
    location: string;
    isFree: boolean;
    price?: number;
}

export default function EventsList({ events }: { events: Event[] }) {
    const { t, lang } = useTranslation();
    
    return (
        <div>
            <h1 className="text-4xl font-bold">{t('culturalEvents')}</h1>
            <p className="mt-2 text-gray-600">{t('upcomingEvents')}</p>
            
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <div key={event.id} className="rounded-lg border p-6">
                        <h3 className="text-xl font-bold">
                            {lang === 'id' ? event.title : event.titleEn}
                        </h3>
                        
                        <p className="mt-2 text-gray-600">
                            {lang === 'id' ? event.description : event.descriptionEn}
                        </p>
                        
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <CalendarDays className="h-4 w-4" />
                                <span>{t('eventDate')}: {event.date}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4" />
                                <span>{t('eventLocation')}: {event.location}</span>
                            </div>
                            
                            <div className="text-sm font-semibold">
                                {t('eventPrice')}: {event.isFree ? t('freeEntry') : `Rp ${event.price?.toLocaleString('id-ID')}`}
                            </div>
                        </div>
                        
                        <button className="mt-4 w-full rounded bg-amber-600 py-2 text-white">
                            {t('joinEvent')}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
```

---

## Example 5: Form with Translation

```typescript
import { useTranslation } from '@/translations';
import { useForm } from '@inertiajs/react';

export default function ContactForm() {
    const { t } = useTranslation();
    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        message: '',
    });
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact');
    };
    
    return (
        <form onSubmit={handleSubmit} className="max-w-md">
            <h2 className="text-2xl font-bold">{t('contactUs')}</h2>
            
            <div className="mt-4">
                <label className="block text-sm font-medium">
                    {t('name')}
                </label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 w-full rounded border px-3 py-2"
                    required
                />
            </div>
            
            <div className="mt-4">
                <label className="block text-sm font-medium">
                    {t('email')}
                </label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="mt-1 w-full rounded border px-3 py-2"
                    required
                />
            </div>
            
            <div className="mt-4">
                <label className="block text-sm font-medium">
                    {t('message')}
                </label>
                <textarea
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    className="mt-1 w-full rounded border px-3 py-2"
                    rows={4}
                    required
                />
            </div>
            
            <button
                type="submit"
                disabled={processing}
                className="mt-6 rounded bg-amber-600 px-6 py-2 text-white disabled:bg-gray-400"
            >
                {processing ? t('loading') : t('submit')}
            </button>
        </form>
    );
}
```

---

## Example 6: Navigation with Stats

```typescript
import { useTranslation } from '@/translations';
import { Globe, Calendar, ShoppingBag, Users } from 'lucide-react';

interface StatsProps {
    culturesCount: number;
    eventsCount: number;
    productsCount: number;
    usersCount: number;
}

export function StatsSection({ culturesCount, eventsCount, productsCount, usersCount }: StatsProps) {
    const { t } = useTranslation();
    
    const stats = [
        { icon: Globe, value: culturesCount, label: t('cultures') },
        { icon: Calendar, value: eventsCount, label: t('events') },
        { icon: ShoppingBag, value: productsCount, label: t('products') },
        { icon: Users, value: usersCount, label: t('users') },
    ];
    
    return (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
                <div key={index} className="text-center">
                    <stat.icon className="mx-auto h-12 w-12 text-amber-600" />
                    <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                    <p className="text-gray-600">{stat.label}</p>
                </div>
            ))}
        </div>
    );
}
```

---

## Example 7: Search Component

```typescript
import { useTranslation } from '@/translations';
import { Search } from 'lucide-react';
import { useState } from 'react';

export function SearchBar() {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [searching, setSearching] = useState(false);
    
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setSearching(true);
        
        // Your search logic here
        await fetch(`/api/search?q=${query}`);
        
        setSearching(false);
    };
    
    return (
        <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full rounded-lg border py-2 pl-10 pr-4 focus:border-amber-500 focus:outline-none"
            />
            
            {searching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-600 border-t-transparent" />
                </div>
            )}
        </form>
    );
}
```

---

## Example 8: Modal/Dialog with Translation

```typescript
import { useTranslation } from '@/translations';
import { X } from 'lucide-react';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }: ConfirmDialogProps) {
    const { t } = useTranslation();
    
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                
                <p className="mt-4 text-gray-600">{message}</p>
                
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                        {t('cancel')}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
                    >
                        {t('confirm')}
                    </button>
                </div>
            </div>
        </div>
    );
}
```

---

## Adding New Translation Keys

When you need a new translation that doesn't exist:

1. Open `/resources/js/translations/index.ts`
2. Add your key to both `id` and `en` objects:

```typescript
export const translations = {
    id: {
        // ... existing keys
        myNewFeature: 'Fitur Baru Saya',
        welcomeMessage: 'Selamat datang di BudayaKu',
        description: 'Platform budaya Indonesia terlengkap',
    },
    en: {
        // ... existing keys
        myNewFeature: 'My New Feature',
        welcomeMessage: 'Welcome to BudayaKu',
        description: 'The most complete Indonesian culture platform',
    },
};
```

3. Use it in your component:

```typescript
const { t } = useTranslation();

<h1>{t('myNewFeature')}</h1>
<p>{t('welcomeMessage')}</p>
<p>{t('description')}</p>
```

---

## Tips & Best Practices

1. **Always add TypeScript types** - The system auto-generates types
2. **Keep keys semantic** - Use descriptive names like `submitButton` not `btn1`
3. **Group related keys** - Organize by feature/page
4. **Test both languages** - Switch language and verify all text displays correctly
5. **Use existing keys** - Check if a key already exists before adding new ones
6. **Handle plurals** - For now, add separate keys: `item` and `items`
7. **Date/Number formatting** - Use `toLocaleString()` for proper formatting

---

## Common Patterns

### Button States
```typescript
<button disabled={loading}>
    {loading ? t('loading') : t('submit')}
</button>
```

### Error Messages
```typescript
{error && <p className="text-red-600">{t('error')}</p>}
{success && <p className="text-green-600">{t('success')}</p>}
```

### Empty States
```typescript
{items.length === 0 ? (
    <p>{t('noResults')}</p>
) : (
    items.map(item => ...)
)}
```

### Loading States
```typescript
{isLoading ? (
    <div>{t('loading')}</div>
) : (
    <div>{content}</div>
)}
```
