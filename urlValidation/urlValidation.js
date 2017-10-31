const andFunc = (...funcs) =>
  val =>
    funcs.some(func => func(val))

const isYoutube = str =>
  str.includes('.youtube.') || str.includes('youtu.be')

module.exports = {
  andFunc,
  isYoutube,
}
