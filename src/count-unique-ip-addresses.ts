import { uniq } from 'ramda'
import { HttpRequest } from './http-request'

export function countUniqueIpAddresses(logEntries: HttpRequest[]): number {
  const ipAddresses = logEntries
    .map((logEntry) => logEntry.ipAddress)
    .filter(Boolean)

  return uniq(ipAddresses).length
}
