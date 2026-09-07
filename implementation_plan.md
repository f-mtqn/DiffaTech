# Fix: Pelamar Tidak Muncul di Dashboard Perusahaan + Status Lamaran Loncat

## Rangkuman Masalah

Ada 3 bug utama yang saling terkait:

### Bug 1: Pelamar Tidak Muncul di Dashboard Perusahaan
**Root cause**: `fetchAllCompanyApplicants()` dan `fetchJobApplicants()` di [api.js](file:///c:/Users/USER/Desktop/Tel%20-%20U/File%20Lomba/ITechnoCup/code/DiffaTech/src/utils/api.js) mencoba join ke `job_seeker_profiles!applicant_id`, tapi **tidak ada Foreign Key** dari `applications.applicant_id` ke `job_seeker_profiles.id`. PostgREST tidak bisa resolve relationship ini → query error → catch block mengembalikan array kosong → dashboard perusahaan menampilkan "Belum ada pelamar".

**Fix**: 
1. Tambah FK dari `applications.applicant_id` → `job_seeker_profiles(id)` di Supabase.
2. Atau, ubah query agar tidak pakai hint `!applicant_id` — gunakan 2-step query: fetch applications + profiles terpisah, lalu join secara manual.

> [!IMPORTANT]
> Pendekatan yang dipilih: **Tambah FK** di database (lebih bersih, PostgREST bisa resolve otomatis).

---

### Bug 2: Status Lamaran Langsung Loncat ke Step 2 ("Tinjau Berkas")
**Root cause**: Di `applyToJob()` (api.js line 129), status awal diset `'review'` → dan di `getApplicationStatusInfo()`, `review` dimapping ke `step: 2`. Padahal seharusnya lamaran baru → `pending` (step 1: "Terkirim"), lalu perusahaan yang mengubahnya ke `review` saat mulai meninjau.

**Fix**:
1. Ubah default insert status di `applyToJob()` dari `'review'` → `'pending'`.
2. Update counter di `CompanyDashboard.jsx` agar `newApplicants` menghitung `pending` + `review`.
3. Update `getStatusBadge()` di `CompanyDashboard.jsx` agar handle status `pending`.

---

### Bug 3: Tombol "Lamar Kerja" Tidak Ter-disable untuk Job yang Sudah Dilamar (Bisa Diklik 2 Kali)
**Root cause**: `loadMyApplications()` di [Dashboard.jsx](file:///c:/Users/USER/Desktop/Tel%20-%20U/File%20Lomba/ITechnoCup/code/DiffaTech/src/pages/Dashboard.jsx) menggunakan `supabase` secara langsung tapi **tidak pernah meng-import** `supabase`. Akibatnya function error saat runtime, `appliedJobs` Set tetap kosong, dan semua tombol "Lamar Kerja" selalu aktif.

**Fix**: Ganti `supabase` direct call dengan `fetchMyApplications()` dari `api.js` yang sudah tersedia, lalu extract `job_id` dari hasilnya.

---

## Proposed Changes

### Database (Supabase Migration)

Tambah FK dari `applications.applicant_id` ke `job_seeker_profiles(id)` agar PostgREST bisa resolve join.

```sql
ALTER TABLE applications
  ADD CONSTRAINT fk_applications_job_seeker_profiles
  FOREIGN KEY (applicant_id) REFERENCES job_seeker_profiles(id)
  ON DELETE CASCADE;
```

---

### Frontend

#### [MODIFY] [api.js](file:///c:/Users/USER/Desktop/Tel%20-%20U/File%20Lomba/ITechnoCup/code/DiffaTech/src/utils/api.js)

1. **`applyToJob()`**: Ubah status awal insert dari `'review'` → `'pending'`, dan hapus fallback insert yang pakai `'pending'`.
2. **`getApplicationStatusInfo()`**: Pastikan mapping `pending` → step 1 sudah benar (sudah ada, tinggal verifikasi).

#### [MODIFY] [Dashboard.jsx](file:///c:/Users/USER/Desktop/Tel%20-%20U/File%20Lomba/ITechnoCup/code/DiffaTech/src/pages/Dashboard.jsx)

1. Import `fetchMyApplications` dari api.js.
2. Ganti `loadMyApplications()` agar pakai `fetchMyApplications(user.id)` daripada `supabase` langsung.

#### [MODIFY] [CompanyDashboard.jsx](file:///c:/Users/USER/Desktop/Tel%20-%20U/File%20Lomba/ITechnoCup/code/DiffaTech/src/pages/CompanyDashboard.jsx)

1. `newApplicants` counter: hitung `pending` + `review`.
2. `getStatusBadge()`: tambah entry untuk status `pending`.

#### [MODIFY] [CompanyApplicants.jsx](file:///c:/Users/USER/Desktop/Tel%20-%20U/File%20Lomba/ITechnoCup/code/DiffaTech/src/pages/CompanyApplicants.jsx)

1. Stats `review` counter: hitung `pending` + `review` bersama sebagai "Baru Masuk".

---

### Data Fix

Update 4 applications yang saat ini berstatus `review` (yang seharusnya `pending` karena belum ditinjau perusahaan) kembali ke `pending`:
```sql
UPDATE applications SET status = 'pending' WHERE status = 'review';
```

> [!NOTE]
> Ini opsional — hanya untuk memperbaiki data dummy lama agar konsisten dengan alur baru. Semua 4 lamaran `review` + 2 `pending` akan menjadi 6 `pending` + 1 `accepted`.

---

## Verification Plan

### Automated Tests
```bash
npx vite build
```

### Manual Verification
- Login sebagai `ceo@gmail.com` → cek Company Dashboard → pastikan 7 pelamar muncul
- Login sebagai `test@gmail.com` → buka Dashboard → pastikan job yang sudah dilamar bertanda "Terkirim ✓" 
- Lamar job baru → cek "Lamaran Saya" → status harus di step 1 ("Terkirim")
