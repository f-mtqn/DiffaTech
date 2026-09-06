<div align="center">
  
  # DiffaTech
  ### Empowering Different Abilities in the Digital World
  
  [![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-success?style=for-the-badge)](https://[URL_DEMO])
  [![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://[URL_REPO])
  [![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
  
  **Submission for ITECHNO CUP 2026 - Web Development**
  
  **By BitTrio**
  
</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Unggulan](#-fitur-unggulan)
- [Demo & Screenshot](#-demo--screenshot)
- [Teknologi](#-teknologi)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Instalasi & Setup](#-instalasi--setup)
- [Penggunaan](#-penggunaan)
- [API Documentation](#-api-documentation)
- [Tim Developer](#-tim-developer)
- [Lisensi](#-lisensi)

---

## 👥 Tim Developer

| Nama | Peran | GitHub |
|------|-------|--------|
| **Mario Auliarahman** | Project Lead & Full Stack Developer | [GitHub](https://github.com/[username1]) |
| **Husnul Khotimah** | Frontend Developer | [GitHub](https://github.com/[username2]) |
| **Farabi Arafat Muttaqien** | Backend Developer | [GitHub](https://github.com/[username3]) |

---

## 🎯 Tentang Proyek

### Latar Belakang

Sektor teknologi berkembang pesat, namun inklusivitas bagi penyandang disabilitas masih tertinggal. Berdasarkan data **BPS (2023)**, tingkat partisipasi angkatan kerja disabilitas hanya **44%**, jauh di bawah non-disabilitas (69%). Hambatan utama pada platform karir konvensional adalah kurangnya fitur aksesibilitas (WCAG) dan minimnya informasi mengenai fasilitas pendukung di tempat kerja. **DiffaTech** hadir untuk memutus rantai diskriminasi ini di industri IT.

### Solusi yang Ditawarkan

**DiffaTech** adalah platform *professional networking* dan lowongan kerja khusus bidang IT yang dirancang dengan pendekatan **Accessibility-First**. Kami menghubungkan talenta disabilitas berbakat dengan perusahaan inklusif melalui fitur filtrasi kebutuhan khusus, verifikasi fasilitas kantor, dan antarmuka yang ramah bagi pengguna dengan berbagai keterbatasan.

### Tujuan Proyek

- 🎯 **Tujuan Utama**: Menciptakan ekosistem karir digital yang inklusif untuk mendukung target **SDG 8** (Pekerjaan Layak dan Pertumbuhan Ekonomi).
- 📊 **Target Pengguna**: Talenta IT disabilitas (Developer, Designer, dll) dan Perusahaan IT yang menjunjung tinggi inklusivitas.
- 💡 **Value Proposition**: Platform pertama di Indonesia yang mengkombinasikan spesialisasi industri IT dengan standar aksesibilitas digital (WCAG) dan fitur ramah disleksia.

---

## ✨ Fitur Unggulan

### Fitur Utama

| Fitur | Deskripsi | Keunggulan |
|----------|--------------|---------------|
| **Inclusive Job Matching** | Filter lowongan berdasarkan jenis disabilitas dan fasilitas pendukung. | Memastikan pelamar menemukan lingkungan kerja yang sesuai kebutuhan spesifik mereka. |
| **Dyslexia-Friendly Mode** | Pengaturan antarmuka khusus (font & spasi) untuk pengguna disleksia. | Meningkatkan keterbacaan dan kenyamanan navigasi bagi pengguna neurodivergent. |
| **Verified Inclusive Badge** | Label verifikasi untuk perusahaan yang terbukti inklusif. | Memberikan rasa aman dan kepercayaan tinggi bagi para pencari kerja disabilitas. |
| **Accessibility-First UI** | Antarmuka yang dioptimasi untuk *screen reader* dan navigasi keyboard. | Menghilangkan hambatan teknis saat proses pencarian dan pelamaran kerja. |

### Fitur Tambahan

- **Chat HRD Terintegrasi** - Komunikasi langsung antara kandidat dan rekruter untuk transparansi proses.
- **Accessibility Reviews** - Ulasan perusahaan dari sudut pandang karyawan disabilitas tentang fasilitas nyata di kantor.
- **Voice Search** - Pencarian lowongan menggunakan perintah suara untuk memudahkan pengguna dengan gangguan motorik.
- **Inclusive Resume Builder** - Pembuatan CV otomatis yang menonjolkan keahlian IT tanpa mengesampingkan kebutuhan aksesibilitas.



---

## 🛠️ Teknologi

### Tech Stack

#### Frontend
```
Framework      : React 
Styling        : Tailwind CSS
UI Components  : Schadcn/UI & Lucide React
Form Handling  : React Hook Form & Zod
```

#### Backend
```
Database     : PostgreSQL
ORM          : Prisma
Auth         : NextAuth
```

#### DevOps & Tools
```
Deployment     : Vercel
Package Manager: npm
```

### Alasan Pemilihan Teknologi

| Teknologi | Alasan Pemilihan |
|-----------|------------------|
| **Next.js** | Mendukung SSR untuk SEO yang lebih baik dan performa aksesibilitas yang cepat. |
| **Tailwind CSS** | Memudahkan kustomisasi tema untuk fitur High Contrast dan Dyslexia-friendly mode. |
| **PostgreSQL & Prisma** | Menjamin integritas data yang kompleks untuk relasi lowongan dan profil kandidat. |


### Dependencies Utama

```json
{
  "dependencies": {
    "[package-1]": "^x.x.x",
    "[package-2]": "^x.x.x",
    "[package-3]": "^x.x.x"
  }
}
```

---

## 🏗️ Arsitektur Sistem

### System Architecture

```
[Tambahkan diagram arsitektur sistem - bisa menggunakan Mermaid atau gambar]
```

### Database Schema

```
[Tambahkan diagram ERD atau schema database]
```

### Folder Structure

```
DiffaTech/
├── prisma/                 # Skema Database (Prisma ORM)
├── public/                 # Aset statis (logo, gambar disabilitas)
├── src/
│   ├── app/                # Routing Utama (Next.js App Router)
│   │   ├── (auth)/         # Grouping Login & Register
│   │   ├── (dashboard)/    # Grouping Dashboard User & Recruiter
│   │   ├── cari-lowongan/  # Halaman pencarian kerja
│   │   └── api/            # API Endpoints (jika tidak pakai Server Actions)
│   ├── components/
│   │   ├── ui/             # Komponen dasar Shadcn (Button, Input, Card, dll)
│   │   ├── shared/         # Komponen global (Navbar, Sidebar, Footer)
│   │   └── parts/          # Komponen spesifik fitur (JobCard, FilterBar)
│   ├── hooks/              # Custom hooks (useMobile, useAccessibility)
│   ├── lib/                # Konfigurasi utilitas (utils.ts, prisma.ts)
│   └── types/              # Definisi TypeScript interface
├── tailwind.config.js      # Konfigurasi desain (warna utama DiffaTech)
└── package.json            # Daftar dependensi utama
```

---

## ⚙️ Instalasi & Setup

### Prerequisites

Pastikan Anda telah menginstall:
- **Node.js** (v18.x atau lebih tinggi)
- **npm** atau **pnpm**
- **PostgreSQL** (Lokal atau Cloud seperti Supabase)


### Langkah Instalasi

#### 1️⃣ Clone Repository

```bash
git clone https://github.com/f-mtqn/DiffaTech.git
cd DiffaTech
```

#### 2️⃣ Install Dependencies

```bash
npm install
```

#### 3️⃣ Setup Environment Variables

Buat file `.env` di root directory:

```env
# .env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### 4️⃣ Setup Database

```bash
# Jalankan migrasi database
npm run db:migrate

# Seed data (opsional)
npm run db:seed
```

#### 5️⃣ Run Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

---

## 🚀 Penggunaan

### Menjalankan Aplikasi

```bash
# Development mode
npm run dev

# Production build
npm run build
npm run start

# Linting
npm run lint
```

### User Guide

#### Untuk Pengguna Umum

1. **Registrasi/Login**: Kunjungi halaman utama dan klik tombol "Daftar". Masukkan nama lengkap, email, dan password.
Jika sudah memiliki akun, klik "Masuk" dan gunakan email serta password terdaftar untuk mengakses dashboard.
2. **Pencarian Lowongan Inklusif**: Masuk ke menu "Cari Lowongan". Gunakan fitur pencarian di bagian atas untuk mencari posisi IT spesifik (contoh: "Frontend Developer").
Gunakan panel Filter di sisi kiri untuk menyaring pekerjaan berdasarkan rentang gaji, lokasi, sistem kerja (Remote/Full-time), serta kategori ramah disabilitas tertentu.
3. **Update Profil & Resume**: Klik menu "Update Profile" untuk melengkapi data diri, pengalaman kerja, dan pendidikan.
Penting: Pastikan mengisi bagian "Disabilitas" agar sistem dapat memberikan rekomendasi lowongan yang paling sesuai dengan kebutuhan aksesibilitas Anda. Unggah CV dan sertifikat pendukung untuk menarik perhatian rekruter.

#### Untuk Admin

1. **Akses Dashboard Rekruter**: Masuk menggunakan akun perusahaan melalui tombol "Daftar Perusahaan" atau login khusus rekruter.
Setelah login, Anda akan diarahkan ke Dashboard Utama yang menampilkan ringkasan jumlah pelamar, lowongan aktif, dan kandidat yang sedang diproses.
2. **Posting Lowongan Kerja Baru**: Pilih menu "Posting Lowongan Baru" di sidebar.
Isi detail pekerjaan meliputi Nama Posisi, Deskripsi, Jobdesk, serta kriteria minimum.
Tentukan jenis disabilitas yang dapat diakomodasi dan fasilitas pendukung yang tersedia di kantor Anda, lalu klik "Posting Kerja".
3. **Manajemen Pelamar & Seleksi**: Buka menu "Daftar Kandidat Saya" untuk melihat daftar pelamar pada setiap lowongan.
Klik "Lihat Kandidat" pada nama pelamar untuk meninjau detail profil, skill, dan sertifikat mereka secara mendalam.
Gunakan fitur "Chat HRD" untuk berinteraksi langsung dengan kandidat terpilih untuk proses interview lebih lanjut.

---

## 📚 API Documentation

### Base URL

```
Development: http://localhost:3000/api
Production:  https://[domain]/api
```

### Endpoints

#### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

#### [Resource 1]

```http
GET    /api/[resource]       # Get all
GET    /api/[resource]/:id   # Get by ID
POST   /api/[resource]       # Create
PUT    /api/[resource]/:id   # Update
DELETE /api/[resource]/:id   # Delete
```

### Example Request

```javascript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});
```

---

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

### Test Coverage

```
Statements   : XX%
Branches     : XX%
Functions    : XX%
Lines        : XX%
```

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE) - lihat file LICENSE untuk detail lebih lanjut.

---

<div align="center">

  **Made with ❤️ by BitTrio for ITECHNO CUP 2026**

  
</div>

