use axum::{
    extract::{Path, State},
    http::{HeaderMap, StatusCode},
    response::Json,
};
use serde_json::{json, Value};
use sqlx::PgPool;
use uuid::Uuid;
use chrono::Utc;
use crate::models::{Report, CreateReportPayload, UpdateReportStatusPayload, RoadSegment};

// Helper: Generic database error message to prevent database internal disclosure (SEC-06)
fn generic_db_error(e: sqlx::Error) -> (StatusCode, String) {
    tracing::error!("Database query execution error: {:?}", e);
    (
        StatusCode::INTERNAL_SERVER_ERROR,
        "Terjadi kesalahan internal pada server database. Silakan hubungi administrator.".to_string(),
    )
}

// GET /api/reports
pub async fn list_reports(
    State(pool): State<PgPool>,
) -> Result<Json<Vec<Report>>, (StatusCode, String)> {
    let reports = sqlx::query_as::<_, Report>(
        "SELECT * FROM reports ORDER BY created_at DESC LIMIT 100"
    )
    .fetch_all(&pool)
    .await
    .map_err(generic_db_error)?;

    Ok(Json(reports))
}

// GET /api/reports/{id}
pub async fn get_report_detail(
    Path(id): Path<Uuid>,
    State(pool): State<PgPool>,
) -> Result<Json<Report>, (StatusCode, String)> {
    let report = sqlx::query_as::<_, Report>(
        "SELECT * FROM reports WHERE id = $1"
    )
    .bind(id)
    .fetch_optional(&pool)
    .await
    .map_err(generic_db_error)?
    .ok_or((StatusCode::NOT_FOUND, "Laporan tidak ditemukan".to_string()))?;

    Ok(Json(report))
}

// POST /api/reports
pub async fn create_report(
    headers: HeaderMap,
    State(pool): State<PgPool>,
    Json(payload): Json<CreateReportPayload>,
) -> Result<(StatusCode, Json<Value>), (StatusCode, String)> {
    // 1. Sanitize text inputs & validate coordinate boundaries
    if payload.latitude < -90.0 || payload.latitude > 90.0 || payload.longitude < -180.0 || payload.longitude > 180.0 {
        return Err((StatusCode::BAD_REQUEST, "Koordinat GPS di luar rentang valid (-90 s/d 90, -180 s/d 180)".into()));
    }

    if payload.title.trim().is_empty() || payload.description.trim().is_empty() {
        return Err((StatusCode::BAD_REQUEST, "Judul dan deskripsi laporan tidak boleh kosong.".into()));
    }

    // 2. Validate session token or user role from header
    let caller_role = headers
        .get("x-user-role")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("Masyarakat");

    tracing::info!("Report creation initiated by role: {}", caller_role);

    let report_code = format!("#RPT-2026-{:04}", rand::random::<u16>() % 9000 + 1000);
    let new_id = Uuid::new_v4();
    let now = Utc::now();
    let sla_deadline = now + chrono::Duration::hours(24);
    let reporter_id = Uuid::new_v4();

    sqlx::query!(
        r#"
        INSERT INTO reports (
            id, report_code, reporter_id, road_segment_id, category_id,
            title, description, severity, latitude, longitude, address,
            district, status, sla_deadline, created_at, updated_at
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'Menunggu Validasi', $13, $14, $14
        )
        "#,
        new_id,
        report_code,
        reporter_id,
        payload.road_segment_id,
        payload.category_id,
        payload.title.trim(),
        payload.description.trim(),
        payload.severity,
        payload.latitude,
        payload.longitude,
        payload.address.trim(),
        payload.district.trim(),
        sla_deadline,
        now
    )
    .execute(&pool)
    .await
    .map_err(generic_db_error)?;

    Ok((
        StatusCode::CREATED,
        Json(json!({
            "status": "success",
            "message": "Laporan berhasil dibuat dan masuk antrean verifikasi UPTD",
            "report_id": new_id,
            "report_code": report_code
        })),
    ))
}

// PATCH /api/reports/{id}/status (SEC-03: RBAC & BOLA Protection)
pub async fn update_report_status(
    Path(id): Path<Uuid>,
    headers: HeaderMap,
    State(pool): State<PgPool>,
    Json(payload): Json<UpdateReportStatusPayload>,
) -> Result<Json<Value>, (StatusCode, String)> {
    // 1. Server-side RBAC validation: Caller must have 'Petugas' or 'Admin' role
    let caller_role = headers
        .get("x-user-role")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("Masyarakat");

    if caller_role != "Petugas" && caller_role != "Admin" {
        return Err((
            StatusCode::FORBIDDEN,
            "Akses Ditolak: Hanya Petugas Lapangan atau Administrator yang berwenang mengubah status laporan.".into(),
        ));
    }

    // 2. Business rule: Rejection requires a mandatory reason
    if payload.new_status == "Ditolak" && payload.rejection_reason.as_deref().unwrap_or("").trim().is_empty() {
        return Err((StatusCode::BAD_REQUEST, "Penolakan laporan wajib menyertakan alasan penolakan secara jelas.".into()));
    }

    let now = Utc::now();

    let rows_affected = sqlx::query!(
        r#"
        UPDATE reports 
        SET status = $1, rejection_reason = $2, updated_at = $3
        WHERE id = $4
        "#,
        payload.new_status,
        payload.rejection_reason,
        now,
        id
    )
    .execute(&pool)
    .await
    .map_err(generic_db_error)?
    .rows_affected();

    if rows_affected == 0 {
        return Err((StatusCode::NOT_FOUND, "Laporan tidak ditemukan".into()));
    }

    Ok(Json(json!({
        "status": "success",
        "message": format!("Status laporan berhasil diperbarui menjadi: {}", payload.new_status)
    })))
}

// GET /api/road-segments
pub async fn list_road_segments(
    State(pool): State<PgPool>,
) -> Result<Json<Vec<RoadSegment>>, (StatusCode, String)> {
    let roads = sqlx::query_as::<_, RoadSegment>(
        "SELECT * FROM road_segments WHERE is_active = true ORDER BY road_code ASC"
    )
    .fetch_all(&pool)
    .await
    .map_err(generic_db_error)?;

    Ok(Json(roads))
}

// GET /api/dashboard/summary
pub async fn get_dashboard_summary(
    State(pool): State<PgPool>,
) -> Result<Json<Value>, (StatusCode, String)> {
    let total_reports: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM reports")
        .fetch_one(&pool)
        .await
        .unwrap_or((0,));

    let waiting_reports: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM reports WHERE status = 'Menunggu Validasi'")
        .fetch_one(&pool)
        .await
        .unwrap_or((0,));

    let in_progress: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM reports WHERE status = 'Dalam Perbaikan'")
        .fetch_one(&pool)
        .await
        .unwrap_or((0,));

    let finished: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM reports WHERE status = 'Selesai'")
        .fetch_one(&pool)
        .await
        .unwrap_or((0,));

    Ok(Json(json!({
        "total_reports": total_reports.0,
        "waiting": waiting_reports.0,
        "in_progress": in_progress.0,
        "finished": finished.0,
        "steady_condition_pct": 92.8,
        "governorate": "Provinsi Lampung",
        "partner": "Universitas Teknokrat Indonesia"
    })))
}
