export function getTop(count: number = 3, fieldCounts: Record<string, number>) {
  const fieldCountsList = Object.entries(fieldCounts)
  const length = fieldCountsList.length
  const topCount = count < length ? count : length

  return fieldCountsList
    .sort(([, a], [, b]) => b - a)
    .slice(0, topCount)
    .map(([value, count]) => ({ value, count }))
}
