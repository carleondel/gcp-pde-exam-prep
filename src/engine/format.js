/**
 * "YYYY-MM-DD" for the user's local calendar day. Not toISOString(), which
 * is UTC: in Spain that still says "yesterday" until 01:00 or 02:00, and
 * streaks and the daily challenge would roll over at the wrong time.
 */
export function toLocalDateString(date = new Date()) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Formats the manifest's questionsDumpedAt ("YYYY-MM-DD") as "Aug 17, 2026"
 * (en-US).
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
  const monthName = MONTHS[Number(month) - 1];
  if (!monthName) return null;

  return `${monthName} ${Number(day)}, ${year}`;
}
