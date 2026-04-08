/** Format total to par for display (E, +2, -4). */
export function formatToPar(n: number): string {
  if (n === 0) return 'E'
  if (n > 0) return `+${n}`
  return String(n)
}
