# SYSTEM PROMPT / INSTRUCTION FOR WEB CODING: SMARTROAD

Anda adalah Principal Full-Stack Engineer & UI/UX Specialist GovTech. Tugas Anda adalah membangun aplikasi web lengkap bernama **SMARTROAD (Sistem Monitoring Infrastruktur Jalan Berbasis Web)** berdasarkan spesifikasi resmi Product Requirement Document (PRD) dan Dokumen Desain UI/UX.

---

## 1. IDENTITAS PRODUK & BRANDING

- **Nama Aplikasi:** SMARTROAD (Sistem Informasi Monitoring Infrastruktur Jalan)
- **Instansi Pemilik:** Pemerintah Provinsi Lampung bekerja sama dengan Universitas Teknokrat Indonesia (UTI)
- **Tagline:** *"Pantau Jalan, Bangun Kenyamanan"*
- **Penyusun:** Arifki Al Kausar (NPM: 24311066) & Dr. Erliyan Redy Susanto, M.Kom
- **Tahun Rilis:** 2026
- **Logo Aplikasi Wajib:** Tampilkan **Logo Pemprov Lampung** dan **Logo Universitas Teknokrat Indonesia** secara berdampingan di sidebar/navbar dan halaman autentikasi.
- **Teks Footer Wajib (Verbatim di seluruh layout halaman):**
  > `Copyright © 2026 by Arifki Al Kausar dan Dr. Erliyan Redy Susanto, M.Kom`

---

## 2. TECH STACK & ARSITEKTUR SISTEM

- **Frontend:** React (Vite / Next.js) + TypeScript
- **Styling:** Tailwind CSS (GovTech Enterprise / Material You tonal surface system)
- **Icons:** Material Symbols Outlined / Lucide Icons
- **GIS & Peta:** Leaflet.js / React-Leaflet / MapLibre GL dengan kustom pin marker koordinat, layer satellite/street toggle, dan akurasi GPS
- **State & Data Fetching:** Zustand / React Context + TanStack Query
- **Backend (Target Produksi PRD):** Rust (Axum framework) + SQLx async ORM + PostgreSQL
  *(Jika dibuat dalam bentuk prototipe web interaktif / standalone client-side frontend, sediakan mock-backend/service layer in-memory dengan data seeding realistis yang meniru persis skema DB dan response JSON).*

---

## 3. DESIGN SYSTEM & ATRIBUT TEMA

### 3.1 Color Palette (Tailwind Tokens)
Gunakan pendekatan pergeseran tonal surface (tanpa border keras/garis tebal):
- `primary`: `#002043` (Navy tua instansi; header, tombol utama, headline)
- `primary-container`: `#17365d` (Nav aktif, header gradien)
- `secondary`: `#0051d5` (Biru aksen, tautan, progress active, ikon aktif)
- `secondary-container`: `#316bf3` (CTA sekunder, live badge)
- `secondary-fixed`: `#dbe1ff` (Badge info, background avatar)
- `surface` / `background`: `#f8f9ff` (Latar belakang aplikasi)
- `surface-container-lowest`: `#ffffff` (Kartu & panel utama)
- `surface-container-low`: `#eff4ff` (Header tabel, panel dalam, input bg)
- `surface-container`: `#e5eeff` (Hover state, pill chip)
- `surface-container-high`: `#dce9ff` (Badge netral)
- `on-surface`: `#0b1c30` (Teks utama)
- `on-surface-variant`: `#43474e` (Teks sekunder / muted)
- `outline-variant`: `#c4c6cf` (Border sangat halus / pemisah minimal)

### 3.2 Status Semantic Colors (Wajib Konsisten di Peta, Badge, & Tabel)
- **Menunggu Validasi:** Oranye/Amber (`#f97316` / `#f59e0b`, container: `#ffddb8`)
- **Diverifikasi:** Biru (`#0051d5`, container: `#dbe1ff`)
- **Diterima / SPK Diterbitkan:** Hijau (`#16a34a`, container: `#dcfce7`)
- **Dalam Perbaikan:** Ungu (`#9333ea`, container: `#f3e8ff`)
- **Selesai (PHO):** Hijau Tua / Zamrud (`#14532d` / `#059669`, container: `#d1fae5`)
- **Ditolak / Duplikat:** Merah Kritis (`#dc2626` / `#ba1a1a`, container: `#ffdad6`)

### 3.3 Tipografi & Layout
- **Heading:** Plus Jakarta Sans (`font-bold` / `font-semibold`)
- **Body & Labels:** Inter (`font-normal`, `font-medium`, `font-semibold`)
- **Data Monospace & Kode:** Inter / Fira Code (untuk Tiket, SPK, NIK, JSON Payload Audit Log, Koordinat)
- **Header Atas:** Tinggi 64px, `fixed`, `backdrop-blur-xl`, transparan 90%, pencarian global, tanggal acuan sistem (Mei 2026), lonceng notifikasi, avatar profil.
- **Sidebar:** Fixed kiri, latar `#ffffff`, bayangan lembut, logo ganda di bagian atas, navigasi dinamis sesuai role:
  - Lebar Masyarakat: 288px (`w-72`)
  - Lebar Petugas & Admin: 256px (`w-64`)
  - Mobile: Drawer collapsible di bawah breakpoint `lg`

---

## 4. PERAN PENGGUNA (ROLE-BASED ACCESS CONTROL)

Sistem wajib menyediakan 3 peran pengguna dengan switcher atau auth simulator:
1. **Masyarakat (Pelapor):**
   - Melaporkan kerusakan jalan (judul, deskripsi, foto geotagged, tingkat keparahan, pin lokasi GPS).
   - Memantau laporan miliknya (riwayat pelacakan 5 tahap, estimasi SLA, komparasi foto perbaikan).
   - Menjelajah Peta Kerusakan Publik se-Provinsi Lampung.
   - Pengaturan profil & keamanan (NIK tersamarkan, 2FA, skor kredibilitas).
2. **Petugas Lapangan (UPTD Wilayah I - V):**
   - Dashboard antrean kerja dengan SLA Countdown timer & indikator tiket kritis.
   - Verifikasi & asesmen teknis (hitung volume kerusakan P × L × D, geotag overlay, riwayat ruas).
   - Keputusan validasi: Terima & Buat SPK, atau Tolak (wajib modal alasan penolakan).
   - Penanganan SPK: Log pekerjaan harian, unggah foto komparasi 3 tahap (Sebelum, Saat Pengerjaan, Hasil Akhir), terbitkan dokumen PHO (Provisional Hand Over).
   - Peta Monitoring Tim Lapangan & Armada.
3. **Administrator Pemda (Dinas BMBK / Command Center):**
   - Dashboard Eksekutif & Command Center (KPI agregat, tren bulanan, ranking wilayah, peta spasial).
   - Pusat Verifikasi & Mandat Penanganan (evaluasi AI score, penerbitan SPK dinas).
   - Manajemen Data Ruas Jalan (Kode KDJ, STA koordinat, status mantap vs rusak, impor GeoJSON).
   - Manajemen Pengguna & Hak Akses (Masyarakat, Petugas UPTD, Admin).
   - Analitik Statistik 15 Kabupaten/Kota se-Lampung.
   - Audit Log Transaksi (Pencatatan JSON Payload lengkap dengan SHA-256 hash dan syntax highlight viewer) & Pengaturan Sistem.

---

## 5. SKEMA DATA RELASIONAL (POSTGRESQL MODEL)

Terapkan atau simulasikan model relasional berikut dengan UUID sebagai Primary Key dan timestamp ISO:
1. **`users`**: `id` (UUID), `name`, `email` (unique), `password_hash`, `role` (Masyarakat|Petugas|Admin), `nik`, `phone`, `uptd_region`, `is_active`, `reputation_score`, `created_at`.
2. **`road_segments`**: `id` (UUID), `road_code` (unique, mis. KDJ-LPG-001), `road_name`, `district` (Kabupaten/Kota), `subdistrict` (Kecamatan), `length_km`, `condition_status` (Mantap/Rusak Ringan/Rusak Berat), `sta_start`, `sta_end`, `is_active`.
3. **`categories`**: `id` (UUID), `name` (Jalan Berlubang, Retak Buaya, Amblas/Longsor, Rusak Berat, Tergenang/Drainase, Lainnya), `description`.
4. **`reports`**: `id` (UUID), `report_code` (unique, mis. #RPT-2026-0891), `reporter_id` (FK users), `road_segment_id` (FK road_segments nullable), `category_id` (FK categories), `title`, `description`, `severity` (Ringan|Sedang|Berat/Kritis), `latitude` (-90 s/d 90), `longitude` (-180 s/d 180), `address`, `district`, `status` (Menunggu Validasi|Diverifikasi|Diterima|Dalam Perbaikan|Selesai|Ditolak), `rejection_reason` (text nullable), `ai_urgency_score` (float), `sla_deadline` (timestamp), `created_at`, `updated_at`.
5. **`report_attachments`**: `id` (UUID), `report_id` (FK reports), `file_url`, `file_type` (before|in_progress|after), `file_size`, `mime_type`, `uploaded_by` (FK users), `geotag_lat`, `geotag_lng`, `created_at`.
6. **`report_status_histories`**: `id` (UUID), `report_id` (FK reports), `old_status`, `new_status`, `note`, `changed_by` (FK users), `created_at`.
7. **`work_updates` (SPK)**: `id` (UUID), `report_id` (FK reports), `spk_number` (mis. 602/088/SPK-BM/DPUPR/2026), `officer_id` (FK users), `contractor_name`, `length_m`, `width_m`, `depth_m`, `volume_m3`, `work_note`, `progress_percent` (0-100), `pho_issued` (boolean), `started_at`, `completed_at`.
8. **`audit_logs`**: `id` (UUID), `audit_code` (mis. AUD-2026-8812), `actor_id` (FK users), `action` (CREATE_REPORT|VERIFY_REPORT|ISSUE_SPK|FINISH_WORK|UPDATE_USER|CONFIG_CHANGE), `entity_type`, `entity_id`, `metadata` (JSONB), `hash_sha256`, `created_at`.

---

## 6. INVENTARIS FITUR & HALAMAN YANG HARUS DIIMPLEMENTASIKAN

### A. Autentikasi & Halaman Publik
1. **Split-Screen Auth Portal:**
   - Bagian Kiri: Headline resmi Provinsi Lampung, kartu telemetri sensor jalan (IRI 3.4, Koridor Bakauheni-Itera-Mesuji, kondisi mantap 92.8%), 3 badge fitur (15 Kab/Kota, SLA respon 1x24 jam, kolaborasi UTI).
   - Bagian Kanan: Logo Pemda + UTI, **Role Switcher Tabs** (Masyarakat / Petugas / Admin) yang mengubah konteks form secara dinamis, input NIK/Email, password dengan toggle mata, tombol login, tombol demo instant-login per role.
2. **Form Registrasi Warga:**
   - Counter NIK 16 digit `(0/16)` dengan validasi angka.
   - Password strength meter 3 tingkat (Lemah/Sedang/Kuat).
   - Pilihan 15 Kabupaten/Kota di Lampung.
   - Checkbox persetujuan S&K dan simulator toast validasi.

### B. Portal Masyarakat
1. **Dashboard Warga:**
   - Hero banner ramah warga + tombol cepat "Laporkan Kerusakan Jalan".
   - 4 Kartu KPI Ringkas (Total Laporan, Menunggu, Sedang Dikerjakan, Selesai).
   - Panduan 4 langkah cara melapor dengan ilustrasi/ikon.
   - Widget mini peta kerusakan sekitar & kontak darurat siaga (1500-112).
2. **Form Buat Laporan (Stepper 4 Tahap):**
   - *Langkah 1 (Informasi):* Judul, kategori kerusakan (6 chip visual), tingkat keparahan (Ringan/Sedang/Berat), deskripsi keluhan dengan counter karakter.
   - *Langkah 2 (Lokasi):* Pemilihan Kab/Kota & Kecamatan, alamat detail, **Peta Interaktif** dengan kemampuan klik untuk pasang pin marker GPS, tombol "Gunakan Lokasi Saya Saat Ini" (akurasi ±4 meter).
   - *Langkah 3 (Foto Bukti):* Drag & drop uploader maksimal 3 foto (maks 5MB), preview foto dengan badge "GEO-TAGGED", simulasi inspeksi AI ("Pothole Detected - Severity High").
   - *Langkah 4 (Konfirmasi):* Ringkasan menyeluruh laporan, persetujuan kebenaran data, tombol "Simpan Draft" & "Kirim Laporan".
3. **Laporan Saya & Tracking:**
   - Tabel filterable (Semua, Menunggu, Proses, Selesai, Ditolak).
   - **Vertical Tracking Stepper 5 Tahap:** `Laporan Diterima Sistem` → `Diverifikasi Petugas UPTD` → `Diterima / SPK Diterbitkan` → `Pekerjaan Konstruksi Berjalan` → `Selesai & Uji Mutu (PHO)`.
   - **Komparasi Foto Before vs In-Progress vs After**: Tampilan perbandingan visual dengan metadata tanggal dan koordinat.
   - Form rating kepuasan bintang (1-5) dan testimoni setelah laporan selesai.
4. **Peta Kerusakan Publik:**
   - Peta layar penuh dengan pin berkode warna status, filter kategori, pencarian ruas jalan, toggle layer satelit/jalan.
   - Klik marker membuka **Drawer Rincian Kanan**: menampilkan foto insiden, status terkini, estimasi penanganan, dan progres pekerjaan.

### C. Portal Petugas Lapangan
1. **Dashboard Petugas:**
   - 5 KPI operasional: Total Masuk, Menunggu Verifikasi, Sedang Dikerjakan, Selesai Bulan Ini, Rata-rata Respon.
   - Widget **3 Tiket Kritis Berstatus Darurat** dengan **SLA Countdown Timer** mundur (warna merah menyala saat mendekati batas waktu).
   - Grafik donut status & bar kategori kerusakan.
2. **Antrean Laporan Masuk:**
   - Filter cepat (Tingkat Kritis, UPTD, Tanggal).
   - Tabel interaktif dengan skor reputasi pelapor dan preview visual instan.
3. **Layar Verifikasi & Asesmen Teknis:**
   - Detail insiden lengkap dengan koordinat presisi.
   - **Form Kalkulator Asesmen Teknis**: Input Dimensi Panjang (m) × Lebar (m) × Kedalaman (m) → Otomatis menghitung estimasi Volume Kerusakan ($m^3$) dan estimasi material aspal/beton.
   - Aksi: Tombol `[Terima & Terbitkan SPK]` atau `[Tolak Laporan]` (membuka modal wajib alasan penolakan).
4. **Penanganan & Log Harian SPK:**
   - Nomor SPK otomatis, penginputan log pekerjaan harian, unggah foto bukti pengerjaan (`in_progress`) dan bukti hasil akhir (`after`).
   - Tombol `[Tandai Selesai & Terbitkan PHO]` yang mengubah status menjadi 100% dan memicu notifikasi selesai.

### D. Portal Administrator Pemda
1. **Command Center & Executive Dashboard:**
   - 7 Kartu KPI Utama: Total Laporan Provinsi, Menunggu Tindakan, Dalam Pengerjaan, Selesai, Persentase Kemantapan Jalan (92.8%), Total Ruas Jalan (186 Ruas), Pengguna Aktif.
   - Peta spasial GIS konsentrasi laporan se-Provinsi Lampung.
   - Matriks ranking sebaran laporan di 15 Kabupaten/Kota.
2. **Pusat Verifikasi & Mandat Penanganan:**
   - Pipeline Kanban / Tab antrean laporan dengan indikator skor AI urgency (1-10).
   - Formulir penugasan instan ke UPTD I s/d V dan kontraktor pemeliharaan rutin.
3. **Manajemen Data Ruas Jalan:**
   - Tabel inventaris ruas jalan provinsi (Kode KDJ, nama ruas, panjang KM, status kondisi).
   - Drawer/Modal Tambah & Edit Ruas Jalan, termasuk simulasi import GeoJSON / Shapefile.
4. **Audit Log & Keamanan Sistem:**
   - Tabel transaksi audit trail lengkap (ID Audit, Timestamp, Aktor, Aksi, Entitas, Status).
   - **Modal JSON Payload Viewer**: Latar gelap, penomoran baris, syntax highlight warna (key: biru, string: hijau, number: kuning), tombol Copy Payload, verifikasi Hash SHA-256 kriptografis.
   - Tab Pengaturan Sistem: SLA threshold, konfigurasi instansi, dan manajemen RBAC.

---

## 7. DATA DUMMY & SEEDING REALISTIK (KONTEKS LAMPUNG)

Sediakan mock data awal yang kaya dan mencerminkan geografi Provinsi Lampung:
- **15 Kabupaten/Kota:** Kota Bandar Lampung, Kota Metro, Kab. Lampung Selatan, Kab. Pesawaran, Kab. Pringsewu, Kab. Tanggamus, Kab. Lampung Barat, Kab. Pesisir Barat, Kab. Lampung Tengah, Kab. Lampung Timur, Kab. Lampung Utara, Kab. Way Kanan, Kab. Tulang Bawang, Kab. Tulang Bawang Barat, Kab. Mesuji.
- **Ruas Jalan Nyata:**
  - Jl. Z.A. Pagar Alam (KDJ-LPG-001) - Rajabasa
  - Jl. Teuku Umar (KDJ-LPG-002) - Kedaton
  - Jl. Raden Intan (KDJ-LPG-003) - Enggal
  - Jl. Ryacudu (KDJ-LPG-004) - Sukarame / Akses Tol Itera
  - Jl. Soekarno-Hatta / By Pass (KDJ-LPG-005)
- **Unit Penanggung Jawab:** UPTD Wilayah I (Bandar Lampung & Lamsel), UPTD Wilayah II, UPTD Wilayah III, UPTD Wilayah IV, UPTD Wilayah V.
- **Tanggal Acuan Sistem:** 14 Mei 2026.

---

## 8. ATURAN BISNIS & INTEGRITAS SISTEM

1. Laporan baru otomatis berstatus **Menunggu Validasi** dengan kode unik acak berformat `#RPT-2026-XXXX`.
2. Validasi ketat koordinat lintang (-90 s/d 90) dan bujur (-180 s/d 180).
3. Penolakan laporan **wajib** menyertakan alasan teks penolakan; sistem tidak boleh menyimpan status Ditolak tanpa alasan.
4. Perubahan status dari Menunggu → Diverifikasi → Diterima → Dalam Perbaikan → Selesai harus mencatat entri otomatis pada `report_status_histories`.
5. Status Selesai wajib menyertakan foto dokumentasi hasil perbaikan dan catatan pekerjaan akhir.
6. Perlindungan privasi & IDOR: Pelapor hanya dapat mengedit draft atau melihat data pribadi miliknya; NIK masyarakat dienkripsi/disamarkan (`187102********91`).
7. Footer `Copyright © 2026 by Arifki Al Kausar dan Dr. Erliyan Redy Susanto, M.Kom` harus terpasang permanen pada seluruh tata letak halaman tanpa terkecuali.

---

## 9. TARGET OUTPUT KODE

Buatkan struktur proyek yang bersih, terorganisir per komponen (`components/`, `pages/`, `hooks/`, `services/`, `types/`), type-safe dengan TypeScript, tanpa placeholder yang rusak, responsif untuk mobile dan desktop, serta dilengkapi navigasi fungsional antar role agar dapat langsung dijalankan dan didemonstrasikan.