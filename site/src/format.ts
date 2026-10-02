// Small display formatters — no dependencies.

export const fmtDuration = (ms?: number): string => {
  if (ms === undefined || !Number.isFinite(ms)) return '—';
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m < 60) return r ? `${m}m ${r}s` : `${m}m`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
};

export const fmtBytes = (n?: number): string => {
  if (n === undefined || !Number.isFinite(n)) return '—';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
};

export const fmtCost = (usd?: number): string =>
  usd === undefined || !Number.isFinite(usd) ? '—' : `$${usd.toFixed(4)}`;

const fmtCount = (n?: number): string => {
  if (n === undefined || !Number.isFinite(n)) return '—';
  if (n < 1000) return String(n);
  if (n < 1e6) return n < 1e4 ? `${(n / 1e3).toFixed(1)}K` : `${Math.round(n / 1e3)}K`;
  if (n < 1e9) return `${(n / 1e6).toFixed(1)}M`;
  return `${(n / 1e9).toFixed(2)}B`;
};

export const fmtTokens = (inn?: number, out?: number): string => {
  if (inn === undefined && out === undefined) return '—';
  return `${fmtCount(inn)} in · ${fmtCount(out)} out`;
};

/** "2026-09-30T14:22:00Z" -> "2026-09-30 14:22" (keeps UTC, no tz surprises) */
export const fmtTime = (iso?: string): string => {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}Z`;
};

export const sha8 = (sha?: string): string => (sha ? sha.slice(0, 8) : '—');
