function parseDateParts(dateString: string) {
  const [datePart] = dateString.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  return { year, month, day };
}

/** Format YYYY-MM-DD dates consistently for SSR and client hydration. */
export function formatDisplayDate(dateString: string): string {
  const { year, month, day } = parseDateParts(dateString);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Check if a date is within the next 7 days (inclusive). */
export function isExpiringSoon(
  expiryDate?: string | null,
  referenceDate?: string
): boolean {
  if (!expiryDate) return false;

  const expiry = parseDateParts(expiryDate);
  const ref = referenceDate
    ? parseDateParts(referenceDate)
    : parseDateParts(new Date().toISOString().split("T")[0]);

  const expiryTime = Date.UTC(expiry.year, expiry.month - 1, expiry.day);
  const refTime = Date.UTC(ref.year, ref.month - 1, ref.day);
  const daysUntil = Math.round((expiryTime - refTime) / (1000 * 60 * 60 * 24));

  return daysUntil <= 7 && daysUntil >= 0;
}
