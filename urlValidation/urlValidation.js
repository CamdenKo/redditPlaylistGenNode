const andFunc = (...funcs) =>
  val =>
    funcs.every(func => func(val))

const isYoutube = str =>
  str.includes('.youtube.') || str.includes('youtu.be')

module.exports = {
  andFunc,
  isYoutube,
}
