const {
  andFunc,
  isYoutube,
} = require('./urlValidation')


describe('urlValidation', () => {
  describe('andFunc', () => {
    test('returns a function', () => {
      expect(typeof andFunc(() => true)).toBe('function')
    })
    test('will call each function once', () => {
      const func1 = () => true
      const func2 = () => true
      andFunc(func1,func2)(null)
      expect(func1).toHaveBeenCalledTimes(1)
      expect(func2).toHaveBeenCalledTimes(1)
    })
  })
})
