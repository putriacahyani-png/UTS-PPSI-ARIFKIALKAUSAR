import { 
  Report, 
  ReportStatus, 
  RoadSegment, 
  User, 
  AuditLog, 
  Role, 
  WorkUpdateSPK,
  StatusHistory 
} from '../types';
import { 
  INITIAL_REPORTS, 
  ROAD_SEGMENTS, 
  INITIAL_USERS, 
  INITIAL_AUDIT_LOGS 
} from '../data/mockData';

const STORAGE_KEYS = {
  REPORTS: 'smartroad_reports_v1',
  ROADS: 'smartroad_roads_v1',
  USERS: 'smartroad_users_v1',
  AUDIT: 'smartroad_audit_v1',
  CURRENT_USER: 'smartroad_current_user_v1'
};

class StorageService {
  private get<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage set error:', e);
    }
  }

  // --- Reports ---
  getReports(): Report[] {
    return this.get<Report[]>(STORAGE_KEYS.REPORTS, INITIAL_REPORTS);
  }

  getReportById(id: string): Report | undefined {
    return this.getReports().find(r => r.id === id);
  }

  createReport(reportData: Partial<Report>, currentUser: User): Report {
    const reports = this.getReports();
    const newCode = `#RPT-2026-${String(reports.length + 893).padStart(4, '0')}`;
    const newId = `rpt-${Date.now()}`;
    const now = new Date().toISOString();

    const newReport: Report = {
      id: newId,
      report_code: newCode,
      reporter_id: currentUser.id,
      reporter_name: currentUser.name,
      reporter_nik_masked: currentUser.nik 
        ? `${currentUser.nik.slice(0, 6)}********${currentUser.nik.slice(-2)}` 
        : '187102********91',
      reporter_reputation: currentUser.reputation_score || 90,
      road_segment_id: reportData.road_segment_id,
      road_name: reportData.road_name || 'Ruas Jalan Provinsi',
      district: reportData.district || 'Kota Bandar Lampung',
      subdistrict: reportData.subdistrict || 'Rajabasa',
      category_id: reportData.category_id || 'cat-1',
      category_name: reportData.category_name || 'Jalan Berlubang',
      title: reportData.title || 'Laporan Kerusakan Jalan',
      description: reportData.description || '',
      severity: reportData.severity || 'Sedang',
      latitude: reportData.latitude || -5.397140,
      longitude: reportData.longitude || 105.266792,
      address: reportData.address || '',
      status: 'Menunggu Validasi',
      ai_urgency_score: reportData.severity === 'Berat' ? 8.8 : reportData.severity === 'Sedang' ? 6.5 : 4.0,
      sla_deadline: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      attachments: reportData.attachments || [],
      histories: [
        {
          id: `hst-${Date.now()}`,
          report_id: newId,
          old_status: 'Menunggu Validasi',
          new_status: 'Menunggu Validasi',
          note: 'Laporan baru dibuat dan masuk ke antrean verifikasi.',
          changed_by_name: currentUser.name,
          changed_by_role: currentUser.role,
          created_at: now
        }
      ],
      created_at: now,
      updated_at: now
    };

    const updated = [newReport, ...reports];
    this.set(STORAGE_KEYS.REPORTS, updated);

    // Audit log
    this.addAuditLog({
      actor: currentUser,
      action: 'CREATE_REPORT',
      entity_type: 'reports',
      entity_id: newId,
      metadata: {
        report_code: newCode,
        title: newReport.title,
        severity: newReport.severity,
        district: newReport.district
      }
    });

    return newReport;
  }

  updateReportStatus(
    reportId: string, 
    newStatus: ReportStatus, 
    note: string, 
    currentUser: User,
    rejectionReason?: string
  ): Report {
    const reports = this.getReports();
    const index = reports.findIndex(r => r.id === reportId);
    if (index === -1) throw new Error('Report not found');

    const report = reports[index];
    const oldStatus = report.status;
    const now = new Date().toISOString();

    const historyEntry: StatusHistory = {
      id: `hst-${Date.now()}`,
      report_id: reportId,
      old_status: oldStatus,
      new_status: newStatus,
      note: note || `Status diperbarui menjadi ${newStatus}`,
      changed_by_name: currentUser.name,
      changed_by_role: currentUser.role,
      created_at: now
    };

    report.status = newStatus;
    report.updated_at = now;
    report.histories.push(historyEntry);

    if (newStatus === 'Ditolak' && rejectionReason) {
      report.rejection_reason = rejectionReason;
    }

    reports[index] = report;
    this.set(STORAGE_KEYS.REPORTS, reports);

    // Audit log
    this.addAuditLog({
      actor: currentUser,
      action: 'UPDATE_REPORT_STATUS',
      entity_type: 'reports',
      entity_id: reportId,
      metadata: {
        report_code: report.report_code,
        old_status: oldStatus,
        new_status: newStatus,
        note,
        rejection_reason: rejectionReason
      }
    });

    return report;
  }

  saveSPK(
    reportId: string, 
    spkData: Partial<WorkUpdateSPK>, 
    currentUser: User
  ): Report {
    const reports = this.getReports();
    const index = reports.findIndex(r => r.id === reportId);
    if (index === -1) throw new Error('Report not found');

    const report = reports[index];
    const now = new Date().toISOString();

    const spk: WorkUpdateSPK = {
      id: report.work_update?.id || `spk-${Date.now()}`,
      report_id: reportId,
      spk_number: spkData.spk_number || `602/089/SPK-BM/DPUPR/2026`,
      officer_id: currentUser.id,
      officer_name: currentUser.name,
      contractor_name: spkData.contractor_name || 'Tim Tanggap Cepat UPTD I',
      length_m: spkData.length_m || 5.0,
      width_m: spkData.width_m || 2.0,
      depth_m: spkData.depth_m || 0.12,
      volume_m3: (spkData.length_m || 5) * (spkData.width_m || 2) * (spkData.depth_m || 0.12),
      estimated_cost_idr: spkData.estimated_cost_idr || 12000000,
      work_note: spkData.work_note || 'Pekerjaan perbaikan berlangsung sesuai jadwal.',
      progress_percent: spkData.progress_percent ?? 50,
      pho_issued: spkData.pho_issued ?? false,
      started_at: spkData.started_at || now,
      completed_at: spkData.completed_at
    };

    report.work_update = spk;
    report.updated_at = now;

    if (spk.progress_percent === 100 && spk.pho_issued) {
      report.status = 'Selesai';
      report.histories.push({
        id: `hst-${Date.now()}`,
        report_id: reportId,
        old_status: 'Dalam Perbaikan',
        new_status: 'Selesai',
        note: 'Pekerjaan dinyatakan tuntas 100% dan dokumen PHO disahkan.',
        changed_by_name: currentUser.name,
        changed_by_role: currentUser.role,
        created_at: now
      });
    }

    reports[index] = report;
    this.set(STORAGE_KEYS.REPORTS, reports);

    this.addAuditLog({
      actor: currentUser,
      action: spk.pho_issued ? 'COMPLETE_SPK_PHO' : 'UPDATE_SPK_PROGRESS',
      entity_type: 'work_updates',
      entity_id: spk.id,
      metadata: {
        spk_number: spk.spk_number,
        progress: spk.progress_percent,
        pho_issued: spk.pho_issued
      }
    });

    return report;
  }

  // --- Road Segments ---
  getRoadSegments(): RoadSegment[] {
    return this.get<RoadSegment[]>(STORAGE_KEYS.ROADS, ROAD_SEGMENTS);
  }

  addRoadSegment(segment: Partial<RoadSegment>, currentUser: User): RoadSegment {
    const roads = this.getRoadSegments();
    const newRoad: RoadSegment = {
      id: `rd-${Date.now()}`,
      road_code: segment.road_code || `KDJ-LPG-00${roads.length + 1}`,
      road_name: segment.road_name || 'Ruas Jalan Baru',
      district: segment.district || 'Kota Bandar Lampung',
      subdistrict: segment.subdistrict || 'Kedaton',
      length_km: segment.length_km || 5.0,
      condition_status: segment.condition_status || 'Mantap',
      sta_start: segment.sta_start || 'STA 0+000',
      sta_end: segment.sta_end || 'STA 5+000',
      is_active: true
    };
    const updated = [...roads, newRoad];
    this.set(STORAGE_KEYS.ROADS, updated);

    this.addAuditLog({
      actor: currentUser,
      action: 'ADD_ROAD_SEGMENT',
      entity_type: 'road_segments',
      entity_id: newRoad.id,
      metadata: { road_code: newRoad.road_code, name: newRoad.road_name }
    });

    return newRoad;
  }

  // --- Users ---
  getUsers(): User[] {
    return this.get<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  }

  getCurrentUser(): User {
    return this.get<User>(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[0]);
  }

  setCurrentUser(user: User): void {
    this.set(STORAGE_KEYS.CURRENT_USER, user);
  }

  // --- Audit Logs ---
  getAuditLogs(): AuditLog[] {
    return this.get<AuditLog[]>(STORAGE_KEYS.AUDIT, INITIAL_AUDIT_LOGS);
  }

  addAuditLog(entry: {
    actor: User;
    action: string;
    entity_type: string;
    entity_id: string;
    metadata: Record<string, any>;
  }): AuditLog {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      audit_code: `AUD-2026-${String(logs.length + 8815).padStart(4, '0')}`,
      actor_id: entry.actor.id,
      actor_name: entry.actor.name,
      actor_role: entry.actor.role,
      action: entry.action,
      entity_type: entry.entity_type,
      entity_id: entry.entity_id,
      metadata: entry.metadata,
      hash_sha256: Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join(''),
      created_at: new Date().toISOString()
    };
    const updated = [newLog, ...logs];
    this.set(STORAGE_KEYS.AUDIT, updated);
    return newLog;
  }

  resetDemoData(): void {
    localStorage.removeItem(STORAGE_KEYS.REPORTS);
    localStorage.removeItem(STORAGE_KEYS.ROADS);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.AUDIT);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

export const storageService = new StorageService();

