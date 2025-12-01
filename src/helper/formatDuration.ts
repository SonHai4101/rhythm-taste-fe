export function formatDuration(seconds: number | null | undefined) {
  if (!seconds || seconds <= 0) return "00:00";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const padded = (n: number) => n.toString().padStart(2, "0");

  return hrs > 0
    ? `${padded(hrs)}:${padded(mins)}:${padded(secs)}`
    : `${padded(mins)}:${padded(secs)}`;
}