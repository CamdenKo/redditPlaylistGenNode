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

const startUp = () =>
  setInterval(async () => {
    const auth = await accessYoutube()
  } ,refreshRate)
