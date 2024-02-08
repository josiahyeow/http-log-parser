import { readFileSync } from 'fs'
import { HttpRequest } from './http-request'
import { parseLogEntry } from './parse-log-entry'

export function readLogFile(filePath: string): HttpRequest[] {
  const httpRequests: HttpRequest[] = []

  readFileSync(filePath, 'utf-8')
    .split('\n')
    .forEach((line: string) => {
      const httpRequest = parseLogEntry(line)
      if (httpRequest) {
        httpRequests.push(httpRequest)
      }
    })

  return httpRequests
}
