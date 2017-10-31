const {
  andFunc,
  isYoutube,
} = require('./urlValidation')

describe('urlValidation', () => {
  describe('andFunc', () => {
    test('returns a function', () => {
      expect(typeof andFunc(() => true)).toBe('function')
    })
  })
})
