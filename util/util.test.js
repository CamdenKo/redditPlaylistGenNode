const {
  getDesiredNames,
} = require('./index')

describe('util', () => {
  describe('getDesiredNames', () => {
    const subreddits = [
      'listentothis',
      'videos',
    ]
    const contentTypes = [
      'hot',
      'new',
    ]
    const result = getDesiredNames(subreddits, contentTypes)

    test('returns an array', () => {
      expect(Array.isArray(result)).toBe(true)
    })
    test('properly appends subreddits and content types', () => {
      expect(result).toEqual(['/r/listentothis - hot', '/r/listentothis - new', '/r/videos - hot', '/r/videos - new'])
    })
  })
})
