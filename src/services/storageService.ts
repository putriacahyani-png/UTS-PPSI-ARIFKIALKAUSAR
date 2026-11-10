
import {
  Report,
  ReportStatus,
  RoadSegment,
  User,
  AuditLog,
  WorkUpdateSPK,
  StatusHistory
} from '../types';

import {
  INITIAL_REPORTS,
  ROAD_SEGMENTS,
  INITIAL_USERS,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';

// Storage keys
const STORAGE_KEYS = {
  reports: 'smartroad_reports',
  roadSegments: 'smartroad_road_segments',
  users: 'smartroad_users',
  auditLogs: 'smartroad_audit_logs'
};

// Generic storage helper
function getStorageData<T>(key: string, initialData: T[]): T[] {
  try {
    const storedData = localStorage.getItem(key);

    if (storedData) {
      return JSON.parse(storedData) as T[];
    }

    localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return initialData;
  }
}

function saveStorageData<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// Reports
export const getReports = (): Report[] =>
  getStorageData(STORAGE_KEYS.reports, INITIAL_REPORTS);

export const saveReports = (reports: Report[]): void =>
  saveStorageData(STORAGE_KEYS.reports, reports);

export const updateReportStatus = (
  reportId: string,
  status: ReportStatus
): void => {
  const reports = getReports();

  const updatedReports = reports.map(report => ({
    ...report,
    status: report.id === reportId ? status : report.status,
    updated_at: report.id === reportId
      ? new Date().toISOString()
      : report.updated_at
  }));

  saveReports(updatedReports);
};

// Road Segments
export const getRoadSegments = (): RoadSegment[] =>
  getStorageData(STORAGE_KEYS.roadSegments, ROAD_SEGMENTS);

export const saveRoadSegments = (data: RoadSegment[]): void =>
  saveStorageData(STORAGE_KEYS.roadSegments, data);

// Users
export const getUsers = (): User[] =>
  getStorageData(STORAGE_KEYS.users, INITIAL_USERS);

export const saveUsers = (users: User[]): void =>
  saveStorageData(STORAGE_KEYS.users, users);

// Audit Logs
export const getAuditLogs = (): AuditLog[] =>
  getStorageData(STORAGE_KEYS.auditLogs, INITIAL_AUDIT_LOGS);

export const saveAuditLogs = (logs: AuditLog[]): void =>
  saveStorageData(STORAGE_KEYS.auditLogs, logs);

// Work Update
export const updateWorkSPK = (
  reportId: string,
  workUpdate: WorkUpdateSPK
): void => {
  const reports = getReports();

  const updatedReports = reports.map(report =>
    report.id === reportId
      ? { ...report, work_update: workUpdate }
      : report
  );

  saveReports(updatedReports);
};

// Status History
export const addStatusHistory = (
  reportId: string,
  history: StatusHistory
): void => {
  const reports = getReports();

  const updatedReports = reports.map(report =>
    report.id === reportId
      ? {
        ...report,
        histories: [...report.histories, history]
      }
      : report
  );

  saveReports(updatedReports);
};
