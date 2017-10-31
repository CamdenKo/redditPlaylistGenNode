const {
  andFunc,
  isYoutube,
} = require('./urlValidation')


describe('urlValidation', () => {
  describe('andFunc', () => {
    test('returns a function', () => {
      expect(typeof andFunc(() => true)).toBe('function')
    })
    test('will call each function if all are true', () => {
      const mock = jest.fn()
      mock.mockReturnValue(true)
      andFunc(mock,mock)(null)
      expect(mock).toHaveBeenCalledTimes(2)
    })
    test('will call the functions with the appropriate value', () => {
      const mock = jest.fn()
      mock.mockReturnValue(true)
      const testarg = []
      const toTest = andFunc(mock)
      toTest(testarg)
      expect(mock).toHaveBeenCalledWith(testarg)
    })
  })
  describe('is youtube', () => {
    test('returns true for youtube links', () => {
      [
        'https://www.youtube.com/watch?v=DBRSiH7RHTs',
        'https://youtu.be/DBRSiH7RHTs',
      ]
        .forEach(link => expect(isYoutube(link)).toBe(true))
    })
    test('returns false for nonyoutube links', () => {
      [
        'https://youtue.be/DBRSiH7RHTs',
        'youw..com'
      ]
        .forEach(link => expect(isYoutube(link)).toBe(false))
    })
  })
})
