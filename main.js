const {
  getHotFromSubs,
  accessReddit,
} = require('./redditBot')
const {
  accessYoutube,
} = require('./youtubeAuth')
const {
  minToMs,
} = require('./util')
const {
  getChannel,
  playlistsToMake,
  getPlaylists,
} = require('./youtubeFuncs')

const refreshRate = 100//minToMs(.15)

const subreddits = [
  'listentothis',
  'trailers',
  'videos',
]

const startUp = async () => {
  let auth = await accessYoutube()
  // const reddit = accessReddit()
  // return setInterval(async () => {
    try {
      // auth = auth ? auth : await accessYoutube()
      // const hotContent = await getHotFromSubs(reddit,subreddits)
      // getChannel(auth)
      const createdPlaylists = await getPlaylists(auth)
    } catch (error) {
      console.error(error)
      auth = await accessYoutube()
    }
  // }, refreshRate)
}

startUp()
