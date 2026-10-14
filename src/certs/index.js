import gcpPde from "./gcp-pde/manifest.js";
import gcpPca from "./gcp-pca/manifest.js";
import gcpGail from "./gcp-gail/manifest.js";
import gcpPmle from "./gcp-pmle/manifest.js";
import gcpCdl from "./gcp-cdl/manifest.js";
import gcpAgwa from "./gcp-agwa/manifest.js";
import gcpAce from "./gcp-ace/manifest.js";
import gcpPcse from "./gcp-pcse/manifest.js";
import gcpPcdoe from "./gcp-pcdoe/manifest.js";

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
    console.error(`Cert manifest "${manifest.id}" has loadQuestions but it is not a function.`);
    return false;
  }
  return true;
}

export const CERTS = Object.freeze({
  "gcp-pde": gcpPde,
  "gcp-pca": gcpPca,
  "gcp-gail": gcpGail,
  "gcp-pmle": gcpPmle,
  "gcp-cdl": gcpCdl,
  "gcp-agwa": gcpAgwa,
  "gcp-ace": gcpAce,
  "gcp-pcse": gcpPcse,
  "gcp-pcdoe": gcpPcdoe,
});

export const DEFAULT_CERT_ID = "gcp-pde";

for (const cert of Object.values(CERTS)) {
  validateCertManifest(cert);
}

export const CERT_LIST = Object.values(CERTS);

export function isKnownCertId(certId) {
  return Boolean(certId && CERTS[certId]);
}

export function getActiveCert(certIdFromUrl) {
  if (certIdFromUrl && CERTS[certIdFromUrl]) {
    return CERTS[certIdFromUrl];
  }
  return CERTS[DEFAULT_CERT_ID];
}
