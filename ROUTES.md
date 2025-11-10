# BudayaKu App - Routes Documentation

## 📋 Daftar Routes

Semua routes di bawah ini memerlukan authentication (`auth` middleware) dan email verification (`verified` middleware).

### 🏠 Dashboard
- **GET** `/dashboard` - Halaman dashboard utama

---

### 🎭 Eksplorasi Budaya
**Prefix:** `/events`

| Method | Route | Controller | View | Description |
|--------|-------|------------|------|-------------|
| GET | `/events/cultures` | `CultureController@index` | `cultures/index` | Daftar semua budaya Indonesia |
| GET | `/events/culture-categories` | `CultureCategoryController@index` | `cultures/categories` | Kategori budaya |
| GET | `/events/culture-reviews` | `CultureReviewController@index` | `cultures/reviews` | Review dan rating budaya |

---

### 📅 Agenda & Event
**Prefix:** `/events`

| Method | Route | Controller | View | Description |
|--------|-------|------------|------|-------------|
| GET | `/events/list` | `EventController@index` | `events/index` | Daftar semua event |
| GET | `/events/categories` | `EventCategoryController@index` | `events/categories` | Kategori event |
| GET | `/events/schedule` | `EventScheduleController@index` | `events/schedule` | Jadwal event (calendar view) |

---

### 🛍️ Toko Budaya
**Prefix:** `/store`

| Method | Route | Controller | View | Description |
|--------|-------|------------|------|-------------|
| GET | `/store/products` | `ProductController@index` | `store/products` | Daftar produk budaya |
| GET | `/store/categories` | `ProductCategoryController@index` | `store/categories` | Kategori produk |
| GET | `/store/orders` | `OrderController@index` | `store/orders` | Kelola pesanan |
| GET | `/store/reports` | `ReportController@index` | `store/reports` | Laporan penjualan & analytics |

---

### 👥 User Management
**Prefix:** (none)

| Method | Route | Controller | View | Description |
|--------|-------|------------|------|-------------|
| GET | `/users` | `UserController@index` | `users/index` | Daftar semua user |
| GET | `/roles` | `RoleController@index` | `users/roles` | Kelola roles & permissions |

---

## 🎨 Sidebar Navigation Structure

```
Dashboard
└─ /dashboard

Eksplorasi Budaya
├─ Daftar Budaya → /events/cultures
├─ Kategori Budaya → /events/culture-categories
└─ Review Budaya → /events/culture-reviews

Agenda & Event
├─ Daftar Event → /events/list
├─ Kategori Event → /events/categories
└─ Jadwal Event → /events/schedule

Toko Budaya
├─ Produk → /store/products
├─ Kategori Produk → /store/categories
├─ Pesanan → /store/orders
└─ Laporan Penjualan → /store/reports

User Management
├─ User List → /users
└─ Roles & Permissions → /roles
```

---

## 🔧 Controller Locations

```
app/Http/Controllers/
├── Cultures/
│   ├── CultureController.php
│   ├── CultureCategoryController.php
│   └── CultureReviewController.php
├── Events/
│   ├── EventController.php
│   ├── EventCategoryController.php
│   └── EventScheduleController.php
├── Store/
│   ├── ProductController.php
│   ├── ProductCategoryController.php
│   ├── OrderController.php
│   └── ReportController.php
└── Users/
    ├── UserController.php
    └── RoleController.php
```

---

## 📝 Page Locations

```
resources/js/pages/
├── cultures/
│   ├── index.tsx
│   ├── categories.tsx
│   └── reviews.tsx
├── events/
│   ├── index.tsx
│   ├── categories.tsx
│   └── schedule.tsx
├── store/
│   ├── products.tsx
│   ├── categories.tsx
│   ├── orders.tsx
│   └── reports.tsx
└── users/
    ├── index.tsx
    └── roles.tsx
```

---

## 🚀 Generated Routes (Wayfinder)

Routes TypeScript helpers telah di-generate di:
```
resources/js/routes/
```

Cara menggunakan:
```typescript
import { cultures, events, products, users } from '@/routes';

// Navigate to cultures list
<Link href={cultures.index()}>Daftar Budaya</Link>

// Navigate to event schedule
<Link href={eventSchedule.index()}>Jadwal Event</Link>
```

---

## ⚡ Quick Start

1. **Generate routes setelah update:**
   ```bash
   php artisan wayfinder:generate
   ```

2. **Build frontend:**
   ```bash
   npm run build
   ```

3. **Development server:**
   ```bash
   npm run dev
   ```

---

## 📌 Notes

- Semua halaman saat ini menggunakan **data dummy** di frontend
- Controller hanya mengembalikan view Inertia tanpa data
- Siap untuk integrasi dengan database dan API
- Semua design sudah responsive (mobile & desktop)
- Dark mode support sudah tersedia
