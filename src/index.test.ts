import { run } from './index'

describe('run', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('shows an error message if no file path is provided', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error')

    run()

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Please provide a path to a log file using the --file flag'
    )
  })

  it('outputs the correct results if a file path is provided', () => {
    const consoleLogSpy = jest.spyOn(console, 'log')

    run('data/example-data.log')

    expect(consoleLogSpy).toHaveBeenCalledWith({
      unique_ip_address_count: 11,
      top_3_most_visited_urls: [
        { value: '/docs/manage-websites/', count: 2 },
        { value: '/temp-redirect', count: 1 },
        { value: '/moved-permanently', count: 1 },
      ],
      top_3_most_active_ip_addresses: [
        { value: '168.41.191.40', count: 4 },
        { value: '50.112.00.11', count: 3 },
        { value: '177.71.128.21', count: 3 },
      ],
    })
  })

  it('outputs empty results if the log file has no entries', () => {
    const consoleLogSpy = jest.spyOn(console, 'log')

    run('data/empty.log')

    expect(consoleLogSpy).toHaveBeenCalledWith({
      unique_ip_address_count: 0,
      top_3_most_visited_urls: [],
      top_3_most_active_ip_addresses: [],
    })
  })
})
