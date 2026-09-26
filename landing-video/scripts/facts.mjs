// Reads question counts and bank dates from the app's cert folders so the
// video never quotes numbers the app does not ship. Same rules as the
// landing's build-time tokens in vite.config.js.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const repo = resolve(import.meta.dirname, "../..");
const CERTS = ["gcp-pde", "gcp-pca"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const certs = CERTS.map((id) => {
  const manifest = readFileSync(resolve(repo, `src/certs/${id}/manifest.js`), "utf8");
  const bank = readFileSync(resolve(repo, `src/certs/${id}/questions.js`), "utf8");
  const domains = readFileSync(resolve(repo, `src/certs/${id}/domains.js`), "utf8");
  const updated = /questionsDumpedAt:\s*"(\d{4}-\d{2}-\d{2})"/.exec(manifest)?.[1];
  const count = bank.match(/^ {4}"id": /gm)?.length ?? 0;
  const domainCount = domains.match(/short:\s*"D\d/g)?.length ?? 0;
  if (!updated || !count || !domainCount) throw new Error(`facts: could not read ${id}`);
  return { id, count, domains: domainCount, updated };
});

const latest = certs
  .map((c) => c.updated)
  .sort()
  .at(-1);
const [y, m] = latest.split("-").map(Number);
const facts = {
  certs,
  totalQuestions: certs.reduce((sum, c) => sum + c.count, 0),
  totalDomains: certs.reduce((sum, c) => sum + c.domains, 0),
  latestUpdate: `${MONTHS[m - 1]} ${y}`,
};

writeFileSync(
  resolve(import.meta.dirname, "../src/facts.json"),
  `${JSON.stringify(facts, null, 2)}\n`,
);
console.log(facts);
