# DiffaTech — Backend (Supabase)

## Struktur Folder

```
backend/
├── migrations/        # File SQL schema database
│   ├── 001_profiles_and_trigger.sql
│   ├── 002_job_seeker_profiles.sql
│   ├── 003_job_listings_and_applications.sql
│   └── 004_notifications_and_chat.sql
├── seed/
│   ├── seed_job_seeker.sql    # Dummy data user pencari kerja
│   └── seed_job_listings.sql  # Dummy data lowongan kerja
└── README.md
```

## Koneksi Supabase

- **Project:** DiffaTech
- **URL:** `https://khupozasdweezkanqxdt.supabase.co`
- **Region:** ap-southeast-2

## Tabel-Tabel (Pencari Kerja)

| Tabel | Keterangan |
|---|---|
| `profiles` | Data dasar semua user. Auto-dibuat via trigger saat user daftar |
| `job_seeker_profiles` | Detail profil pencari kerja (bio, alamat, disabilitas, dll) |
| `experiences` | Riwayat pengalaman kerja |
| `certifications` | Sertifikasi |
| `user_skills` | Keahlian/skill |
| `job_listings` | Lowongan kerja dari perusahaan |
| `job_skills` | Skill yang dibutuhkan tiap lowongan |
| `applications` | Lamaran yang dikirim pencari kerja |
| `notifications` | Notifikasi untuk user |
| `chat_rooms` | Room chat antara pencari kerja & HR |
| `messages` | Pesan dalam chat room |

## Row Level Security (RLS)

Semua tabel menggunakan RLS. Policy utama:
- User hanya bisa baca/ubah data milik sendiri
- Job listings bisa dibaca semua user yang login
- Company bisa lihat applications untuk lowongan mereka

## Cara Apply Migrations (Manual)

Buka Supabase SQL Editor dan jalankan file-file di folder `migrations/` secara berurutan.

## Catatan Penting

- Kolom `role` di tabel `profiles` berisi `'job_seeker'` atau `'company'`
- Trigger `on_auth_user_created` otomatis buat row di `profiles` saat user baru daftar
- Data dummy untuk user `test@gmail.com` (Asep Ramdan) sudah tersedia
