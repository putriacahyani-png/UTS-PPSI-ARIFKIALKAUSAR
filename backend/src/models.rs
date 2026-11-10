use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct User {
    pub id: Uuid,
    pub name: String,
    pub email: String,
    #[serde(skip_serializing)]
    pub password_hash: String,
    pub role: String,
    pub nik: Option<String>,
    pub phone: Option<String>,
    pub uptd_region: Option<String>,
    pub reputation_score: Option<i32>,
    pub is_active: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct RoadSegment {
    pub id: Uuid,
    pub road_code: String,
    pub road_name: String,
    pub district: String,
    pub subdistrict: Option<String>,
    pub length_km: f64,
    pub condition_status: String,
    pub sta_start: Option<String>,
    pub sta_end: Option<String>,
    pub is_active: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Report {
    pub id: Uuid,
    pub report_code: String,
    pub reporter_id: Uuid,
    pub road_segment_id: Option<Uuid>,
    pub category_id: Uuid,
    pub title: String,
    pub description: String,
    pub severity: String,
    pub latitude: f64,
    pub longitude: f64,
    pub address: String,
    pub district: String,
    pub status: String,
    pub rejection_reason: Option<String>,
    pub ai_urgency_score: Option<f64>,
    pub sla_deadline: DateTime<Utc>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateReportPayload {
    pub road_segment_id: Option<Uuid>,
    pub category_id: Uuid,
    pub title: String,
    pub description: String,
    pub severity: String,
    pub latitude: f64,
    pub longitude: f64,
    pub address: String,
    pub district: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UpdateReportStatusPayload {
    pub new_status: String,
    pub note: String,
    pub rejection_reason: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct AuditLog {
    pub id: Uuid,
    pub audit_code: String,
    pub actor_id: Uuid,
    pub action: String,
    pub entity_type: String,
    pub entity_id: Uuid,
    pub metadata: serde_json::Value,
    pub hash_sha256: String,
    pub created_at: DateTime<Utc>,
}

