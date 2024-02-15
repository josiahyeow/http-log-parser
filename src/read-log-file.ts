import { isBefore } from 'date-fns'
import { HttpRequest } from './http-request'
import { parseLogEntry } from './parse-log-entry'

export async function readLogFile(fileUrl: string): Promise<HttpRequest[]> {
  const httpRequests: HttpRequest[] = []

  const logFile = await fetch(fileUrl as string)
  const logFileText = await logFile.text()

  logFileText.split('\n').forEach((line: string) => {
    const escapedLine = line.replace(/(\r\n|\n|\r)/gm, '')
    const httpRequest = parseLogEntry(escapedLine)
    if (httpRequest) {
      httpRequests.push(httpRequest)
    }
  })

  // Sort logs by date in descending order
  return httpRequests.sort((a, b) => (isBefore(a.date, b.date) ? 1 : -1))
}
