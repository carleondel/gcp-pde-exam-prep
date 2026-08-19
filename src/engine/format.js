const MONTHS_ES = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

/**
 * Formats the manifest's questionsDumpedAt ("YYYY-MM-DD") as "17 ago 2026".
 *
 * Parsed by hand rather than with `new Date(iso)`, which reads a bare
 * date string as UTC midnight and then renders it in local time — west
 * of Greenwich that shows the previous day.
 *
 * Returns null when the cert has no dump date, so callers can omit the
 * label entirely instead of printing a placeholder.
 */
export function formatDumpDate(iso) {
  if (typeof iso !== "string") return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return null;

  const [, year, month, day] = match;
  const monthName = MONTHS_ES[Number(month) - 1];
  if (!monthName) return null;

  return `${Number(day)} ${monthName} ${year}`;
}
