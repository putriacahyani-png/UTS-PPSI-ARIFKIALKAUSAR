// SMARTROAD TypeScript Type Definitions
// Based on PRD.md & Desain.md Specifications

export type Role = 'Masyarakat' | 'Petugas' | 'Admin';

export type ReportStatus = 
  | 'Menunggu Validasi'
  | 'Diverifikasi'
  | 'Diterima'
  | 'Dalam Perbaikan'
  | 'Selesai'
  | 'Ditolak';

export type SeverityLevel = 'Ringan' | 'Sedang' | 'Berat';

export type RoadCondition = 'Mantap' | 'Rusak Ringan' | 'Rusak Berat';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  nik?: string;
  phone?: string;
  uptd_region?: string; // UPTD I - V
  reputation_score?: number; // 0 - 100
  is_active: boolean;
  avatar?: string;
  created_at: string;
}

export interface RoadSegment {
  id: string;
  road_code: string; // e.g. KDJ-LPG-001
  road_name: string;
  district: string; // Kabupaten/Kota
  subdistrict: string; // Kecamatan
  length_km: number;
  condition_status: RoadCondition;
  sta_start: string;
  sta_end: string;
  is_active: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface ReportAttachment {
  id: string;
  report_id: string;
  file_url: string;
  file_type: 'before' | 'in_progress' | 'after';
  file_size?: number;
  mime_type?: string;
  uploaded_by: string;
  geotag_lat?: number;
  geotag_lng?: number;
  created_at: string;
}

export interface StatusHistory {
  id: string;
  report_id: string;
  old_status: ReportStatus;
  new_status: ReportStatus;
  note: string;
  changed_by_name: string;
  changed_by_role: Role;
  created_at: string;
}

export interface WorkUpdateSPK {
  id: string;
  report_id: string;
  spk_number: string; // e.g. 602/088/SPK-BM/DPUPR/2026
  officer_id: string;
  officer_name: string;
  contractor_name: string;
  length_m: number;
  width_m: number;
  depth_m: number;
  volume_m3: number;
  estimated_cost_idr: number;
  work_note: string;
  progress_percent: number; // 0 - 100
  pho_issued: boolean;
  started_at: string;
  completed_at?: string;
}

export interface Report {
  id: string;
  report_code: string; // e.g. #RPT-2026-0891
  reporter_id: string;
  reporter_name: string;
  reporter_nik_masked?: string;
  reporter_reputation?: number;
  road_segment_id?: string;
  road_name: string;
  district: string;
  subdistrict: string;
  category_id: string;
  category_name: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  latitude: number;
  longitude: number;
  address: string;
  status: ReportStatus;
  rejection_reason?: string;
  ai_urgency_score: number; // 1.0 - 10.0
  sla_deadline: string; // ISO date
  attachments: ReportAttachment[];
  histories: StatusHistory[];
  work_update?: WorkUpdateSPK;
  rating?: number;
  feedback?: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  audit_code: string; // e.g. AUD-2026-8812
  actor_id: string;
  actor_name: string;
  actor_role: Role;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata: Record<string, any>;
  hash_sha256: string;
  created_at: string;
}

export interface SystemConfig {
  appName: string;
  organization: string;
  partner: string;
  tagline: string;
  footerText: string;
  slaHoursNormal: number;
  slaHoursCritical: number;
  version: string;
}

