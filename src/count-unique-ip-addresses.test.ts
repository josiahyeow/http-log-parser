import { countUniqueIpAddresses } from './count-unique-ip-addresses'

describe('count unique ip addresses', () => {
  describe('ip addresses that appear multiple times', () => {
    it('should count unique ip addresses', () => {
      const httpRequests = [
        {
          ipAddress: '123.12.123.12',
        },
        {
          ipAddress: '123.12.123.12',
        },
        {
          ipAddress: '456.45.456.45',
        },
      ]
      expect(countUniqueIpAddresses(httpRequests)).toEqual(2)
    })
  })

  describe('ip addresses that appear once', () => {
    it('should count unique ip addresses', () => {
      const httpRequests = [
        {
          ipAddress: '123.12.123.12',
        },
        {
          ipAddress: '456.45.456.45',
        },
      ]
      expect(countUniqueIpAddresses(httpRequests)).toEqual(2)
    })
  })

  describe('ip addresses that are undefined', () => {
    it('should not count undefined ip addresses', () => {
      const httpRequests = [
        {
          ipAddress: undefined,
        },
        {
          ipAddress: '456.45.456.45',
        },
      ]
      expect(countUniqueIpAddresses(httpRequests)).toEqual(1)
    })
  })

  describe('no ip addresses', () => {
    it('should return 0', () => {
      expect(countUniqueIpAddresses([])).toEqual(0)
    })
  })
})
