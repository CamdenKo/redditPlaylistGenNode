const andFunc = (...funcs) =>
  val =>
    funcs.some(func => func(val))

const isYoutube = str =>
  str.contains('.youtube.') || str.contains('.youtu.be.')

module.exports = {
  andFunc,
  isYoutube,
}
