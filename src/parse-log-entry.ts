import { parse } from 'date-fns'
import { HttpRequest } from './http-request'

function hyphenToUndefined(value: string): string | undefined {
  return value === '-' ? undefined : value
}

export function parseLogEntry(logEntry: string): HttpRequest | null {
  const regex =
    /^(\S+) (\S+) (\S+) \[([^\]]+)\] "(\S+) (\S+) (\S+)" (\S+) (\S+) "([^"]+)" "([^"]+)"$/

  const match = regex.exec(logEntry)

  if (!match) return null

  const parsedMatch = match.map(hyphenToUndefined)

  const [
    ,
    ipAddress,
    identity,
    userId,
    date,
    method,
    resource,
    protocol,
    status,
    bytesSent,
    referrer,
    userAgent,
  ] = parsedMatch

  return {
    ipAddress,
    identity,
    userId,
    date: date ? parse(date, 'd/LLL/yyyy:HH:mm:ss xx', new Date()) : undefined,
    method,
    resource,
    protocol,
    status: status ? parseInt(status) : undefined,
    bytesSent: bytesSent ? parseInt(bytesSent) : undefined,
    referrer,
    userAgent,
  }
}
