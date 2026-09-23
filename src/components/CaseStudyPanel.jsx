/**
 * Collapsible panel with the official case study brief for a question.
 *
 * Takes the cert's case studies as a prop rather than reading the active
 * manifest, so it stays a plain presentational component.
 */
export default function CaseStudyPanel({ caseStudyId, caseStudies }) {
  const caseStudy = caseStudies?.[caseStudyId];
  if (!caseStudy) return null;

  return (
    <details
      style={{
        marginBottom: 18,
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--surface-line)",
        background: "var(--surface-panel-muted)",
        overflow: "hidden",
      }}
    >
      <summary
        style={{
          padding: "12px 16px",
          cursor: "pointer",
          fontSize: 12,
          fontWeight: 800,
          color: "var(--accent-300)",
          fontFamily: "var(--font-mono)",
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        Case study · {caseStudy.name}
      </summary>
      <div
        style={{
          padding: "0 16px 14px",
          fontSize: 13,
          lineHeight: 1.7,
          color: "var(--text-secondary)",
          whiteSpace: "pre-line",
          fontWeight: 400,
        }}
      >
        {caseStudy.legacy && (
          <div
            style={{
              marginBottom: 12,
              padding: "10px 12px",
              borderRadius: "var(--radius-md)",
              background: "var(--warning-soft)",
              border: "1px solid var(--signal-warning)",
              fontSize: 12,
              lineHeight: 1.6,
              whiteSpace: "normal",
            }}
          >
            <strong style={{ color: "var(--signal-warning)" }}>Retired case.</strong> It is no
            longer part of the current official guide. The current cases are Altostrat Media, Cymbal
            Retail, EHR Healthcare and KnightMotives Automotive.
          </div>
        )}
        {caseStudy.context ?? "Context unavailable: this case is no longer in the official guide."}
        <div
          style={{
            marginTop: 12,
            fontSize: 11,
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            whiteSpace: "normal",
          }}
        >
          {caseStudy.verbatim
            ? "Official verbatim text (exam guide v6.1)"
            : caseStudy.legacy
              ? "Old blueprint"
              : "Summary of the official brief"}
          {caseStudy.officialUrl && (
            <>
              {" · "}
              <a
                href={caseStudy.officialUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--primary-400)" }}
              >
                Official PDF
              </a>
            </>
          )}
        </div>
      </div>
    </details>
  );
}
