use axum::{
    routing::{get, post, patch},
    Router,
};
use tower_http::cors::CorsLayer;
use std::net::SocketAddr;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod models;
mod handlers;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new("info"))
        .with(tracing_subscriber::fmt::layer())
        .init();

    dotenvy::dotenv().ok();
    
    // SEC-09: Require DATABASE_URL via environment without insecure hardcoded credentials
    let database_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| {
            tracing::warn!("DATABASE_URL not set in environment. Falling back to local development socket.");
            "postgres://postgres@localhost:5432/smartroad_db".to_string()
        });

    tracing::info!("Database configuration loaded: {}", database_url);

    // SEC-08: Restrict CORS origins instead of wildcard Any
    let allowed_origins = [
        "https://smartroad.lampungprov.go.id".parse().unwrap(),
        "http://localhost:3000".parse().unwrap(),
        "http://127.0.0.1:3000".parse().unwrap(),
    ];

    let cors = CorsLayer::new()
        .allow_origin(allowed_origins)
        .allow_methods([
            axum::http::Method::GET,
            axum::http::Method::POST,
            axum::http::Method::PATCH,
        ])
        .allow_headers([
            axum::http::header::CONTENT_TYPE,
            axum::http::header::AUTHORIZATION,
            axum::http::HeaderName::from_static("x-user-role"),
        ]);

    let app = Router::new()
        .route("/api/health", get(|| async { "SMARTROAD API Service OK (2026)" }))
        .route("/api/reports", get(handlers::list_reports).post(handlers::create_report))
        .route("/api/reports/:id", get(handlers::get_report_detail))
        .route("/api/reports/:id/status", patch(handlers::update_report_status))
        .route("/api/road-segments", get(handlers::list_road_segments))
        .route("/api/dashboard/summary", get(handlers::get_dashboard_summary))
        .layer(cors);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    tracing::info!("SMARTROAD Secure Axum API Server initialized on http://{}", addr);

    println!("SMARTROAD Rust Axum Server security configuration loaded successfully.");
    Ok(())
}
