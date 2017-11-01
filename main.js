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
const {
  getChannel,
} = require('./youtubeFuncs')

const refreshRate = 100//minToMs(.15)

const startUp = async () => {
  let auth = await accessYoutube()
  // return setInterval(async () => {
    try {
      auth = auth ? auth : await accessYoutube()
      getChannel(auth)
    } catch (error) {
      console.error(error)
      auth = await accessYoutube()
    }
  // }, refreshRate)
}

startUp()
