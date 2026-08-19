import React from "react";
import { CERT_LIST } from "../certs/index.js";
import { formatDumpDate } from "../engine/format.js";

function selectCert(certId) {
  const params = new URLSearchParams(window.location.search);
  params.set("cert", certId);
  window.location.search = params.toString();
}

export default function CertPicker() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-xl)" }}>
      <div style={{ width: "100%", maxWidth: 720 }}>
        <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
          <h1 style={{ margin: "0 0 8px", fontSize: 40, lineHeight: 1.05, fontWeight: 900, letterSpacing: -1.2, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
            DataForge
          </h1>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: 1 }}>
            Elige certificación
          </div>
        </div>

        <div style={{ display: "grid", gap: "var(--space-md)" }}>
          {CERT_LIST.map((cert) => (
            <button
              key={cert.id}
              onClick={() => selectCert(cert.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-md)",
                textAlign: "left",
                padding: "18px 20px",
                borderRadius: "var(--radius-2xl)",
                border: "1px solid var(--surface-line)",
                background: "var(--gradient-panel)",
                boxShadow: "var(--shadow-card)",
                cursor: "pointer",
                color: "var(--text-primary)",
                width: "100%",
              }}
            >
              <img src={cert.logoPath} alt={cert.brand} style={{ height: 32, width: "auto", opacity: 0.92, flexShrink: 0 }} />
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontSize: 17, fontWeight: 800, fontFamily: "var(--font-heading)" }}>
                  {cert.tagline}
                </span>
                <span style={{ display: "block", marginTop: 4, fontSize: 12, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                  {cert.brand} · {cert.mock.count} preguntas · {Math.round(cert.mock.durationSec / 60)} min · {cert.passPercent}%
                </span>
                {formatDumpDate(cert.questionsDumpedAt) && (
                  <span style={{ display: "block", marginTop: 3, fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    Preguntas volcadas el {formatDumpDate(cert.questionsDumpedAt)}
                  </span>
                )}
              </span>
              <span style={{ padding: "5px 10px", borderRadius: "var(--radius-pill)", background: "var(--primary-soft)", color: "var(--primary-400)", fontSize: 11, fontWeight: 800, fontFamily: "var(--font-mono)", flexShrink: 0 }}>
                {cert.short}
              </span>
            </button>
          ))}
        </div>

        <div style={{ marginTop: "var(--space-xl)", fontSize: 11, color: "var(--text-muted)", textAlign: "center", lineHeight: 1.6 }}>
          El progreso se guarda por separado para cada certificación.
        </div>
      </div>
    </div>
  );
}
