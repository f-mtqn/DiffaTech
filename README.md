<div align="center">
  
  # DiffaTech
  ### Empowering Different Abilities in the Digital World
  
  [![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-success?style=for-the-badge)](https://diffatech.vercel.app/)
  [![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/f-mtqn/DiffaTech)
  [![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
  
  **Submission for ITECHNO CUP 2026 - Web Development**
  
  **By ByteTrio**
  
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
- [Testing](#-testing)
- [Tim Developer](#-tim-developer)
- [Lisensi](#-lisensi)

---

## 👥 Tim Developer

| Nama | Peran | GitHub |
|------|-------|--------|
| **Mario Auliarahman** | Project Lead & Full Stack Developer | [GitHub](https://github.com/sayaio) |
| **Husnul Khotimah** | Frontend Developer | [GitHub](https://github.com/nullhma-lgtm) |
| **Farabi Arafat Muttaqien** | Backend Developer | [GitHub](https://github.com/f-mtqn) |

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

## 📸 Demo & Screenshot

### Live Demo

🔗 **[Kunjungi Website](https://diffatech.vercel.app/)**

### Screenshot Aplikasi

📸 **[https://drive.google.com/drive/folders/19eEu8XY1e-X1faqQ3vqhpZiy0pA7icTG]

### Video Demo

📹 **[https://drive.google.com/drive/folders/19eEu8XY1e-X1faqQ3vqhpZiy0pA7icTG](#)** _(segera hadir)_

---

## 🛠️ Teknologi

### Tech Stack

#### Frontend
```
Framework    : React 19
Routing      : React Router DOM v7
Styling      : Tailwind CSS v4
UI Components: Lucide React
Build Tool   : Vite 8
```

#### Backend & Database
```
Database     : PostgreSQL (via Supabase)
BaaS         : Supabase (Auth, Storage, Realtime)
ORM          : Prisma
Auth         : Supabase Auth (JWT)
```

#### DevOps & Tools
```
Deployment   : Vercel
Package Mgr  : npm
Linting      : Oxlint
Version Ctrl : Git & GitHub
```

### Alasan Pemilihan Teknologi

| Teknologi | Alasan Pemilihan |
|-----------|------------------|
| **React 19** | Library UI paling mature dengan ekosistem luas; mendukung pengembangan antarmuka aksesibel secara native melalui ARIA attributes. |
| **Tailwind CSS v4** | Memudahkan kustomisasi tema untuk fitur High Contrast Mode dan Dyslexia-friendly mode tanpa overhead CSS tambahan. |
| **Supabase** | Menyediakan PostgreSQL managed, Auth, dan Realtime out-of-the-box sehingga tim dapat fokus pada fitur aksesibilitas tanpa mengelola infrastruktur server. |
| **Vite 8** | Build tool modern dengan HMR yang sangat cepat untuk produktivitas pengembangan yang tinggi. |
| **React Router DOM v7** | Penanganan routing client-side yang powerful dengan data loaders untuk pengalaman navigasi yang mulus. |

### Dependencies Utama

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.112.3",
    "lucide-react": "^1.34.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router-dom": "^7.18.2"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "@vitejs/plugin-react": "^6.0.4",
    "tailwindcss": "^4.3.3",
    "vite": "^8.2.0",
    "oxlint": "^1.75.0"
  }
}
```

---

## 🏗️ Arsitektur Sistem

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      User Browser                       │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTPS
                        ▼
┌─────────────────────────────────────────────────────────┐
│                   Vercel CDN (React App)                │
│                     Vite + React 19                     │
└───────────┬─────────────────────────────────────────────┘
            │ Supabase JS SDK
            ▼
┌─────────────────────────────────────────────────────────┐
│                        Supabase                         │
│  ┌──────────────┐  ┌───────────┐  ┌──────────────────┐  │
│  │  PostgreSQL  │  │   Auth    │  │  Realtime/Storage│  │
│  │  (Database)  │  │  (JWT)    │  │  (Chat & Files)  │  │
│  └──────────────┘  └───────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Database Schema (Ringkasan)

```
users ──────────── profiles
  │                    │
  │               disabilities (M:N via user_disabilities)
  │
  ├── applications ── jobs ── companies
  │                    │
  │              job_disabilities (M:N)
  │              job_facilities (M:N)
  │
  └── reviews ──────── companies
```

### Folder Structure

```
DiffaTech/
├── backend/
│   └── migrations/         # Skema & migrasi database (Supabase SQL)
├── public/
│   └── screenshots/        # Aset publik & screenshot
├── src/
│   ├── assets/             # Gambar, ikon, dan aset statis
│   ├── components/         # Komponen UI yang dapat digunakan ulang
│   ├── context/            # React Context (Auth, Accessibility, Theme)
│   ├── data/               # Data statis / mock data
│   ├── pages/              # Komponen halaman (setiap route)
│   ├── utils/              # Fungsi utilitas & Supabase client helper
│   ├── App.jsx             # Root component & konfigurasi routing
│   ├── main.jsx            # Entry point aplikasi
│   └── index.css           # Global styles & Tailwind directives
├── .env                    # Environment variables (tidak di-commit)
├── .gitignore
├── index.html              # HTML template
├── package.json
├── vite.config.js          # Konfigurasi Vite
└── README.md
```

---

## ⚙️ Instalasi & Setup

### Prerequisites

Pastikan Anda telah menginstall:
- **Node.js** (v18.x atau lebih tinggi)
- **npm** (v9.x atau lebih tinggi)
- **Git**

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

#### 3️⃣ Run Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

---

## 🚀 Penggunaan

### Menjalankan Aplikasi

```bash
# Development mode
npm run dev
```

### User Guide

#### Untuk Pencari Kerja (Talent)

1. **Registrasi/Login**: Kunjungi halaman utama dan klik tombol **"Daftar"**. Masukkan nama lengkap, email, dan password. Jika sudah memiliki akun, klik **"Masuk"** untuk mengakses dashboard.
2. **Pencarian Lowongan Inklusif**: Masuk ke menu **"Cari Lowongan"**. Gunakan fitur pencarian untuk mencari posisi IT spesifik (contoh: "Frontend Developer"). Gunakan panel Filter untuk menyaring berdasarkan rentang gaji, lokasi, sistem kerja (Remote/Full-time), dan kategori ramah disabilitas.
3. **Update Profil & Resume**: Klik menu **"Update Profile"** untuk melengkapi data diri, pengalaman kerja, dan pendidikan. Isi bagian **"Disabilitas"** agar sistem memberikan rekomendasi lowongan yang sesuai kebutuhan aksesibilitas Anda.

#### Untuk Perusahaan (Rekruter)

1. **Akses Dashboard Rekruter**: Masuk menggunakan akun perusahaan melalui tombol **"Daftar Perusahaan"**. Setelah login, Anda akan diarahkan ke Dashboard yang menampilkan ringkasan pelamar dan lowongan aktif.
2. **Posting Lowongan Kerja Baru**: Pilih menu **"Posting Lowongan Baru"** di sidebar. Isi detail pekerjaan, tentukan jenis disabilitas yang dapat diakomodasi, dan fasilitas pendukung yang tersedia, lalu klik **"Posting Kerja"**.
3. **Manajemen Pelamar & Seleksi**: Buka menu **"Daftar Kandidat Saya"** untuk melihat daftar pelamar. Gunakan fitur **"Chat HRD"** untuk berinteraksi langsung dengan kandidat terpilih.

---

## 📚 API Documentation

### Base URL

```
Development: http://localhost:5173
Production:  https://diffatech.vercel.app/
```

> DiffaTech menggunakan **Supabase** sebagai backend-as-a-service. Semua operasi data dilakukan melalui Supabase Client SDK langsung dari frontend.

### Supabase Endpoints (via Client SDK)

#### Authentication

```javascript
// Register
await supabase.auth.signUp({ email, password })

// Login
await supabase.auth.signInWithPassword({ email, password })

// Logout
await supabase.auth.signOut()

// Get current user
await supabase.auth.getUser()
```

#### Jobs (Lowongan)

```javascript
// Get all active jobs
supabase.from('jobs').select('*, companies(*)').eq('is_active', true)

// Get job by ID
supabase.from('jobs').select('*').eq('id', jobId).single()

// Create job (rekruter only)
supabase.from('jobs').insert({ title, description, company_id, ...rest })

// Update job
supabase.from('jobs').update({ ...jobData }).eq('id', jobId)

// Delete job
supabase.from('jobs').delete().eq('id', jobId)
```

#### Applications (Lamaran)

```javascript
// Get applications for a job
supabase.from('applications').select('*, profiles(*)').eq('job_id', jobId)

// Submit application
supabase.from('applications').insert({ job_id, user_id, cover_letter })
```

### Example Request

```javascript
// Fetch inclusive job listings with disability filter
const { data, error } = await supabase
  .from('jobs')
  .select(`
    *,
    companies (*),
    job_disabilities (disability_types (*))
  `)
  .eq('is_active', true)
  .order('created_at', { ascending: false });

if (error) console.error(error);
else console.log(data);
```

---

## 🧪 Testing

### Running Tests

```bash
# Linting (static analysis)
npm run lint

# Build check (pastikan tidak ada error saat build)
npm run build
```

> Pengujian unit dan E2E sedang dalam pengembangan. Kontribusi untuk menambahkan test suite sangat disambut.

### Manual Testing Checklist

```
✅ Registrasi & Login (Talent & Rekruter)
✅ Pencarian lowongan dengan filter disabilitas
✅ Submit lamaran kerja
✅ Posting lowongan (Rekruter)
✅ Dyslexia-Friendly Mode toggle
✅ Navigasi keyboard (Tab & Enter)
✅ Kompatibilitas screen reader (NVDA/VoiceOver)
✅ Chat HRD (dalam pengembangan)
⬜ Voice Search (dalam pengembangan)
```

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE) - lihat file LICENSE untuk detail lebih lanjut.

---

<div align="center">

  **Made with ❤️ by ByteTrio for ITECHNO CUP 2026**

</div>
