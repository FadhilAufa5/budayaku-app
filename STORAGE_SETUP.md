# Storage Setup untuk Upload Image

## Langkah-langkah Setup

### 1. Buat Symbolic Link untuk Storage

Jalankan command berikut untuk membuat symbolic link dari `storage/app/public` ke `public/storage`:

```bash
php artisan storage:link
```

Command ini akan membuat symbolic link sehingga file yang diupload ke `storage/app/public` dapat diakses dari browser melalui `/storage`.

### 2. Struktur Folder

Setelah menjalankan command di atas, struktur folder akan seperti ini:

```
storage/
├── app/
│   └── public/
│       ├── events/          # Folder untuk menyimpan gambar event
│       │   ├── image1.jpg
│       │   └── image2.png
│       └── cultures/        # Folder untuk menyimpan gambar budaya
│           ├── image1.jpg
│           └── image2.png
public/
└── storage/                 # Symbolic link ke storage/app/public
    ├── events/
    └── cultures/
```

### 3. Cara Upload Image

Di EventDialog dan CultureDialog, sekarang Anda dapat:
- Klik area upload atau drag & drop file
- File yang didukung: PNG, JPG, JPEG, WEBP
- Maksimal ukuran file: 2MB
- File akan otomatis tersimpan di:
  - Events: `storage/app/public/events/`
  - Cultures: `storage/app/public/cultures/`

### 4. Mengakses Image

Image yang diupload dapat diakses melalui:
```
/storage/events/nama-file.jpg      # Untuk event
/storage/cultures/nama-file.jpg    # Untuk budaya
```

Controller akan otomatis menyimpan path relatif ke database:
- Events: `events/nama-file.jpg`
- Cultures: `cultures/nama-file.jpg`

### 5. Troubleshooting

#### Jika gambar tidak muncul:
1. Pastikan storage link sudah dibuat: `php artisan storage:link`
2. Periksa permission folder storage: `chmod -R 775 storage`
3. Periksa apakah file ada di `storage/app/public/events/`

#### Jika upload gagal:
1. Periksa PHP max upload size di `php.ini`:
   - `upload_max_filesize = 2M`
   - `post_max_size = 3M`
2. Periksa permission folder storage: harus writable

## Perubahan Code

### Frontend
**event-dialog.tsx:**
- Input URL diganti dengan file upload
- Preview image sebelum upload
- Button untuk remove image

**culture-dialog.tsx:**
- Input URL diganti dengan file upload
- Preview image sebelum upload
- Button untuk remove image

### Backend
**EventController.php:**
- Validasi file image (jpeg, png, jpg, webp)
- Auto delete old image saat update
- Auto delete image saat delete event
- Store file di `storage/app/public/events/`

**CultureController.php:**
- Validasi file image (jpeg, png, jpg, webp)
- Auto delete old image saat update
- Auto delete image saat delete culture
- Store file di `storage/app/public/cultures/`
