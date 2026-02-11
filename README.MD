# Aplikasi Lowongan Kerja

Aplikasi web untuk mengelola lowongan kerja dengan backend Laravel dan frontend Next.js.

## Gambaran Proyek

Proyek ini terdiri dari dua bagian utama:
- **Backend API** (Laravel): Menyediakan API untuk mengelola data lowongan kerja, menggunakan Laravel 12 dengan PHP 8.2+.
- **Frontend** (Next.js): Antarmuka pengguna untuk berinteraksi dengan API, menggunakan Next.js 16 dengan React 19.

## Prasyarat

Sebelum memulai, pastikan Anda memiliki perangkat lunak berikut terinstal di sistem Anda:

- **PHP** versi 8.2 atau lebih tinggi
- **Composer** (untuk manajemen dependensi PHP)
- **Node.js** versi 18 atau lebih tinggi
- **npm** (termasuk dalam Node.js)
- **Git** (untuk cloning repository jika diperlukan)

## Setup Proyek

1. **Clone repository** (jika belum):
   ```
   git clone <url-repository>
   cd dicoding-assessment
   ```

2. **Setup Backend (Laravel)**:
   - Masuk ke direktori backend:
     ```
     cd backend-api
     ```
   - Jalankan script setup yang telah disediakan:
     ```
     composer run setup
     ```
     Script ini akan:
     - Menginstall dependensi Composer
     - Membuat file `.env` jika belum ada
     - Generate application key
     - Menjalankan migrasi database
     - Menginstall dependensi npm
     - Build assets

3. **Setup Frontend (Next.js)**:
   - Masuk ke direktori frontend:
     ```
     cd ../frontend-app
     ```
   - Install dependensi:
     ```
     npm install
     ```

## Menjalankan Aplikasi

### Menjalankan Backend Laravel

Untuk menjalankan backend dalam mode development:

```
cd backend-api
php artisan serve
```

Server Laravel akan berjalan di http://localhost:8000 (atau port lain jika 8000 sudah digunakan).

**Catatan**: Jika Anda ingin menjalankan semua layanan development (server, queue, logs, Vite), gunakan:

```
composer run dev
```

### Menjalankan Frontend Next.js

Untuk menjalankan frontend dalam mode development:

```
cd frontend-app
npm run dev
```

Frontend akan berjalan di http://localhost:3000 (atau port lain jika 3000 sudah digunakan).

## Menjalankan Test

Proyek ini memiliki test untuk unit, integrasi, dan end-to-end.

### Test Backend (Laravel dengan PHPUnit)

- **Unit Test**: Menguji komponen individual.
- **Feature/Integration Test**: Menguji API endpoints dan integrasi.

Untuk menjalankan semua test backend:

```
cd backend-api
php artisan test
```

### Test Frontend (End-to-End dengan Playwright)

Untuk menjalankan test end-to-end:

```
cd frontend-app
npx playwright test
```

Untuk menjalankan test dengan UI browser:

```
npx playwright test --ui
```

## Struktur Proyek

```
dicoding-assessment/
├── backend-api/          # Laravel backend
│   ├── app/              # Kode aplikasi Laravel
│   ├── database/         # Migrasi dan seeders
│   ├── routes/           # Definisi routes API
│   ├── tests/            # Test PHPUnit
│   └── composer.json     # Dependensi PHP
├── frontend-app/         # Next.js frontend
│   ├── src/              # Kode sumber React
│   ├── tests/            # Test Playwright
│   └── package.json      # Dependensi Node.js
└── README.MD             # Dokumentasi ini
```

## Catatan Tambahan

- Pastikan database sudah dikonfigurasi dengan benar di file `.env` backend.
- Jika ada masalah, periksa log aplikasi atau jalankan test untuk debugging.
