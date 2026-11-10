# PRODUCT REQUIREMENT DOCUMENT (PRD)
## SMARTROAD: Sistem Monitoring Infrastruktur Jalan Berbasis Web

---

## Informasi Dokumen

| Field | Keterangan |
| :--- | :--- |
| **Nama Mahasiswa** | Arifki Al Kausar |
| **NPM** | 24311066 |
| **Program Studi** | Sistem Informasi |
| **Institusi** | Universitas Teknokrat Indonesia |
| **Tahun** | 2026 |
| **Versi Dokumen** | 1.0-Draft PRD |
| **Teknologi Utama** | Rust (Axum), PostgreSQL, SQLx, React |
| **Hak Cipta** | Copyright © 2026 by Arifki Al Kausar dan Dr. Erliyan Redy Susanto, M.Kom |

---

## Kontrol Dokumen

| Versi | Tanggal | Perubahan | Status |
| :---: | :---: | :--- | :---: |
| **1.0** | 10 November 2026 | Penyusunan awal PRD berdasarkan hasil brainstorming SmartRoad. | Draft untuk ditinjau |

---

## 1. Ringkasan Produk

**SmartRoad** adalah aplikasi web untuk membantu pemerintah daerah mengelola informasi kondisi infrastruktur jalan. 

* **Masyarakat** dapat mengirim laporan kerusakan dengan deskripsi, foto, kategori, dan lokasi.
* **Petugas** memeriksa serta memperbarui tindak lanjut.
* **Administrator** memantau data, pengguna, statistik, dan rekapitulasi laporan.

Tujuan utamanya adalah membuat proses pelaporan lebih terstruktur, meningkatkan keterlacakan penanganan, dan menyediakan informasi yang dapat digunakan sebagai bahan evaluasi pemeliharaan jalan.

Ruang lingkup awal mengacu pada identitas Pemda Lampung sesuai logo yang diberikan. Wilayah pilot operasional (provinsi/kabupaten/kota dan unit dinas penanggung jawab) perlu ditetapkan bersama pemilik proses sebelum implementasi.

---

## 2. Latar Belakang dan Permasalahan

1. Saluran pelaporan kerusakan jalan dapat tersebar sehingga laporan sulit dihimpun dan ditelusuri.
2. Laporan sering kali belum dilengkapi informasi lokasi dan bukti foto yang terstruktur.
3. Petugas membutuhkan antrean kerja dan mekanisme verifikasi yang jelas.
4. Pelapor membutuhkan informasi perkembangan penanganan tanpa harus menanyakan secara manual.
5. Pemerintah daerah membutuhkan data historis dan ringkasan untuk menentukan prioritas pemeliharaan.

---

## 3. Tujuan dan Indikator Keberhasilan

| Tujuan | Indikator Keberhasilan Awal |
| :--- | :--- |
| **Memudahkan pelaporan** | Pengguna dapat membuat laporan melalui formulir web dan menerima nomor laporan. |
| **Meningkatkan kelengkapan data** | Laporan menyimpan kategori, uraian, lokasi, waktu, dan foto sesuai aturan. |
| **Memperjelas tindak lanjut** | Setiap perubahan status tercatat beserta petugas, waktu, dan catatan. |
| **Meningkatkan transparansi** | Pelapor dapat melihat status dan riwayat laporan miliknya. |
| **Mendukung evaluasi** | Admin dapat melihat statistik dan mengekspor rekap laporan. |

---

## 4. Ruang Lingkup Produk

### 4.1 Termasuk dalam MVP
* Registrasi, login, logout, dan pengelolaan profil.
* Hak akses berbasis peran: **Masyarakat**, **Petugas**, dan **Administrator**.
* Pembuatan laporan kerusakan jalan beserta foto dan koordinat/alamat.
* Daftar, pencarian, filter, dan detail laporan.
* Verifikasi laporan, penerimaan atau penolakan dengan alasan.
* Pembaruan status penanganan dan dokumentasi hasil perbaikan.
* Dashboard statistik dan peta titik laporan.
* Pengelolaan data ruas jalan, pengguna, dan ekspor rekap laporan.

### 4.2 Tidak Termasuk dalam MVP
* Deteksi kerusakan otomatis menggunakan *computer vision* atau AI.
* Integrasi sensor IoT untuk pemantauan jalan secara otomatis.
* Integrasi langsung dengan sistem pengadaan, penganggaran, atau ERP pemerintah.
* Pembayaran digital dan pengadaan material perbaikan.
* Aplikasi *native* Android/iOS (MVP berupa web responsif).

---

## 5. Pengguna, Peran, dan Hak Akses

| Peran | Kebutuhan dan Kewenangan |
| :--- | :--- |
| **Masyarakat** | Registrasi/login; membuat laporan; mengunggah foto; melihat, mencari, dan memantau laporan milik sendiri; memberi tanggapan bila disediakan. |
| **Petugas** | Melihat laporan yang ditugaskan/masuk sesuai wilayah; memverifikasi; menerima/menolak; memperbarui status; menambahkan catatan dan foto tindak lanjut. |
| **Administrator Pemda** | Mengelola akun dan peran; data ruas jalan; seluruh laporan; penugasan; kategori; dashboard; ekspor; dan konfigurasi dasar. |

> **Prinsip Otorisasi:** Masyarakat hanya dapat mengakses laporan miliknya; petugas hanya dapat mengelola laporan sesuai kewenangan/wilayah yang diberikan; administrator memiliki akses administratif penuh. Semua aksi penting dicatat dalam *audit log*.

---

## 6. Alur Utama Pengguna

```
[Masyarakat] Login / Register
      │
      ▼
Buat Laporan (Judul, Uraian, Kategori, Tingkat Kerusakan, Lokasi, Foto)
      │
      ▼
Sistem Menyimpan Laporan (Status: Menunggu)
      │
      ▼
[Petugas] Memeriksa Kelengkapan & Lokasi
      │
      ├──────────────────────────────┐
      ▼                              ▼
Diverifikasi ──► Ditolak (Wajib alasan)
      │
      ▼
Diterima
      │
      ▼
Dalam Perbaikan (Catatan Pekerjaan Ditambahkan)
      │
      ▼
Selesai (Upload Dokumentasi Akhir)
      │
      ▼
[Masyarakat] Memantau Riwayat Perkembangan
```

1. Masyarakat membuat akun atau login.
2. Masyarakat membuka menu **Buat Laporan**, mengisi judul, deskripsi, kategori, tingkat kerusakan, alamat/koordinat, dan foto.
3. Sistem memvalidasi input dan menyimpan laporan dengan status **Menunggu**.
4. Petugas memeriksa kelengkapan, bukti, dan lokasi laporan.
5. Petugas mengubah status menjadi **Diverifikasi**, lalu **Diterima** atau **Ditolak**. Penolakan wajib disertai alasan.
6. Untuk laporan diterima, petugas memperbarui status menjadi **Dalam Perbaikan** dan menambahkan catatan pekerjaan.
7. Setelah pekerjaan selesai, petugas mengunggah dokumentasi akhir dan mengubah status menjadi **Selesai**.
8. Masyarakat melihat perkembangan dan riwayat status laporan.

---

## 7. Kebutuhan Fungsional (Functional Requirements)

| ID | Fitur | Kebutuhan |
| :---: | :--- | :--- |
| **FR-01** | Autentikasi | Sistem menyediakan registrasi, login, logout, dan pengelolaan sesi pengguna. |
| **FR-02** | Role & Akses | Sistem membatasi menu dan API berdasarkan peran Masyarakat, Petugas, dan Administrator. |
| **FR-03** | Buat Laporan | Masyarakat dapat mengirim laporan berisi judul, uraian, kategori, tingkat kerusakan, dan lokasi. |
| **FR-04** | Lampiran Foto | Sistem menerima foto laporan dengan validasi tipe dan ukuran file. |
| **FR-05** | Nomor Laporan | Sistem menghasilkan nomor laporan unik untuk setiap laporan baru. |
| **FR-06** | Daftar & Detail | Pengguna dapat melihat laporan sesuai hak akses beserta detail dan riwayatnya. |
| **FR-07** | Verifikasi | Petugas dapat memeriksa laporan dan memberi keputusan diterima atau ditolak dengan alasan. |
| **FR-08** | Status Penanganan | Petugas dapat mengubah status sesuai alur dan menambahkan catatan tindak lanjut. |
| **FR-09** | Data Ruas Jalan | Admin dapat menambah, mengubah, melihat, dan menonaktifkan data ruas jalan. |
| **FR-10** | Manajemen Pengguna | Admin dapat mengelola akun, peran, dan status aktif pengguna. |
| **FR-11** | Dashboard | Sistem menampilkan jumlah laporan berdasarkan status, kategori, dan rentang tanggal. |
| **FR-12** | Peta Laporan | Sistem menampilkan titik koordinat laporan pada peta. |
| **FR-13** | Pencarian / Filter | Pengguna berwenang dapat memfilter laporan berdasarkan status, kategori, tanggal, dan wilayah. |
| **FR-14** | Ekspor | Admin dapat mengunduh rekap laporan dalam format CSV/PDF. |
| **FR-15** | Audit Aktivitas | Sistem mencatat aktivitas penting, termasuk perubahan status dan pengelolaan akun. |

---

## 8. Aturan Bisnis (Business Rules)

1. Laporan baru memiliki status awal **Menunggu**.
2. Laporan wajib memiliki judul, deskripsi, kategori, dan lokasi; foto diwajibkan pada MVP agar verifikasi berbasis bukti lebih kuat.
3. Koordinat lintang harus berada pada rentang $-90^\circ$ hingga $90^\circ$ dan bujur $-180^\circ$ hingga $180^\circ$; wilayah operasional dapat dibatasi sesuai konfigurasi.
4. Penolakan laporan wajib menyimpan alasan penolakan.
5. Perubahan status hanya dapat dilakukan oleh petugas/admin yang berwenang dan harus dicatat dalam riwayat.
6. Status **Selesai** harus memiliki catatan penyelesaian; foto setelah perbaikan dianjurkan dan dapat diwajibkan oleh kebijakan Pemda.
7. Masyarakat tidak dapat mengubah status verifikasi atau melihat data pribadi pelapor lain.
8. Penghapusan data laporan dilakukan secara terbatas; utamakan arsip/nonaktif agar jejak penanganan tidak hilang.

---

## 9. Status dan Transisi Laporan

| Status | Makna | Aktor yang Dapat Mengubah |
| :--- | :--- | :--- |
| **Menunggu** | Laporan baru tersimpan dan menunggu pemeriksaan. | Sistem |
| **Diverifikasi** | Petugas sedang memeriksa laporan. | Petugas / Admin |
| **Diterima** | Laporan dinyatakan valid untuk ditindaklanjuti. | Petugas / Admin |
| **Ditolak** | Laporan tidak dapat diproses; alasan wajib dicatat. | Petugas / Admin |
| **Dalam Perbaikan** | Penanganan/perbaikan sedang berlangsung. | Petugas / Admin |
| **Selesai** | Pekerjaan dinyatakan selesai dan dicatat. | Petugas / Admin |

---

## 10. Kebutuhan Non-Fungsional (Non-Functional Requirements)

| ID | Aspek | Persyaratan |
| :---: | :--- | :--- |
| **NFR-01** | Keamanan | Password di-hash dengan algoritma hashing yang sesuai (misalnya Argon2id); tidak menyimpan password *plaintext*. |
| **NFR-02** | Otorisasi | Setiap endpoint memeriksa role dan kepemilikan data di sisi server, bukan hanya menyembunyikan tombol di frontend. |
| **NFR-03** | Validasi | Validasi input dilakukan di backend; gunakan query *parameterized* melalui SQLx. |
| **NFR-04** | Privasi | Data pribadi pelapor hanya ditampilkan kepada pihak yang berwenang. |
| **NFR-05** | Kinerja | Daftar laporan menggunakan pagination dan filter di database; target awal respons API umum $p95 < 2$ detik pada beban uji yang disepakati. |
| **NFR-06** | Ketersediaan | Sistem memiliki prosedur backup PostgreSQL dan pemulihan data. |
| **NFR-07** | Responsif | Antarmuka dapat digunakan pada desktop, tablet, dan ponsel. |
| **NFR-08** | Aksesibilitas | Formulir memiliki label, pesan kesalahan jelas, kontras memadai, dan navigasi yang konsisten. |
| **NFR-09** | Auditabilitas | Perubahan status, role, dan data penting memiliki catatan aktor serta waktu. |
| **NFR-10** | Maintainability | Kode backend dipisahkan menjadi modul route, handler, service, model, dan repository. |

---

## 11. Rancangan Data PostgreSQL

Primary Key disarankan menggunakan `UUID`. Kolom waktu menggunakan `TIMESTAMPTZ` agar konsisten lintas zona waktu.

```
       +-----------------------+              +-----------------------+
       |         users         |              |     road_segments     |
       +-----------------------+              +-----------------------+
       | PK  id (UUID)         |<──┐          | PK  id (UUID)         |<──┐
       |     name              |   │          |     road_name         |   │
       |     email (UNIQUE)    |   │          |     district          |   │
       |     role              |   │          +-----------------------+   │
       +-----------------------+   │                                      │
                   │               │          +-----------------------+   │
                   │ (1:N)         │          |      categories       |   │
                   ▼               │          +-----------------------+   │
       +-----------------------+   │          | PK  id (UUID)         |<┐ │
       |        reports        |   │          |     name              | │ │
       +-----------------------+   │          +-----------------------+ │ │
       | PK  id (UUID)         |   │                      │             │ │
       | FK  reporter_id       |───┘                      │ (1:N)       │ │
       | FK  category_id       |──────────────────────────┘             │ │
       | FK  road_segment_id   |────────────────────────────────────────┘ │
       |     report_code       |                                          │
       |     title             |                                          │
       |     status            |                                          │
       +-----------------------+                                          │
        │           │           │                                         │
  (1:N) │     (1:N) │     (1:N) │                                         │
        ▼           ▼           ▼                                         │
+---------------+ +--------------------------+ +--------------------+     │
| report_       | | report_status_histories  | |    work_updates    |     │
| attachments   | +--------------------------+ +--------------------+     │
+---------------+ | PK  id (UUID)            | | PK  id (UUID)      |     │
| PK  id (UUID) | | FK  report_id            | | FK  report_id      |     │
| FK  report_id | | FK  changed_by ──────────┼─┼─► FK officer_id   |     │
| FK  uploaded_ | |     old_status           | |     work_note      |     │
|     by ───────┼─┼─────new_status           | +--------------------+     │
+---------------+ |     note                 |                            │
                  +--------------------------+                            │
                                                                          │
+-------------------------------------------------------------------------+
|                               audit_logs                                |
+-------------------------------------------------------------------------+
| PK  id (UUID)                                                           |
| FK  actor_id ───────────────────────────────────────────────────────────┘
|     action, entity_type, entity_id, metadata (JSONB)                    |
+-------------------------------------------------------------------------+
```

### Tabel & Struktur Kolom

1. **`users`**
   * `id`: UUID (PK)
   * `name`: VARCHAR
   * `email`: VARCHAR (UNIQUE)
   * `password_hash`: VARCHAR
   * `role`: VARCHAR (Masyarakat / Petugas / Admin)
   * `is_active`: BOOLEAN
   * `created_at`: TIMESTAMPTZ

2. **`road_segments`**
   * `id`: UUID (PK)
   * `road_name`: VARCHAR
   * `road_code`: VARCHAR
   * `district`: VARCHAR
   * `subdistrict`: VARCHAR
   * `description`: TEXT
   * `is_active`: BOOLEAN

3. **`categories`**
   * `id`: UUID (PK)
   * `name`: VARCHAR
   * `description`: TEXT

4. **`reports`**
   * `id`: UUID (PK)
   * `report_code`: VARCHAR (UNIQUE)
   * `reporter_id`: UUID (FK -> `users.id`)
   * `road_segment_id`: UUID (FK NULL -> `road_segments.id`)
   * `category_id`: UUID (FK -> `categories.id`)
   * `title`: VARCHAR
   * `description`: TEXT
   * `severity`: VARCHAR
   * `latitude`: NUMERIC / DOUBLE PRECISION
   * `longitude`: NUMERIC / DOUBLE PRECISION
   * `address`: TEXT
   * `status`: VARCHAR
   * `created_at`: TIMESTAMPTZ
   * `updated_at`: TIMESTAMPTZ

5. **`report_attachments`**
   * `id`: UUID (PK)
   * `report_id`: UUID (FK -> `reports.id`)
   * `file_key`: VARCHAR
   * `mime_type`: VARCHAR
   * `file_size`: INT
   * `attachment_type`: VARCHAR
   * `uploaded_by`: UUID (FK -> `users.id`)
   * `created_at`: TIMESTAMPTZ

6. **`report_status_histories`**
   * `id`: UUID (PK)
   * `report_id`: UUID (FK -> `reports.id`)
   * `old_status`: VARCHAR
   * `new_status`: VARCHAR
   * `note`: TEXT
   * `changed_by`: UUID (FK -> `users.id`)
   * `changed_at`: TIMESTAMPTZ

7. **`work_updates`**
   * `id`: UUID (PK)
   * `report_id`: UUID (FK -> `reports.id`)
   * `officer_id`: UUID (FK -> `users.id`)
   * `work_note`: TEXT
   * `started_at`: TIMESTAMPTZ
   * `completed_at`: TIMESTAMPTZ

8. **`audit_logs`**
   * `id`: UUID (PK)
   * `actor_id`: UUID (FK -> `users.id`)
   * `action`: VARCHAR
   * `entity_type`: VARCHAR
   * `entity_id`: UUID
   * `metadata`: JSONB
   * `created_at`: TIMESTAMPTZ

### Indeks dan Constraint
* **Indeks Unik:** `users.email` dan `reports.report_code`.
* **Indeks Pencarian:** `reports(status, created_at)`, `reports(category_id)`, `reports(road_segment_id)`.
* **Constraint:** `CHECK` untuk koordinat (lat: -90 s.d 90, long: -180 s.d 180) dan `severity`. `NOT NULL` pada field wajib.

---

## 12. Rancangan API Backend Rust (Axum)

Backend dirancang sebagai REST API JSON menggunakan **Rust** dan **Axum**. **SQLx** digunakan untuk akses PostgreSQL secara *asynchronous*.

| Method & Endpoint | Akses Hak Akses | Kegunaan |
| :--- | :--- | :--- |
| `POST /api/auth/register` | Publik | Registrasi akun masyarakat. |
| `POST /api/auth/login` | Publik | Login dan penerbitan token. |
| `GET /api/me` | Semua Role | Profil pengguna yang sedang login. |
| `POST /api/reports` | Masyarakat | Membuat laporan baru. |
| `GET /api/reports` | Sesuai Role | Daftar laporan dengan pagination/filter. |
| `GET /api/reports/{id}` | Pemilik / Petugas / Admin | Detail laporan dan riwayat. |
| `POST /api/reports/{id}/attachments` | Pemilik / Petugas | Mengunggah lampiran sesuai izin. |
| `PATCH /api/reports/{id}/status` | Petugas / Admin | Memperbarui status dengan aturan transisi. |
| `POST /api/reports/{id}/updates` | Petugas / Admin | Menambahkan catatan tindak lanjut. |
| `GET /api/dashboard/summary` | Petugas / Admin | Statistik ringkasan. |
| `GET /api/road-segments` | Sesuai Role | Daftar ruas jalan. |
| `POST /api/road-segments` | Admin | Menambahkan ruas jalan. |
| `GET /api/admin/users` | Admin | Mengelola pengguna. |
| `GET /api/reports/export` | Admin | Ekspor rekap laporan (CSV/PDF). |

---

## 13. Validasi Kesesuaian Rust dan PostgreSQL

> **Catatan:** Validasi ini merupakan kesesuaian rancangan arsitektur (*design/architecture validation*), bukan klaim bahwa pengujian *runtime* telah selesai.

| Kebutuhan PRD | Dukungan Rust / Axum / SQLx | Dukungan PostgreSQL | Hasil |
| :--- | :--- | :--- | :---: |
| **REST API & JSON** | Axum menyediakan routing, extractor, middleware, dan handler async. | Menyimpan data yang diakses API. | **Sesuai** |
| **Akses Data Relasional** | SQLx menyediakan koneksi async, pool, transaksi, dan query SQL. | PK, FK, UNIQUE, CHECK, indeks, transaksi. | **Sesuai** |
| **Role-based Access** | Middleware/extractor memvalidasi token JWT dan role. | Role disimpan sebagai kolom/enum; data terkait FK. | **Sesuai** |
| **Riwayat Status** | Service Rust mengatur transisi dan menulis histori dalam 1 transaksi. | Transaksi menjaga laporan & histori tetap konsisten. | **Sesuai** |
| **Filter & Pagination** | Handler memvalidasi parameter query dan meneruskan ke repository. | `WHERE`, `ORDER BY`, `LIMIT/OFFSET` atau keyset pagination. | **Sesuai** |
| **Foto Laporan** | Rust memvalidasi metadata dan mengatur upload ke object storage. | PostgreSQL menyimpan metadata & relasi file. | **Sesuai** |
| **Dashboard Statistik** | Rust menyediakan endpoint agregasi. | `COUNT`, `GROUP BY`, indeks, dan Materialized View. | **Sesuai** |
| **Audit Log** | Service mencatat aktor dan aksi. | Tabel `audit_logs` dengan JSONB dan timestamp. | **Sesuai** |

---

## 14. Rekomendasi Struktur Proyek

```text
smartroad/
├── backend/
│   ├── Cargo.toml
│   ├── migrations/
│   └── src/
│       ├── main.rs
│       ├── config.rs
│       ├── db.rs
│       ├── routes/
│       │   ├── mod.rs
│       │   ├── auth.rs
│       │   ├── reports.rs
│       │   ├── users.rs
│       │   └── dashboard.rs
│       ├── handlers/
│       ├── services/
│       ├── repositories/
│       ├── models/
│       ├── middleware/
│       └── errors.rs
├── frontend/
│   ├── package.json
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── hooks/
└── docs/
    └── PRD_SmartRoad.docx
```

---

## 15. Identitas Visual dan Ketentuan Footer Aplikasi

1. **Logo Aplikasi:**
   * Menampilkan **Logo Pemda Lampung** dan **Logo Universitas Teknokrat Indonesia** secara berdampingan pada area identitas (misal: header/sidebar).
   * Logo harus proporsional, tidak dipotong, tidak diubah warna/bentuknya, serta memiliki *alt text* yang sesuai.
2. **Teks Footer Aplikasi:**
   Teks footer wajib tampil di bagian bawah halaman aplikasi dengan penulisan persis sebagai berikut:
   > **Copyright © 2026 by Arifki Al Kausar dan Dr. Erliyan Redy Susanto, M.Kom**

---

## 16. Kebutuhan Antarmuka per Pengguna

* **Masyarakat:** Landing/login, registrasi, dashboard pribadi, formulir laporan, daftar & detail laporan, peta laporan, profil.
* **Petugas:** Dashboard petugas, antrean laporan, detail/verifikasi, pembaruan status, catatan pekerjaan, dokumentasi hasil.
* **Administrator:** Dashboard admin, manajemen pengguna, data ruas jalan, seluruh laporan, kategori, statistik, ekspor, audit log.

---

## 17. Kriteria Penerimaan (Acceptance Criteria)

1. Masyarakat dapat mendaftar dan login dengan kredensial valid; login gagal menampilkan pesan aman tanpa membocorkan detail spesifik kesalahan.
2. Masyarakat dapat membuat laporan dengan semua field wajib; sistem menghasilkan kode laporan unik dan status **Menunggu**.
3. Laporan tanpa field wajib atau koordinat tidak valid ditolak oleh backend dengan respons validasi yang jelas.
4. Pengguna tidak dapat membaca atau mengubah laporan milik pengguna lain melalui manipulasi ID pada URL/API (*IDOR protection*).
5. Petugas dapat menerima atau menolak laporan; penolakan tanpa alasan tidak dapat disimpan.
6. Perubahan status menghasilkan satu entri histori yang memuat status lama, status baru, aktor, waktu, dan catatan.
7. Dashboard menghitung total laporan berdasarkan data database dan filter tanggal/status bekerja dengan benar.
8. Logo Pemda Lampung dan Universitas Teknokrat Indonesia tampil proporsional pada antarmuka.
9. Footer aplikasi menampilkan teks *copyright* yang ditentukan secara konsisten.

---

## 18. Validasi dan Rencana Pengujian Teknis

| Area Validasi | Metode yang Disarankan | Kriteria Lulus |
| :--- | :--- | :--- |
| **Build Rust** | `cargo check` dan `cargo build --release` | Tidak ada error kompilasi. |
| **Migrasi Database** | Jalankan migrasi SQLx pada PostgreSQL test. | Semua tabel, constraint, dan indeks terbentuk. |
| **Integrasi DB** | Uji CRUD dan transaksi menggunakan DB test. | Data tersimpan konsisten; rollback berjalan saat gagal. |
| **API** | Unit / integration test untuk endpoint Axum. | Status code, body, dan validasi sesuai kontrak. |
| **Otorisasi** | Uji akses lintas role dan IDOR. | Akses tanpa izin ditolak ($401 / 403$). |
| **Upload File** | Uji tipe file, ukuran, ekstensi, dan nama file. | File tidak valid ditolak; file aman tersimpan. |
| **Alur Status** | Uji semua transisi status yang diizinkan/ilegal. | Transisi ilegal ditolak; histori konsisten. |
| **Frontend** | Uji tampilan desktop dan mobile. | Responsive layout; footer tidak menutupi konten. |

---

## 19. Risiko, Asumsi, dan Ketergantungan

* Penentuan instansi/unit Pemda dan batas wilayah pilot masih perlu konfirmasi.
* Kualitas laporan bergantung pada kelengkapan foto, deskripsi, dan lokasi dari pelapor.
* Peta memerlukan koneksi internet dan kebijakan penggunaan tile/geocoding yang sesuai.
* Foto memerlukan *object storage*; PostgreSQL hanya menyimpan metadata dan referensi file.
* Deployment Rust API dan PostgreSQL membutuhkan layanan hosting yang kompatibel (misalnya Vercel untuk frontend, dan VPS/Cloud Provider untuk backend Rust & DB).

---

## 20. Kesimpulan PRD

PRD ini mendefinisikan kebutuhan awal SmartRoad sebagai sistem pelaporan dan monitoring infrastruktur jalan. Rancangan kebutuhan fungsional, non-fungsional, peran pengguna, alur status, model data, dan API dinilai sesuai untuk diimplementasikan menggunakan Rust dengan Axum dan SQLx serta PostgreSQL sebagai basis data relasional.

Sebelum coding dimulai, hal utama yang perlu dikonfirmasi adalah:
1. Wilayah pilot dan unit Pemda penanggung jawab.
2. Aturan wajib foto dan kebijakan penugasan petugas.
3. Layanan penyimpanan file (*object storage*) dan hosting backend.

---
*Dokumen ini dibuat berdasarkan draf PRD SmartRoad (2026).*