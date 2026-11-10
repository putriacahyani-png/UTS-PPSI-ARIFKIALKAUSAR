import { User, RoadSegment, Category, Report, AuditLog, SystemConfig } from '../types';

export const SYSTEM_CONFIG: SystemConfig = {
  appName: 'SMARTROAD',
  organization: 'Pemerintah Provinsi Lampung',
  partner: 'Universitas Teknokrat Indonesia',
  tagline: 'Pantau Jalan, Bangun Kenyamanan',
  footerText: 'Copyright © 2026 by Arifki Al Kausar dan Dr. Erliyan Redy Susanto, M.Kom',
  slaHoursNormal: 72,
  slaHoursCritical: 24,
  version: '1.0-Release 2026'
};

export const LAMPUNG_DISTRICTS = [
  'Kota Bandar Lampung',
  'Kota Metro',
  'Kabupaten Lampung Selatan',
  'Kabupaten Pesawaran',
  'Kabupaten Pringsewu',
  'Kabupaten Tanggamus',
  'Kabupaten Lampung Barat',
  'Kabupaten Pesisir Barat',
  'Kabupaten Lampung Tengah',
  'Kabupaten Lampung Timur',
  'Kabupaten Lampung Utara',
  'Kabupaten Way Kanan',
  'Kabupaten Tulang Bawang',
  'Kabupaten Tulang Bawang Barat',
  'Kabupaten Mesuji'
];

export const CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Jalan Berlubang', description: 'Lubang pada permukaan aspal atau perkerasan beton', icon: 'trip_origin' },
  { id: 'cat-2', name: 'Retak Buaya', description: 'Retak saling berhubungan membentuk pola kulit buaya', icon: 'grid_on' },
  { id: 'cat-3', name: 'Amblas / Longsor', description: 'Penurunan elevasi badan jalan atau kelongsoran lereng jalan', icon: 'landslide' },
  { id: 'cat-4', name: 'Rusak Berat', description: 'Struktur jalan terputus atau agregat dasar terkelupas', icon: 'report_problem' },
  { id: 'cat-5', name: 'Tergenang / Drainase', description: 'Saluran samping tersumbat menyebabkan genangan di badan jalan', icon: 'water' },
  { id: 'cat-6', name: 'Lainnya', description: 'Kerusakan bahu jalan, trotoar, marka, atau guardrail', icon: 'more_horiz' }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-warga-1',
    name: 'Budi Santoso',
    email: 'warga@smartroad.lampungprov.go.id',
    role: 'Masyarakat',
    nik: '1871021405920003',
    phone: '+6281273948123',
    reputation_score: 96,
    is_active: true,
    created_at: '2026-01-15T08:00:00Z'
  },
  {
    id: 'usr-petugas-1',
    name: 'Ir. Hendrawan, S.T., M.T.',
    email: 'petugas@smartroad.lampungprov.go.id',
    role: 'Petugas',
    nik: '198204122008011005',
    phone: '+6281369123456',
    uptd_region: 'UPTD Wilayah I (Bandar Lampung & Lamsel)',
    reputation_score: 99,
    is_active: true,
    created_at: '2026-01-10T08:00:00Z'
  },
  {
    id: 'usr-admin-1',
    name: 'Administrator Dinas BMBK',
    email: 'admin@smartroad.lampungprov.go.id',
    role: 'Admin',
    nik: '197908232003121002',
    phone: '+628117901234',
    uptd_region: 'Dinas BMBK Provinsi Lampung (Pusat)',
    reputation_score: 100,
    is_active: true,
    created_at: '2026-01-01T08:00:00Z'
  }
];

export const ROAD_SEGMENTS: RoadSegment[] = [
  {
    id: 'rd-1',
    road_code: 'KDJ-LPG-001',
    road_name: 'Jl. Z.A. Pagar Alam',
    district: 'Kota Bandar Lampung',
    subdistrict: 'Rajabasa - Kedaton',
    length_km: 7.4,
    condition_status: 'Mantap',
    sta_start: 'STA 0+000 Terminal Rajabasa',
    sta_end: 'STA 7+400 Mall Boemi Kedaton',
    is_active: true
  },
  {
    id: 'rd-2',
    road_code: 'KDJ-LPG-002',
    road_name: 'Jl. Teuku Umar',
    district: 'Kota Bandar Lampung',
    subdistrict: 'Kedaton - Tanjung Karang Pusat',
    length_km: 4.8,
    condition_status: 'Rusak Ringan',
    sta_start: 'STA 0+000 Pasar Koga',
    sta_end: 'STA 4+800 Bambu Kuning Plaza',
    is_active: true
  },
  {
    id: 'rd-3',
    road_code: 'KDJ-LPG-003',
    road_name: 'Jl. Raden Intan',
    district: 'Kota Bandar Lampung',
    subdistrict: 'Enggal',
    length_km: 3.2,
    condition_status: 'Mantap',
    sta_start: 'STA 0+000 Ramayana',
    sta_end: 'STA 3+200 Tugu Adipura',
    is_active: true
  },
  {
    id: 'rd-4',
    road_code: 'KDJ-LPG-004',
    road_name: 'Jl. Ryacudu (Akses Tol Itera)',
    district: 'Kabupaten Lampung Selatan',
    subdistrict: 'Jati Agung - Sukarame',
    length_km: 8.5,
    condition_status: 'Rusak Berat',
    sta_start: 'STA 0+000 Flyover Kimaja',
    sta_end: 'STA 8+500 Gerbang Tol Itera Kota Baru',
    is_active: true
  },
  {
    id: 'rd-5',
    road_code: 'KDJ-LPG-005',
    road_name: 'Jl. Soekarno-Hatta (By Pass)',
    district: 'Kota Bandar Lampung',
    subdistrict: 'Panjang - Rajabasa',
    length_km: 18.2,
    condition_status: 'Rusak Ringan',
    sta_start: 'STA 0+000 Simpang Rajabasa',
    sta_end: 'STA 18+200 Pelabuhan Panjang',
    is_active: true
  }
];

export const INITIAL_REPORTS: Report[] = [
  {
    id: 'rpt-001',
    report_code: '#RPT-2026-0891',
    reporter_id: 'usr-warga-1',
    reporter_name: 'Budi Santoso',
    reporter_nik_masked: '187102********03',
    reporter_reputation: 96,
    road_segment_id: 'rd-4',
    road_name: 'Jl. Ryacudu (Akses Tol Itera)',
    district: 'Kabupaten Lampung Selatan',
    subdistrict: 'Jati Agung',
    category_id: 'cat-1',
    category_name: 'Jalan Berlubang',
    title: 'Lubang Dalam di Lajur Cepat Dekat Kampus Itera',
    description: 'Terdapat 3 lubang berdiameter sekitar 80 cm dengan kedalaman 15 cm di lajur kanan arah gerbang tol. Sangat membahayakan pengendara motor terutama malam hari saat penerangan minim.',
    severity: 'Berat',
    latitude: -5.358241,
    longitude: 105.312954,
    address: 'Jl. Ryacudu KM 4.2, Seberang Asrama Mahasiswa ITERA, Desa Way Huwi, Jati Agung',
    status: 'Dalam Perbaikan',
    ai_urgency_score: 9.4,
    sla_deadline: '2026-05-15T18:00:00Z',
    attachments: [
      {
        id: 'att-1',
        report_id: 'rpt-001',
        file_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
        file_type: 'before',
        file_size: 2450000,
        mime_type: 'image/jpeg',
        uploaded_by: 'usr-warga-1',
        geotag_lat: -5.358241,
        geotag_lng: 105.312954,
        created_at: '2026-05-12T09:15:00Z'
      },
      {
        id: 'att-2',
        report_id: 'rpt-001',
        file_url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
        file_type: 'in_progress',
        file_size: 3120000,
        mime_type: 'image/jpeg',
        uploaded_by: 'usr-petugas-1',
        geotag_lat: -5.358240,
        geotag_lng: 105.312950,
        created_at: '2026-05-14T08:30:00Z'
      }
    ],
    histories: [
      {
        id: 'hst-1',
        report_id: 'rpt-001',
        old_status: 'Menunggu Validasi',
        new_status: 'Menunggu Validasi',
        note: 'Laporan berhasil dibuat oleh warga dengan koordinat GPS terverifikasi.',
        changed_by_name: 'Budi Santoso',
        changed_by_role: 'Masyarakat',
        created_at: '2026-05-12T09:15:00Z'
      },
      {
        id: 'hst-2',
        report_id: 'rpt-001',
        old_status: 'Menunggu Validasi',
        new_status: 'Diverifikasi',
        note: 'Verifikasi lapangan oleh UPTD Wilayah I. Koordinat dan dimensi kerusakan dikonfirmasi valid.',
        changed_by_name: 'Ir. Hendrawan, S.T., M.T.',
        changed_by_role: 'Petugas',
        created_at: '2026-05-13T10:00:00Z'
      },
      {
        id: 'hst-3',
        report_id: 'rpt-001',
        old_status: 'Diverifikasi',
        new_status: 'Diterima',
        note: 'SPK Nomor 602/088/SPK-BM/DPUPR/2026 diterbitkan kepada rekanan UPTD Wilayah I.',
        changed_by_name: 'Administrator Dinas BMBK',
        changed_by_role: 'Admin',
        created_at: '2026-05-13T14:30:00Z'
      },
      {
        id: 'hst-4',
        report_id: 'rpt-001',
        old_status: 'Diterima',
        new_status: 'Dalam Perbaikan',
        note: 'Pekerjaan patching cold mix & pemadatan tack coat tahap 1 dimulai oleh Tim Respon Cepat.',
        changed_by_name: 'Ir. Hendrawan, S.T., M.T.',
        changed_by_role: 'Petugas',
        created_at: '2026-05-14T08:30:00Z'
      }
    ],
    work_update: {
      id: 'spk-001',
      report_id: 'rpt-001',
      spk_number: '602/088/SPK-BM/DPUPR/2026',
      officer_id: 'usr-petugas-1',
      officer_name: 'Ir. Hendrawan, S.T., M.T.',
      contractor_name: 'PT Lampung Prasarana Konstruksi (UPTD I)',
      length_m: 6.5,
      width_m: 2.2,
      depth_m: 0.15,
      volume_m3: 2.145,
      estimated_cost_idr: 14500000,
      work_note: 'Telah dilakukan perapian tepi lubang (cutting jack hammer) dan pemberian emulsi aspal tack coat. Menunggu penggelaran aspal panas AC-WC.',
      progress_percent: 65,
      pho_issued: false,
      started_at: '2026-05-14T08:00:00Z'
    },
    created_at: '2026-05-12T09:15:00Z',
    updated_at: '2026-05-14T08:30:00Z'
  },
  {
    id: 'rpt-002',
    report_code: '#RPT-2026-0892',
    reporter_id: 'usr-warga-1',
    reporter_name: 'Ahmad Dahlan',
    reporter_nik_masked: '187103********12',
    reporter_reputation: 91,
    road_segment_id: 'rd-2',
    road_name: 'Jl. Teuku Umar',
    district: 'Kota Bandar Lampung',
    subdistrict: 'Kedaton',
    category_id: 'cat-2',
    category_name: 'Retak Buaya',
    title: 'Retak Buaya Parah Depan Pasar Koga',
    description: 'Permukaan aspal pecah memanjang lebih dari 15 meter, struktur jalan mulai amblas saat dilintasi truk ekspedisi.',
    severity: 'Sedang',
    latitude: -5.391218,
    longitude: 105.258921,
    address: 'Jl. Teuku Umar No. 88, Samping Jembatan Penyeberangan Pasar Koga, Kedaton',
    status: 'Menunggu Validasi',
    ai_urgency_score: 7.2,
    sla_deadline: '2026-05-16T11:00:00Z',
    attachments: [
      {
        id: 'att-3',
        report_id: 'rpt-002',
        file_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
        file_type: 'before',
        file_size: 1980000,
        mime_type: 'image/jpeg',
        uploaded_by: 'usr-warga-1',
        geotag_lat: -5.391218,
        geotag_lng: 105.258921,
        created_at: '2026-05-13T11:00:00Z'
      }
    ],
    histories: [
      {
        id: 'hst-5',
        report_id: 'rpt-002',
        old_status: 'Menunggu Validasi',
        new_status: 'Menunggu Validasi',
        note: 'Laporan baru masuk ke antrean verifikasi UPTD Wilayah I.',
        changed_by_name: 'Ahmad Dahlan',
        changed_by_role: 'Masyarakat',
        created_at: '2026-05-13T11:00:00Z'
      }
    ],
    created_at: '2026-05-13T11:00:00Z',
    updated_at: '2026-05-13T11:00:00Z'
  },
  {
    id: 'rpt-003',
    report_code: '#RPT-2026-0885',
    reporter_id: 'usr-warga-1',
    reporter_name: 'Siti Aminah',
    reporter_nik_masked: '187101********88',
    reporter_reputation: 98,
    road_segment_id: 'rd-1',
    road_name: 'Jl. Z.A. Pagar Alam',
    district: 'Kota Bandar Lampung',
    subdistrict: 'Rajabasa',
    category_id: 'cat-1',
    category_name: 'Jalan Berlubang',
    title: 'Lubang Tikungan Depan Kampus Teknokrat',
    description: 'Aspal mengelupas sedalam 10 cm tepat sebelum flyover Teknokrat. Menyebabkan antrean kendaraan dan bahaya jatuh bagi pemotor.',
    severity: 'Berat',
    latitude: -5.381423,
    longitude: 105.257122,
    address: 'Jl. Z.A. Pagar Alam No. 9-11, Depan Gerbang Utama Universitas Teknokrat Indonesia, Kedaton',
    status: 'Selesai',
    ai_urgency_score: 8.9,
    sla_deadline: '2026-05-10T12:00:00Z',
    attachments: [
      {
        id: 'att-4',
        report_id: 'rpt-003',
        file_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
        file_type: 'before',
        uploaded_by: 'usr-warga-1',
        geotag_lat: -5.381423,
        geotag_lng: 105.257122,
        created_at: '2026-05-08T08:00:00Z'
      },
      {
        id: 'att-5',
        report_id: 'rpt-003',
        file_url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
        file_type: 'in_progress',
        uploaded_by: 'usr-petugas-1',
        geotag_lat: -5.381420,
        geotag_lng: 105.257120,
        created_at: '2026-05-09T10:00:00Z'
      },
      {
        id: 'att-6',
        report_id: 'rpt-003',
        file_url: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80',
        file_type: 'after',
        uploaded_by: 'usr-petugas-1',
        geotag_lat: -5.381421,
        geotag_lng: 105.257121,
        created_at: '2026-05-10T11:30:00Z'
      }
    ],
    histories: [
      {
        id: 'hst-6',
        report_id: 'rpt-003',
        old_status: 'Menunggu Validasi',
        new_status: 'Menunggu Validasi',
        note: 'Laporan diajukan oleh pelapor.',
        changed_by_name: 'Siti Aminah',
        changed_by_role: 'Masyarakat',
        created_at: '2026-05-08T08:00:00Z'
      },
      {
        id: 'hst-7',
        report_id: 'rpt-003',
        old_status: 'Menunggu Validasi',
        new_status: 'Diverifikasi',
        note: 'Survei cepat lokasi disetujui.',
        changed_by_name: 'Ir. Hendrawan, S.T., M.T.',
        changed_by_role: 'Petugas',
        created_at: '2026-05-08T14:00:00Z'
      },
      {
        id: 'hst-8',
        report_id: 'rpt-003',
        old_status: 'Diverifikasi',
        new_status: 'Diterima',
        note: 'Mandat SPK diterbitkan.',
        changed_by_name: 'Administrator Dinas BMBK',
        changed_by_role: 'Admin',
        created_at: '2026-05-09T08:30:00Z'
      },
      {
        id: 'hst-9',
        report_id: 'rpt-003',
        old_status: 'Diterima',
        new_status: 'Dalam Perbaikan',
        note: 'Penggelaran aspal panas AC-WC dan pemadatan roda gilas.',
        changed_by_name: 'Ir. Hendrawan, S.T., M.T.',
        changed_by_role: 'Petugas',
        created_at: '2026-05-09T10:00:00Z'
      },
      {
        id: 'hst-10',
        report_id: 'rpt-003',
        old_status: 'Dalam Perbaikan',
        new_status: 'Selesai',
        note: 'Uji kerataan selesai. Dokumen PHO disahkan. Jalan kembali mulus dan normal.',
        changed_by_name: 'Ir. Hendrawan, S.T., M.T.',
        changed_by_role: 'Petugas',
        created_at: '2026-05-10T11:30:00Z'
      }
    ],
    work_update: {
      id: 'spk-002',
      report_id: 'rpt-003',
      spk_number: '602/074/SPK-BM/DPUPR/2026',
      officer_id: 'usr-petugas-1',
      officer_name: 'Ir. Hendrawan, S.T., M.T.',
      contractor_name: 'Swakelola Pemeliharaan Rutin UPTD Wilayah I',
      length_m: 4.2,
      width_m: 1.8,
      depth_m: 0.10,
      volume_m3: 0.756,
      estimated_cost_idr: 6800000,
      work_note: 'Pekerjaan penambalan lubang aspal tuntas 100%. Telah dilakukan uji mutu kepadatan dan diserahterimakan (PHO).',
      progress_percent: 100,
      pho_issued: true,
      started_at: '2026-05-09T09:00:00Z',
      completed_at: '2026-05-10T11:30:00Z'
    },
    rating: 5,
    feedback: 'Penanganan sangat cepat dan hasilnya rapi sekali! Terima kasih Pemprov Lampung dan tim SmartRoad!',
    created_at: '2026-05-08T08:00:00Z',
    updated_at: '2026-05-10T11:30:00Z'
  },
  {
    id: 'rpt-004',
    report_code: '#RPT-2026-0870',
    reporter_id: 'usr-warga-1',
    reporter_name: 'Rudi Hartono',
    reporter_nik_masked: '187105********44',
    reporter_reputation: 82,
    road_segment_id: 'rd-5',
    road_name: 'Jl. Soekarno-Hatta (By Pass)',
    district: 'Kota Bandar Lampung',
    subdistrict: 'Sukarame',
    category_id: 'cat-6',
    category_name: 'Lainnya',
    title: 'Brosur Iklan Menutupi Rambu Jalan',
    description: 'Rambu penunjuk arah tertutup stiker dan pamflet liar.',
    severity: 'Ringan',
    latitude: -5.372100,
    longitude: 105.289100,
    address: 'Jl. Soekarno Hatta KM 11, Depan SPBU By Pass Sukarame',
    status: 'Ditolak',
    rejection_reason: 'Bukan merupakan wewenang pemeliharaan perkerasan jalan BMBK (wewenang Dinas Perhubungan dan Satpol PP kota). Laporan telah diteruskan via kanal SP4N LAPOR!',
    ai_urgency_score: 3.1,
    sla_deadline: '2026-05-06T15:00:00Z',
    attachments: [
      {
        id: 'att-7',
        report_id: 'rpt-004',
        file_url: 'https://images.unsplash.com/photo-1572945753563-80495678363d?auto=format&fit=crop&w=800&q=80',
        file_type: 'before',
        uploaded_by: 'usr-warga-1',
        geotag_lat: -5.372100,
        geotag_lng: 105.289100,
        created_at: '2026-05-04T10:00:00Z'
      }
    ],
    histories: [
      {
        id: 'hst-11',
        report_id: 'rpt-004',
        old_status: 'Menunggu Validasi',
        new_status: 'Ditolak',
        note: 'Ditolak dengan alasan: Bukan merupakan wewenang pemeliharaan perkerasan jalan BMBK.',
        changed_by_name: 'Ir. Hendrawan, S.T., M.T.',
        changed_by_role: 'Petugas',
        created_at: '2026-05-05T09:15:00Z'
      }
    ],
    created_at: '2026-05-04T10:00:00Z',
    updated_at: '2026-05-05T09:15:00Z'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-001',
    audit_code: 'AUD-2026-8812',
    actor_id: 'usr-petugas-1',
    actor_name: 'Ir. Hendrawan, S.T., M.T.',
    actor_role: 'Petugas',
    action: 'VERIFY_REPORT',
    entity_type: 'reports',
    entity_id: 'rpt-001',
    metadata: {
      report_code: '#RPT-2026-0891',
      old_status: 'Menunggu Validasi',
      new_status: 'Diverifikasi',
      verification_channel: 'UPTD_MOBILE_APP',
      gps_accuracy_m: 3.8
    },
    hash_sha256: '9f83a9e2f5b61e0b5c1a4e6d78291039401bfd7a123e456789abcdef01234567',
    created_at: '2026-05-13T10:00:00Z'
  },
  {
    id: 'aud-002',
    audit_code: 'AUD-2026-8813',
    actor_id: 'usr-admin-1',
    actor_name: 'Administrator Dinas BMBK',
    actor_role: 'Admin',
    action: 'ISSUE_SPK',
    entity_type: 'work_updates',
    entity_id: 'spk-001',
    metadata: {
      spk_number: '602/088/SPK-BM/DPUPR/2026',
      report_id: 'rpt-001',
      budget_idr: 14500000,
      target_days: 3
    },
    hash_sha256: '4a3b8c2d1e0f9876543210fedcba9876543210abcdef0123456789abcdef0123',
    created_at: '2026-05-13T14:30:00Z'
  },
  {
    id: 'aud-003',
    audit_code: 'AUD-2026-8814',
    actor_id: 'usr-warga-1',
    actor_name: 'Budi Santoso',
    actor_role: 'Masyarakat',
    action: 'CREATE_REPORT',
    entity_type: 'reports',
    entity_id: 'rpt-002',
    metadata: {
      report_code: '#RPT-2026-0892',
      category: 'Retak Buaya',
      severity: 'Sedang',
      coords: [-5.391218, 105.258921]
    },
    hash_sha256: 'e8c21a4f0b3d5e7912468ace013579bdf02468ace13579bdf02468ace13579bd',
    created_at: '2026-05-13T11:00:00Z'
  }
];

