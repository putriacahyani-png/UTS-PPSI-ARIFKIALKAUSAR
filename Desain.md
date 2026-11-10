# SMARTROAD — Dokumen Desain UI/UX

**Sistem Informasi Monitoring Infrastruktur Jalan (SMARTROAD)**
Pemerintah Provinsi Lampung bekerja sama dengan Universitas Teknokrat Indonesia
**Tagline:** *"Pantau Jalan, Bangun Kenyamanan"*

> Footer wajib di seluruh halaman (verbatim):
> `Copyright©2026 by Arifki Al Kausar dan Dr. Erliyan Redy Susanto, M.Kom`

---

## 1. Ringkasan Produk

SMARTROAD adalah portal terpadu pelaporan, verifikasi, penanganan, dan pengawasan kerusakan jalan di Provinsi Lampung. Sistem mengintegrasikan laporan warga, sensor/AI Vision, GIS, SPK (Surat Perintah Kerja), dan audit trail.

### Peran Pengguna (Role)

| Role | Tujuan Utama | Tema Navigasi |
|---|---|---|
| **Masyarakat** | Melapor kerusakan, melacak status, melihat peta | Sidebar lebar 288px (`w-72`) |
| **Petugas Lapangan** | Verifikasi, penanganan fisik, log harian, peta monitoring | Sidebar 256px (`w-64`) |
| **Admin Pemda** | Tata kelola laporan, pengguna, ruas jalan, analitik, audit, pengaturan | Sidebar 256px (`w-64`) |

### Alur Status Laporan

`Menunggu Validasi` → `Diverifikasi` → `Diterima / SPK Diterbitkan` → `Dalam Perbaikan` → `Selesai (PHO)`
Cabang: `Ditolak / Duplikat`

---

## 2. Design System

Gaya: **GovTech enterprise**, bersih, berbasis Material You (tonal surface), tanpa border keras (pemisah memakai pergeseran warna surface), bayangan lembut.

### 2.1 Warna

| Token | Hex | Penggunaan |
|---|---|---|
| `primary` | `#002043` | Judul, tombol utama, teks penting |
| `primary-container` | `#17365d` | Item nav aktif, header gradien |
| `secondary` | `#0051d5` | Aksen, link, progres, ikon aktif |
| `secondary-container` | `#316bf3` | CTA sekunder, indikator live |
| `secondary-fixed` | `#dbe1ff` | Badge info, avatar inisial |
| `tertiary` | `#311c00` | Teks pada warna amber |
| `tertiary-fixed` | `#ffddb8` | Badge "Menunggu / Sedang" |
| `tertiary-fixed-dim` | `#ffb95f` | Penanda peringatan |
| `error` | `#ba1a1a` | Kritis, tolak, hapus |
| `error-container` | `#ffdad6` | Badge kritis / berat |
| `surface` / `background` | `#f8f9ff` | Latar halaman |
| `surface-container-lowest` | `#ffffff` | Kartu |
| `surface-container-low` | `#eff4ff` | Panel dalam, header tabel |
| `surface-container` | `#e5eeff` | Hover, chip |
| `surface-container-high` | `#dce9ff` | Badge netral |
| `surface-container-highest` | `#d3e4fe` | Track progres |
| `on-surface` | `#0b1c30` | Teks isi |
| `on-surface-variant` | `#43474e` | Teks sekunder |
| `outline` / `outline-variant` | `#74777f` / `#c4c6cf` | Placeholder, garis halus |

**Warna status (konsisten di seluruh peta, tabel, dan badge):**

| Status | Warna | Hex |
|---|---|---|
| Menunggu | Oranye/Amber | `#f97316` / `#f59e0b` |
| Diverifikasi | Biru | `#0051d5` |
| Diterima | Hijau | `#16a34a` |
| Ditolak | Merah | `#dc2626` |
| Dalam Perbaikan | Ungu | `#9333ea` |
| Selesai (PHO) | Hijau tua | `#14532d` / `#059669` |

### 2.2 Tipografi

| Peran | Font | Ukuran / Line-height | Bobot |
|---|---|---|---|
| `headline-xl` | Plus Jakarta Sans | 32 / 40 | 700 |
| `headline-lg` | Plus Jakarta Sans | 24 / 32 | 600 |
| `headline-md` | Plus Jakarta Sans | 20 / 28 | 600 |
| `headline-sm` | Plus Jakarta Sans | 16 / 24 | 600 |
| `body-lg` | Inter | 16 / 24 | 400 |
| `body-md` | Inter | 14 / 20 | 400 |
| `body-sm` | Inter | 12 / 18 | 400 |
| `label-lg` | Inter | 14 / 20 | 600 |
| `label-md` | Inter | 12 / 16 | 500 |
| `label-sm` | Inter | 11 / 14 (+0.04em, uppercase) | 600 |
| `mono-data` | Inter (Fira Code di Audit Log) | 13 / 18 | 500 |

Ikon: **Material Symbols Outlined** (ukuran umum 18–22px).

### 2.3 Spacing & Radius

| Token | Nilai |
|---|---|
| `space-xs / sm / md / lg / xl` | 4 / 8 / 16 / 24 / 32 px |
| `gutter`, `margin` | 24 px (tablet 16, mobile 12) |
| Radius `DEFAULT / lg / xl / full` | 4 / 8 / 12 / 9999 px |

### 2.4 Elevasi & Komponen Dasar

- **Kartu:** `bg-surface-container-lowest`, `rounded-xl`, `shadow-sm` (hover: `shadow-md`).
- **Header atas:** tinggi 64px, fixed, `backdrop-blur-xl`, transparan 90%.
- **Sidebar:** fixed kiri, latar putih, bayangan `0 1px 8px rgba(0,0,0,0.04)`.
- **Item nav aktif:** `bg-primary-container text-on-primary font-semibold shadow-sm`.
- **Badge/Pill:** `rounded-full`, teks `label-sm`, warna mengikuti status.
- **Input:** tinggi 40–44px, `bg-surface-container-low`, fokus `ring-2 ring-secondary`.
- **Tombol utama:** `bg-primary` / `bg-primary-container`, `rounded-lg`, ikon + label.
- **Tabel:** header `bg-surface-container-low` uppercase `label-sm`, baris hover `surface-container-low/60`, tanpa garis tebal.
- **Indikator live:** titik `animate-ping` / `animate-pulse`.
- **Progress bar:** tinggi 6–12px, `rounded-full`, warna mengikuti status.

---

## 3. Pola Layout Global

```
┌──────────────┬──────────────────────────────────────────┐
│              │ Header (64px): Pencarian · Tanggal · 🔔 · │
│   Sidebar    │ Profil                                   │
│  (256/288px) ├──────────────────────────────────────────┤
│  Logo Pemda  │ Main (pt-16, px-24)                      │
│  + Logo UTI  │  - Breadcrumb + Judul + Aksi             │
│  Role badge  │  - KPI cards                             │
│  Menu        │  - Konten (grid 12 kolom)                │
│  Status GIS  │  - Footer copyright                      │
└──────────────┴──────────────────────────────────────────┘
```

- Grid konten: `grid-cols-12` (umum 7:5, 8:4, atau 5:7).
- Logo ganda: **Pemprov Lampung** + **Universitas Teknokrat Indonesia** di sidebar dan halaman auth.
- Footer ganda: strip footer halaman + footer bawah.

---

## 4. Inventaris Halaman

### 4.1 Halaman Publik / Autentikasi

#### A. Portal Login & Registrasi (Split)
- **Kiri (5 kol):** headline *"Portal Terpadu Pengawasan Jalan Provinsi Lampung"*, kartu sensor real-time (IRI 3.4, koordinat, sparkline), 3 badge fitur (15 Kab/Kota, respon 1×24 jam, kolaborasi UTI), metrik footer (1.842 KM, 94.8%, < 3.2 jam).
- **Kanan (7 kol):** logo ganda + judul resmi, **tab role** (Masyarakat / Petugas Lapangan / Admin Pemda), banner hint role dinamis, form login (NIK/Email, kata sandi dengan toggle mata, ingat saya), tombol SSO (Satu Data Lampung, SSO Pemprov), teaser registrasi, badge keamanan (SSL 256-bit, Dukcapil, ISO 27001).
- **Drawer registrasi** (collapsible): nama sesuai KTP, NIK 16 digit, WhatsApp, kab/kota (15 opsi), kata sandi + konfirmasi.
- **Interaksi:** label/placeholder input berubah sesuai role.

#### B. Login (Variasi Split Card)
- Kiri: form + tab role + tombol "Masuk ke Sistem SMARTROAD" + SSO.
- Kanan: gradien biru, panel AI-Vision koridor *Bakauheni – Itera – Mesuji*, kartu Kondisi Mantap 92.8% dan IRI 3.4, status AI Sentinel 24/7.
- Fitur uji: tombol `[Uji Validasi]` menampilkan alert error.

#### C. Registrasi Masyarakat Pelapor
- Banner gradien dengan logo ganda.
- Form 2 kolom: Nama, NIK (counter 0/16), Email (validasi realtime), WhatsApp (+62), Wilayah, Kata sandi + **meter kekuatan 3 segmen**, konfirmasi (match indicator), persetujuan S&K.
- Toast sukses/gagal + simulator respons.

### 4.2 Portal Masyarakat (Warga)

| Halaman | Isi Utama |
|---|---|
| **Dashboard** | Hero sambutan + CTA "Laporkan Kerusakan Jalan"; 4 KPI (Total 12, Menunggu 3, Diproses 4, Selesai 5); daftar laporan terbaru; panduan 4 langkah; peta sekitar; progres terbaru; kontak siaga (1500-112, WhatsApp); modal buat laporan cepat |
| **Buat Laporan** | Stepper 4 langkah (Info → Lokasi → Foto → Konfirmasi); judul, kategori (6 chip), tingkat keparahan (Ringan/Sedang/Berat), deskripsi (counter karakter); alamat & wilayah bertingkat; **peta GPS** + marker + akurasi ±4 m; uploader foto (maks 3, 5MB) + badge GEO-TAGGED; banner validasi AI; pernyataan kebenaran; Simpan Draft / Kirim |
| **Laporan Saya** | KPI ringkas, toolbar filter (status, kategori, tanggal), tabel 7 kolom (No/Foto/Judul/Lokasi/Status/SLA/Aksi), pagination, panel progres real-time + stepper horizontal, mini peta, kotak dampak partisipasi |
| **Detail & Tracking Laporan** | Header status; info utama + metadata (lokasi, GPS, pelapor, waktu); kesaksian warga; mini peta; **komparasi foto** sebelum vs saat pengerjaan; **stepper vertikal 5 tahap**; catatan pengawas; form rating bintang + komentar |
| **Peta Kerusakan** | Filter (cari ruas, kategori, kecamatan, status), toggle layer (Blackspot, CCTV, Satelit), peta 640px dengan marker berwarna, legenda, **drawer detail kanan** (foto, tiket, progres, timeline), 4 kartu telemetri |
| **Profil** | Kartu identitas (NIK tersamarkan, statistik kontribusi, skor kredibilitas 92%), 3 tab: Informasi Pribadi, Keamanan & Kata Sandi (strength meter, 2FA), Preferensi Notifikasi; modal konfirmasi logout |

### 4.3 Portal Petugas Lapangan (UPTD Wilayah I)

| Halaman | Isi Utama |
|---|---|
| **Dashboard Petugas** | Status siaga; 5 KPI (148 / 18 / 42 / 28 / 60); **3 tiket kritis** dengan SLA countdown; donut status; bar kategori; mini peta GIS; tabel laporan terkini |
| **Laporan Masuk** | Metrik chip; filter lengkap + chip aktif; tabel 8 kolom (No/SLA/Pelapor/Visual/Lokasi/Tingkat/Status/Tindakan); pagination 148 data; ekspor XLSX & cetak rekap |
| **Verifikasi & Asesmen Teknis** | Timer SLA; kartu pelapor (skor reputasi 98%); detail insiden; foto + overlay geotag & dimensi (2.2 × 1.6 × 0.18 m); riwayat ruas 30 hari; peta jurisdiksi; **form asesmen** (keparahan, material, volume P×L×D, catatan); tombol Mulai Verifikasi / Terima & Buat SPK / Tolak; **modal alasan penolakan** |
| **Penanganan (SPK)** | Header tiket + SPK; progres fisik per fase; **galeri komparasi 3 tahap**; form log harian, upload foto proses, catatan penyelesaian & uji mutu, upload foto hasil; aksi Simpan / Tandai Selesai & Terbitkan PHO; riwayat SPK |
| **Peta Monitoring** | Toggle Satelit/CCTV/Alat berat; 4 telemetri; filter status berwarna; peta 620px + pin per status; **panel inspeksi spasial** (foto + CCTV live, STA, progres 75%, tim lapangan); titik pantau terdekat |
| **Riwayat & Profil Petugas** | Kartu identitas + NIP + lisensi LPJK; 4 KPI kinerja (342 / 289 / 2.4 jam / 4.8); tabel log penanganan + dokumen PHO; timeline aktivitas |

### 4.4 Portal Admin Pemda

| Halaman | Isi Utama |
|---|---|
| **Dashboard Eksekutif** | 7 KPI (1.428 / 38 / 184 / 64 / 1.142 / 186 ruas / 8.492 pengguna); grafik tren bulanan; donut kategori; proporsi status; peta Lampung; ranking wilayah; tabel eskalasi |
| **Command Center** (Dashboard Utama) | Banner siaga darurat; filter bulan/wilayah; 4 KPI; peta GIS spasial; distribusi kerusakan; tabel laporan butuh tindakan; banner kemitraan |
| **Pusat Verifikasi & Penugasan** | 4 tab pipeline (24 / 18 / 42 / 6); antrean kiri + detail kanan; foto bukti + mini peta; skor AI 8.9 (Kritis); formulir mandat penanganan + **Setujui & Terbitkan SPK** |
| **Progres Perbaikan Jalan** | Banner KPI (28 paket, 23 on schedule, 2 kritis, 14 selesai); 3 kartu ruas dengan before/after, deviasi jadwal, kontraktor, nilai kontrak; peta geotagging; log verifikasi lapangan; **matriks kontrak 8 kolom**; modal laporan harian |
| **Manajemen Laporan** | 6 tab status; filter; tabel 8 kolom + checkbox batch; panel **riwayat audit** (timeline) |
| **Manajemen Pengguna** | 4 KPI; filter role/status; tabel pengguna; **modal tambah/edit** (role radio-card, UPTD, kata sandi sementara, status) |
| **Data Ruas Jalan** | 4 KPI (1.774,40 km, 92.8%, 5.4%, 1.8%); peta geometris; tabel inventaris; **drawer form** (kode KDJ, wilayah, geometrik, koordinat STA); import Shapefile/GeoJSON |
| **Statistik & Analitik** | Filter periode/wilayah/pembiayaan; 4 KPI (91.8%, 1.8 hari, 4.78/5, Rp 64,8 M); tren + bar; donut kategori; keparahan; top 8 kecamatan; masuk vs selesai; **matriks 15 Kab/Kota** |
| **Audit Log & Pengaturan Sistem** | 2 tab. **Audit Log:** 4 metrik integritas, filter, tabel transaksi, **modal JSON payload** (syntax highlight, copy/expand/download, hash SHA-256, tab kriptografi). **Pengaturan:** informasi aplikasi, identitas & logo, profil instansi, notifikasi multi-channel, SLA & kategori, matriks RBAC, keamanan (2FA, timeout), preferensi tampilan, simpan/reset |

---

## 5. Komponen Reusable

| Komponen | Deskripsi |
|---|---|
| **Role Tabs** | Segmented control 3 opsi; aktif `bg-primary-container text-surface` |
| **KPI Card** | Label uppercase + ikon di kotak tonal + angka besar + delta/badge + progress mini |
| **Status Badge** | Pill dengan titik warna (animate-pulse untuk "aktif") |
| **Severity Chip** | Ringan / Sedang / Berat (Kritis) — hijau/amber/merah |
| **Stepper** | Horizontal (laporan saya) dan vertikal (tracking 5 tahap); tahap aktif ber-ring + pulse |
| **Photo Compare** | Dua/tiga panel dengan label fase + timestamp + metadata GPS |
| **Map Marker** | Pin berwarna per status + tooltip + legenda mengambang |
| **Detail Drawer/Panel** | Foto → tiket → lokasi → grid spesifikasi → progres → aksi |
| **SLA Countdown** | Timer mono-font merah dengan bar progres |
| **Data Table** | Pagination, hover, aksi ikon, scroll horizontal |
| **Modal** | Backdrop blur, header berwarna, footer aksi (Esc/backdrop untuk tutup) |
| **Toast** | Fixed kanan-bawah, auto-hide 3.2 dtk |
| **Password Strength Meter** | 3 segmen (Lemah / Sedang / Kuat) |
| **Toggle Switch** | Peer-checked, warna `secondary-container` |
| **JSON Viewer** | Latar gelap, line numbers, token berwarna (key biru, string hijau, number kuning, boolean ungu, null merah) |

---

## 6. Perilaku & Interaksi

- Perpindahan role pada login mengubah label, placeholder, ikon, dan banner deskripsi.
- Toggle visibilitas kata sandi; validasi NIK (16 digit angka), email realtime, kecocokan sandi.
- Filter tabel sisi-klien (pencarian teks, role, aksi, kabupaten) dan tombol Reset.
- Modal: buka/tutup, backdrop-click, tombol Esc (halaman audit).
- Tombol **Tandai Selesai** → progres 100%, banner sukses, notifikasi ke pelapor.
- Peta: zoom +/−, re-center, toggle layer, marker membuka drawer detail.
- Simulasi sinkronisasi GIS, ekspor (PDF/CSV/XLSX), dan unduh JSON.
- Seluruh interaksi bersifat **prototype/simulasi** (alert/toast), tanpa backend.

---

## 7. Konten & Data Contoh Utama

- **Wilayah:** 15 Kabupaten/Kota se-Lampung; 5 UPTD (I–V).
- **Ruas contoh:** Jl. Z.A. Pagar Alam, Jl. Teuku Umar, Jl. Raden Intan, Jl. Ryacudu, Jl. Soekarno-Hatta (By Pass).
- **Format tiket:** `#RPT-2026-0891`; **SPK:** `602/088/SPK-BM/DPUPR/2026`; **kode ruas:** `KDJ-LPG-001`; **audit:** `AUD-2026-8812`.
- **Kategori kerusakan:** Jalan Berlubang, Retak Buaya, Amblas/Longsor, Rusak Berat, Tergenang/Drainase, Lainnya.
- **Tanggal acuan data:** 14 Mei 2026.

---

## 8. Catatan Konsistensi (Perlu Ditinjau)

1. **Footer** halaman *Audit Log & Pengaturan* dan *Audit Log & Detail Payload* masih bertuliskan `Copyright©2026 by Nama Mahasiswa dan Dr. Erliyan Redy Susanto, M.Kom`. Seharusnya diseragamkan menjadi **"Arifki Al Kausar"**.
2. **Duplikasi layar:** ada tiga versi layar Audit Log/Pengaturan (digabung tab, hanya audit, dan versi tab lain). Disarankan memilih satu versi final.
3. **Data tidak konsisten antar halaman**, mis. Ir. Hendrawan tercatat UPTD Wilayah I di beberapa halaman dan UPTD II di Audit Log; jumlah ruas terdaftar 82 vs 186; total laporan 1.428 vs 1.244 vs 148 (sebagian adalah angka lokal UPTD vs provinsi).
4. **Tanggal** pada beberapa laporan (mis. Feb 2026 pada dashboard warga) berbeda dari tanggal acuan Mei 2026.
5. Sidebar warga memakai lebar **288px**, sedangkan petugas/admin **256px**; sebaiknya distandarkan bila ingin satu kerangka.
6. Foto avatar/aset gambar dan peta memakai placeholder dari URL eksternal; perlu diganti aset final dan peta nyata (Leaflet/Google Maps).

---

## 9. Rekomendasi Implementasi

- **Stack:** Tailwind CSS + token tema di atas (`tailwind.config`), komponen dipecah (React/Vue/Blade).
- **Peta:** Leaflet / MapLibre dengan layer GeoJSON ruas jalan dan marker status.
- **Aksesibilitas:** kontras teks minimal AA; jangan mengandalkan warna saja (sertakan ikon/label pada status).
- **Responsif:** sidebar menjadi drawer di bawah `lg`; tabel scroll horizontal; grid 12 kolom runtuh menjadi 1 kolom.
- **Keamanan UI:** NIK disamarkan (`187102********91`), 2FA, session timeout, audit trail immutable.

---

*Dokumen ini disusun dari kumpulan halaman HTML prototipe SMARTROAD.*
