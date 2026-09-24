import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const page = (path) => resolve(import.meta.dirname, path);

const CERT_IDS = ["gcp-pde", "gcp-pca"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Question counts and "updated" dates for the static pages, read from each
 * cert's manifest and bank at build time so the landing can never drift
 * from what the app actually ships. Exposed as {{TOKENS}} in the HTML.
 */
function certFacts() {
  const facts = {};
  let total = 0;
  let latest = "";
  for (const id of CERT_IDS) {
    const manifest = readFileSync(page(`src/certs/${id}/manifest.js`), "utf8");
    const bank = readFileSync(page(`src/certs/${id}/questions.js`), "utf8");
    const iso = /questionsDumpedAt:\s*"(\d{4}-\d{2}-\d{2})"/.exec(manifest)?.[1];
    const count = bank.match(/^ {4}"id": /gm)?.length ?? 0;
    if (!iso || !count) throw new Error(`certFacts: could not read ${id}`);
    const [y, m, d] = iso.split("-").map(Number);
    const key = id.toUpperCase().replace("-", "_");
    facts[`${key}_COUNT`] = String(count);
    facts[`${key}_UPDATED`] = `${MONTHS[m - 1]} ${d}, ${y}`;
    total += count;
    if (iso > latest) latest = iso;
  }
  const [y, m] = latest.split("-").map(Number);
  facts.TOTAL_QUESTIONS = String(total);
  facts.LATEST_UPDATE_MONTH = `${MONTHS[m - 1]} ${y}`;
  return facts;
}

function injectCertFacts() {
  return {
    name: "inject-cert-facts",
    transformIndexHtml(html) {
      const facts = certFacts();
      return html.replace(/\{\{([A-Z_]+)\}\}/g, (token, name) => {
        if (!(name in facts)) throw new Error(`Unknown HTML token ${token}`);
        return facts[name];
      });
    },
  };
}

// Multi-page build: the static landing and legal pages at the root, the
// React app under /app/.
export default defineConfig({
  plugins: [react(), injectCertFacts()],
  build: {
    rollupOptions: {
      input: {
        landing: page("index.html"),
        app: page("app/index.html"),
        privacy: page("privacy/index.html"),
        terms: page("terms/index.html"),
      },
    },
  },
});
