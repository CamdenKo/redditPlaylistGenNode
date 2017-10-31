const {
  requester,
  getData,
} = require('./redditBot')
const {
  accessYoutube,
} = require('./youtubeAccess')
const {
  minToMs,
} = require('./util')

const refreshRate = minToMs(15)
