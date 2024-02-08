export function getTop3(fieldCounts: Record<string, number>) {
  const top3 = Object.entries(fieldCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([value, count]) => ({ value, count }))

  return top3
}
