# Panduan Upload Image - Tersimpan di Database

## Overview

Image yang diupload akan **tersimpan di database** dengan path relatif dan file fisiknya tersimpan di storage.

---

## Cara Kerja Upload Image

### 1. **Upload Process**

Ketika user upload image:
```
User Upload File → Validasi → Save ke Storage → Save Path ke Database
```

**Detail:**
- File divalidasi (format: jpeg, png, jpg, webp; max: 2MB)
- File disimpan ke `storage/app/public/events/` atau `storage/app/public/cultures/`
- **Path relatif disimpan ke database** (contoh: `events/abc123.jpg`)

### 2. **Database Storage**

**Tabel: `events`**
```sql
CREATE TABLE events (
    id BIGINT PRIMARY KEY,
    title VARCHAR(255),
    ...
    image VARCHAR(255) NULL,  -- Path tersimpan di sini!
    ...
);
```

**Tabel: `cultures`**
```sql
CREATE TABLE cultures (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    ...
    image VARCHAR(255) NULL,  -- Path tersimpan di sini!
    ...
);
```

### 3. **Model Configuration**

**Event Model:**
```php
protected $fillable = [
    'event_category_id',
    'title',
    'description',
    'image',  // ✅ Sudah ada di fillable
    // ... other fields
];
```

**Culture Model:**
```php
protected $fillable = [
    'culture_category_id',
    'name',
    'region',
    'image',  // ✅ Sudah ada di fillable
    // ... other fields
];
```

---

## Controller Logic

### EventController

**Create (Store):**
```php
public function store(Request $request)
{
    $validated = $request->validate([
        'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        // ... other fields
    ]);

    if ($request->hasFile('image')) {
        // Save file dan dapat path
        $validated['image'] = $request->file('image')->store('events', 'public');
        // Path seperti: "events/xYz123AbC.jpg"
    }

    // ✅ Save ke database
    Event::create($validated);
}
```

**Update:**
```php
public function update(Request $request, Event $event)
{
    $validated = $request->validate([...]);

    if ($request->hasFile('image')) {
        // Delete old image
        if ($event->image && Storage::disk('public')->exists($event->image)) {
            Storage::disk('public')->delete($event->image);
        }
        // Save new image
        $validated['image'] = $request->file('image')->store('events', 'public');
    } else {
        // Keep old image (tidak overwrite)
        unset($validated['image']);
    }

    // ✅ Update database
    $event->update($validated);
}
```

**Delete:**
```php
public function destroy(Event $event)
{
    // Delete file dari storage
    if ($event->image && Storage::disk('public')->exists($event->image)) {
        Storage::disk('public')->delete($event->image);
    }

    // ✅ Delete record dari database (termasuk path image)
    $event->delete();
}
```

### CultureController

Logic yang sama seperti EventController, tapi untuk cultures:
- Store ke `storage/app/public/cultures/`
- Path tersimpan di kolom `image` tabel `cultures`

---

## Verifikasi Data Tersimpan

### 1. **Cek Database Langsung**

Gunakan database client (TablePlus, phpMyAdmin, etc):

```sql
-- Lihat semua events dengan image
SELECT id, title, image, created_at 
FROM events 
WHERE image IS NOT NULL;

-- Lihat semua cultures dengan image
SELECT id, name, image, created_at 
FROM cultures 
WHERE image IS NOT NULL;
```

**Expected Output:**
```
id | title              | image                        | created_at
---|--------------------|------------------------------|------------
1  | Festival Wayang    | events/a1b2c3d4e5.jpg       | 2025-11-13
2  | Tari Kecak         | events/f6g7h8i9j0.jpg       | 2025-11-13
```

### 2. **Cek via Tinker**

```bash
php artisan tinker
```

```php
// Lihat event dengan image
$events = App\Models\Event::whereNotNull('image')->get(['id', 'title', 'image']);
$events->toArray();

// Lihat culture dengan image
$cultures = App\Models\Culture::whereNotNull('image')->get(['id', 'name', 'image']);
$cultures->toArray();
```

### 3. **Cek via Browser DevTools**

1. Buka halaman Events/Cultures di browser
2. Buka DevTools (F12) → Network tab
3. Refresh halaman
4. Lihat request ke `/events/list` atau `/events/cultures`
5. Check response JSON, pastikan field `image` berisi path

**Example Response:**
```json
{
  "id": 1,
  "title": "Festival Wayang",
  "image": "events/a1b2c3d4e5.jpg",  // ✅ Path tersimpan
  "category": "Festival",
  ...
}
```

### 4. **Cek File Storage**

Pastikan file fisik ada di storage:

```bash
# List files di events folder
ls storage/app/public/events/

# List files di cultures folder
ls storage/app/public/cultures/
```

---

## Frontend Display

### Index Page (List)

**EventsIndex / CulturesIndex:**
```tsx
<img
    src={event.image || 'https://default-image.jpg'}
    alt={event.title}
/>
```

Karena di controller kita return:
```php
'image' => $event->image,  // Path dari database
```

### Show Page (Detail)

Image diakses via symbolic link:
```tsx
<img src={`/storage/${culture.image}`} />
```

**URL yang diakses:**
- `/storage/events/abc123.jpg` → Nyata ke `storage/app/public/events/abc123.jpg`
- `/storage/cultures/xyz789.jpg` → Nyata ke `storage/app/public/cultures/xyz789.jpg`

---

## Troubleshooting

### ❌ Image tidak tersimpan di database

**Cek:**
1. Apakah kolom `image` ada di migration? ✅
2. Apakah kolom `image` ada di `$fillable`? ✅
3. Apakah controller save data dengan benar? ✅
4. Cek error log: `storage/logs/laravel.log`

```bash
tail -f storage/logs/laravel.log
```

### ❌ Image tidak muncul di frontend

**Cek:**
1. Apakah storage link sudah dibuat?
   ```bash
   php artisan storage:link
   ```

2. Apakah file ada di storage?
   ```bash
   ls storage/app/public/events/
   ```

3. Apakah path benar di database?
   ```sql
   SELECT image FROM events WHERE id = 1;
   ```

4. Cek permission folder:
   ```bash
   chmod -R 775 storage
   ```

### ❌ Upload gagal

**Cek:**
1. PHP upload size di `php.ini`:
   ```ini
   upload_max_filesize = 2M
   post_max_size = 3M
   ```

2. Permission folder storage (harus writable):
   ```bash
   ls -la storage/app/public/
   ```

---

## Testing Upload

### Manual Test

1. **Buat Event/Culture Baru:**
   - Klik "Tambah Event/Budaya"
   - Upload image
   - Fill form
   - Submit

2. **Verifikasi:**
   ```bash
   # Cek database
   php artisan tinker
   >>> App\Models\Event::latest()->first()->image
   => "events/abc123.jpg"  // ✅ Tersimpan!

   # Cek file
   ls storage/app/public/events/
   => abc123.jpg  // ✅ File ada!
   ```

3. **Cek di Browser:**
   - Refresh halaman list
   - Image harus muncul
   - Inspect element, cek src image: `/storage/events/abc123.jpg`

---

## Summary

✅ **Database:**
- Kolom `image` ada di tabel `events` dan `cultures`
- Path tersimpan di database (contoh: `events/abc123.jpg`)
- Model sudah include `image` di `$fillable`

✅ **Storage:**
- File tersimpan di `storage/app/public/events/` atau `cultures/`
- Accessible via symbolic link `/storage/`

✅ **Controller:**
- Validasi file upload
- Save file ke storage
- Save path ke database
- Auto delete old image saat update/delete

✅ **Frontend:**
- Upload dengan drag & drop
- Preview before upload
- Display image dari `/storage/{path}`

**Semua sudah configured dengan benar! Data image PASTI tersimpan di database.** 🎉
