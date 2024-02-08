import { run } from './index'

describe('run', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should log an error message if no file path is provided', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error')

    run()

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Please provide a path to a log file using the --file flag'
    )
  })

  it('should log the correct results if a file path is provided', () => {
    const consoleLogSpy = jest.spyOn(console, 'log')

    run('data/programming-task-example-data.log')

    expect(consoleLogSpy).toHaveBeenCalledWith({
      unique_ip_address_count: 11,
      top_3_most_visited_urls: [
        { value: '/docs/manage-websites/', count: 2 },
        { value: '/intranet-analytics/', count: 1 },
        { value: 'http://example.net/faq/', count: 1 },
      ],
      top_3_most_active_ip_addresses: [
        { value: '168.41.191.40', count: 4 },
        { value: '177.71.128.21', count: 3 },
        { value: '50.112.00.11', count: 3 },
      ],
    })
  })
})
