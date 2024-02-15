import { stripIndents } from 'common-tags'
import { mock } from 'node:test'
import { parseLogEntry } from './parse-log-entry'
import { readLogFile } from './read-log-file'

jest.mock('fs')
jest.mock('./parse-log-entry')

describe('read log file', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should parse log file correctly and return log entries in descending order', async () => {
    const filePath = 'https:/test.com/path/to/log/file.log'
    const logContent = stripIndents`log entry 1
                                    log entry 2
                                    log entry 3`

    mock.method(global, 'fetch', () => {
      return { text: async () => logContent }
    })

    jest
      .mocked(parseLogEntry)
      .mockReturnValueOnce({
        ipAddress: '1.1.1.1',
        date: new Date('2021-01-02'),
      })
      .mockReturnValueOnce({
        ipAddress: '2.2.2.2',
        date: new Date('2021-01-13'),
      })
      .mockReturnValueOnce({
        ipAddress: '3.3.3.3',
        date: new Date('2021-01-08'),
      })

    const result = await readLogFile(filePath)

    expect(parseLogEntry).toHaveBeenCalledWith('log entry 1')
    expect(parseLogEntry).toHaveBeenCalledWith('log entry 2')
    expect(parseLogEntry).toHaveBeenCalledWith('log entry 3')
    expect(result).toEqual([
      { ipAddress: '2.2.2.2', date: new Date('2021-01-13') },
      { ipAddress: '3.3.3.3', date: new Date('2021-01-08') },
      { ipAddress: '1.1.1.1', date: new Date('2021-01-02') },
    ])
  })

  it('should remove any newline characters from log entries', async () => {
    const filePath = 'https:/test.com/path/to/log/file.log'
    const logContent = stripIndents`log entry 1\n\r
                                    log entry 2\n\r
                                    log entry 3\n\r`

    mock.method(global, 'fetch', () => {
      return { text: async () => logContent }
    })

    jest
      .mocked(parseLogEntry)
      .mockReturnValueOnce({
        ipAddress: '1.1.1.1',
        date: new Date('2021-01-02'),
      })
      .mockReturnValueOnce({
        ipAddress: '2.2.2.2',
        date: new Date('2021-01-13'),
      })
      .mockReturnValueOnce({
        ipAddress: '3.3.3.3',
        date: new Date('2021-01-08'),
      })

    const result = await readLogFile(filePath)

    expect(parseLogEntry).toHaveBeenCalledWith('log entry 1')
    expect(parseLogEntry).toHaveBeenCalledWith('log entry 2')
    expect(parseLogEntry).toHaveBeenCalledWith('log entry 3')
    expect(result).toEqual([
      { ipAddress: '2.2.2.2', date: new Date('2021-01-13') },
      { ipAddress: '3.3.3.3', date: new Date('2021-01-08') },
      { ipAddress: '1.1.1.1', date: new Date('2021-01-02') },
    ])
  })

  it('should return an empty array if log file is empty', async () => {
    const filePath = '/path/to/empty/log/file.log'

    mock.method(global, 'fetch', () => {
      return { text: async () => '' }
    })

    const result = await readLogFile(filePath)

    expect(result).toEqual([])
  })
})
