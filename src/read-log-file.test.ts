import { stripIndents } from 'common-tags'
import { readFileSync } from 'fs'
import { parseLogEntry } from './parse-log-entry'
import { readLogFile } from './read-log-file'

jest.mock('fs')
jest.mock('./parse-log-entry')

describe('read log file', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should read and parse log file correctly', () => {
    const filePath = '/path/to/log/file.log'
    const logContent = stripIndents`log entry 1
                                    log entry 2
                                    log entry 3`

    jest.mocked(readFileSync).mockReturnValue(logContent)
    jest
      .mocked(parseLogEntry)
      .mockReturnValueOnce({ ipAddress: '1.1.1.1' })
      .mockReturnValueOnce({ ipAddress: '2.2.2.2' })
      .mockReturnValueOnce({ ipAddress: '3.3.3.3' })

    const result = readLogFile(filePath)

    expect(readFileSync).toHaveBeenCalledWith(filePath, 'utf-8')
    expect(parseLogEntry).toHaveBeenNthCalledWith(1, 'log entry 1')
    expect(parseLogEntry).toHaveBeenNthCalledWith(2, 'log entry 2')
    expect(parseLogEntry).toHaveBeenNthCalledWith(3, 'log entry 3')
    expect(result).toEqual([
      { ipAddress: '1.1.1.1' },
      { ipAddress: '2.2.2.2' },
      { ipAddress: '3.3.3.3' },
    ])
  })

  it('should return an empty array if log file is empty', () => {
    const filePath = '/path/to/empty/log/file.log'

    jest.mocked(readFileSync).mockReturnValue('')

    const result = readLogFile(filePath)

    expect(readFileSync).toHaveBeenCalledWith(filePath, 'utf-8')
    expect(result).toEqual([])
  })
})
