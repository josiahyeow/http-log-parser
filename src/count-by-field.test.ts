import { countHttpRequestsByField } from './count-by-field'

describe('count http requests by field', () => {
  describe('http requests that contain a field that appears different amount of times', () => {
    it('counts the number of occurrences of each field value', () => {
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
        {
          ipAddress: '789.78.789.78',
        },
        {
          ipAddress: '789.78.789.78',
        },
        {
          ipAddress: '789.78.789.78',
        },
        {
          ipAddress: '111.11.111.11',
        },
      ]

      const result = countHttpRequestsByField(httpRequests, 'ipAddress')
      expect(result).toEqual({
        '789.78.789.78': 3,
        '123.12.123.12': 2,
        '456.45.456.45': 1,
        '111.11.111.11': 1,
      })
    })
  })

  describe('no https requests', () => {
    it('should return an empty array', () => {
      const httpRequests = []
      const result = countHttpRequestsByField(httpRequests, 'ipAddress')
      expect(result).toEqual({})
    })
  })

  describe('field is not in http request', () => {
    it('should throw an error', () => {
      const httpRequests = [
        {
          ipAddress: '123.12.123.12',
        },
      ]
      expect(() => countHttpRequestsByField(httpRequests, 'tomato')).toThrow()
    })
  })
})
