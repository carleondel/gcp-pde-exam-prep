import gcpPde from "./gcp-pde/manifest.js";

const REQUIRED_FIELDS = [
  "id",
  "name",
  "short",
  "passPercent",
  "mock",
  "topicMap",
  "examDomains",
  "loadQuestions",
];

export function validateCertManifest(manifest) {
  const missing = REQUIRED_FIELDS.filter((f) => manifest[f] === undefined);
  if (missing.length > 0) {
    console.error(
      `Cert manifest "${manifest?.id ?? "<unknown>"}" is missing required fields:`,
      missing,
    );
    return false;
  }
  if (typeof manifest.loadQuestions !== "function") {
    console.error(
      `Cert manifest "${manifest.id}" has loadQuestions but it is not a function.`,
    );
    return false;
  }
  return true;
}

export const CERTS = Object.freeze({
  "gcp-pde": gcpPde,
});

export const DEFAULT_CERT_ID = "gcp-pde";

for (const cert of Object.values(CERTS)) {
  validateCertManifest(cert);
}

export function getActiveCert(certIdFromUrl) {
  if (certIdFromUrl && CERTS[certIdFromUrl]) {
    return CERTS[certIdFromUrl];
  }
  return CERTS[DEFAULT_CERT_ID];
}
