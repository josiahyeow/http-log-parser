import { getTop3 } from './get-top-3'

describe('get top 3', () => {
  it('should return the top 3 entries based on field counts', () => {
    const fieldCounts = {
      apple: 5,
      banana: 3,
      orange: 7,
      mango: 2,
      pineapple: 4,
    }

    const result = getTop3(fieldCounts)

    expect(result).toEqual([
      { value: 'orange', count: 7 },
      { value: 'apple', count: 5 },
      { value: 'pineapple', count: 4 },
    ])
  })

  it('should return an empty array if fieldCounts is empty', () => {
    const fieldCounts = {}

    const result = getTop3(fieldCounts)

    expect(result).toEqual([])
  })

  it('should return the top 2 entries if fieldCounts has less than 3 entries', () => {
    const fieldCounts = {
      apple: 5,
      banana: 3,
    }

    const result = getTop3(fieldCounts)

    expect(result).toEqual([
      { value: 'apple', count: 5 },
      { value: 'banana', count: 3 },
    ])
  })

  it('should return the top 3 entries if fieldCounts has duplicate counts', () => {
    const fieldCounts = {
      apple: 5,
      banana: 3,
      orange: 5,
      mango: 2,
      pineapple: 4,
    }

    const result = getTop3(fieldCounts)

    expect(result).toEqual([
      { value: 'apple', count: 5 },
      { value: 'orange', count: 5 },
      { value: 'pineapple', count: 4 },
    ])
  })
})
