-- SMARTROAD: PostgreSQL Database Initialization & Migration Script
-- Based on Section 11 of PRD.md (Product Requirement Document)
-- Copyright © 2026 by Arifki Al Kausar dan Dr. Erliyan Redy Susanto, M.Kom

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabel Users
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('Masyarakat', 'Petugas', 'Admin')),
    nik VARCHAR(16),
    phone VARCHAR(20),
    uptd_region VARCHAR(100),
    reputation_score INT DEFAULT 90 CHECK (reputation_score BETWEEN 0 AND 100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Road Segments (Ruas Jalan Provinsi)
CREATE TABLE IF NOT EXISTS road_segments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    road_code VARCHAR(50) UNIQUE NOT NULL,
    road_name VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    subdistrict VARCHAR(100),
    length_km NUMERIC(6, 2) NOT NULL DEFAULT 0.0,
    condition_status VARCHAR(50) DEFAULT 'Mantap' CHECK (condition_status IN ('Mantap', 'Rusak Ringan', 'Rusak Berat')),
    sta_start VARCHAR(100),
    sta_end VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- 3. Tabel Categories (Kategori Kerusakan Jalan)
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- 4. Tabel Reports (Laporan Kerusakan)
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_code VARCHAR(50) UNIQUE NOT NULL,
    reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    road_segment_id UUID REFERENCES road_segments(id) ON DELETE SET NULL,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('Ringan', 'Sedang', 'Berat')),
    latitude DOUBLE PRECISION NOT NULL CHECK (latitude BETWEEN -90.0 AND 90.0),
    longitude DOUBLE PRECISION NOT NULL CHECK (longitude BETWEEN -180.0 AND 180.0),
    address TEXT NOT NULL,
    district VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Menunggu Validasi' CHECK (
        status IN ('Menunggu Validasi', 'Diverifikasi', 'Diterima', 'Dalam Perbaikan', 'Selesai', 'Ditolak')
    ),
    rejection_reason TEXT,
    ai_urgency_score NUMERIC(3, 1) DEFAULT 5.0,
    sla_deadline TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for high-performance querying & filtering
CREATE INDEX IF NOT EXISTS idx_reports_status_created ON reports(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_category ON reports(category_id);
CREATE INDEX IF NOT EXISTS idx_reports_road_segment ON reports(road_segment_id);
CREATE INDEX IF NOT EXISTS idx_reports_reporter ON reports(reporter_id);

-- 5. Tabel Report Attachments (Lampiran Foto Ber-geotag)
CREATE TABLE IF NOT EXISTS report_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    file_key VARCHAR(255) NOT NULL,
    mime_type VARCHAR(50) NOT NULL,
    file_size INT NOT NULL,
    attachment_type VARCHAR(20) NOT NULL CHECK (attachment_type IN ('before', 'in_progress', 'after')),
    uploaded_by UUID NOT NULL REFERENCES users(id),
    geotag_lat DOUBLE PRECISION,
    geotag_lng DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tabel Report Status Histories (Audit Trail Transisi Status)
CREATE TABLE IF NOT EXISTS report_status_histories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    old_status VARCHAR(50) NOT NULL,
    new_status VARCHAR(50) NOT NULL,
    note TEXT NOT NULL,
    changed_by UUID NOT NULL REFERENCES users(id),
    changed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. Tabel Work Updates (Surat Perintah Kerja / SPK & Log Fisik)
CREATE TABLE IF NOT EXISTS work_updates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    spk_number VARCHAR(100) UNIQUE NOT NULL,
    officer_id UUID NOT NULL REFERENCES users(id),
    contractor_name VARCHAR(255) NOT NULL,
    length_m NUMERIC(6, 2) DEFAULT 0.0,
    width_m NUMERIC(6, 2) DEFAULT 0.0,
    depth_m NUMERIC(6, 2) DEFAULT 0.0,
    volume_m3 NUMERIC(8, 3) DEFAULT 0.0,
    estimated_cost_idr NUMERIC(15, 2) DEFAULT 0.0,
    work_note TEXT,
    progress_percent INT DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
    pho_issued BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMPTZ
);

-- 8. Tabel Audit Logs (Immutable GovTech Event Ledger)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audit_code VARCHAR(50) UNIQUE NOT NULL,
    actor_id UUID NOT NULL REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    hash_sha256 VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- SEED DATA AWAL: Kategori Kerusakan Jalan
INSERT INTO categories (name, description) VALUES
('Jalan Berlubang', 'Lubang pada permukaan aspal atau perkerasan beton yang membahayakan pengendara'),
('Retak Buaya', 'Pola retak saling menyambung menyerupai sisik buaya akibat kelelahan struktur jalan'),
('Amblas / Longsor', 'Penurunan elevasi badan jalan atau kelongsoran lereng penahan tanah jalan'),
('Rusak Berat', 'Kerusakan struktural menyeluruh atau agregat pondasi terangkat ke permukaan'),
('Tergenang / Drainase', 'Genangan air merusak perkerasan akibat saluran drainase samping tersumbat'),
('Lainnya', 'Kerusakan pelengkap jalan seperti trotoar, marka jalan, guardrail, atau rambu')
ON CONFLICT DO NOTHING;

-- SEED DATA AWAL: Ruas Jalan Utama Provinsi Lampung
INSERT INTO road_segments (road_code, road_name, district, subdistrict, length_km, condition_status, sta_start, sta_end) VALUES
('KDJ-LPG-001', 'Jl. Z.A. Pagar Alam', 'Kota Bandar Lampung', 'Rajabasa - Kedaton', 7.40, 'Mantap', 'STA 0+000 Terminal Rajabasa', 'STA 7+400 Mall Boemi Kedaton'),
('KDJ-LPG-002', 'Jl. Teuku Umar', 'Kota Bandar Lampung', 'Kedaton - Tanjung Karang', 4.80, 'Rusak Ringan', 'STA 0+000 Pasar Koga', 'STA 4+800 Bambu Kuning Plaza'),
('KDJ-LPG-003', 'Jl. Raden Intan', 'Kota Bandar Lampung', 'Enggal', 3.20, 'Mantap', 'STA 0+000 Ramayana', 'STA 3+200 Tugu Adipura'),
('KDJ-LPG-004', 'Jl. Ryacudu (Akses Tol Itera)', 'Kabupaten Lampung Selatan', 'Jati Agung - Sukarame', 8.50, 'Rusak Berat', 'STA 0+000 Flyover Kimaja', 'STA 8+500 Gerbang Tol Itera Kota Baru'),
('KDJ-LPG-005', 'Jl. Soekarno-Hatta (By Pass)', 'Kota Bandar Lampung', 'Panjang - Rajabasa', 18.20, 'Rusak Ringan', 'STA 0+000 Simpang Rajabasa', 'STA 18+200 Pelabuhan Panjang')
ON CONFLICT (road_code) DO NOTHING;

