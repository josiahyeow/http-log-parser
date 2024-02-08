import { parseLogEntry } from './parse-log-entry'

describe('parseLogEntry', () => {
  it('should parse a valid log entry', () => {
    const logEntry =
      '123.45.67.89 - - [01/Jan/2022:12:34:56 +0000] "GET /api/users HTTP/1.1" 200 1024 "https://example.com" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36"'

    expect(parseLogEntry(logEntry)).toEqual({
      ipAddress: '123.45.67.89',
      identity: undefined,
      userId: undefined,
      date: new Date('2022-01-01T12:34:56Z'),
      method: 'GET',
      resource: '/api/users',
      protocol: 'HTTP/1.1',
      status: 200,
      bytesSent: 1024,
      referrer: 'https://example.com',
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
    })
  })

  it('should return null for an invalid log entry', () => {
    const logEntry = 'invalid log entry'
    expect(parseLogEntry(logEntry)).toBeNull()
  })

  it('should return fields with unavailable information as undefined', () => {
    const logEntry = '- - - [-] "- - -" - - "-" "-"'

    expect(parseLogEntry(logEntry)).toEqual({
      ipAddress: undefined,
      identity: undefined,
      userId: undefined,
      date: undefined,
      method: undefined,
      resource: undefined,
      protocol: undefined,
      status: undefined,
      bytesSent: undefined,
      referrer: undefined,
      userAgent: undefined,
    })
  })
})
