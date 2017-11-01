const {
  requester,
  getData,
} = require('./redditBot')
const {
  accessYoutube,
} = require('./youtubeAuth')
const {
  minToMs,
} = require('./util')

const refreshRate = minToMs(15)

const startUp = () => {
  let auth = await accessYoutube()
  return setInterval(async () => {
    try {
      auth = auth ? auth : await accessYoutube()

    } catch (error) {
      console.error(error)
      auth = await accessYoutube()
    }
  }, refreshRate)

}
