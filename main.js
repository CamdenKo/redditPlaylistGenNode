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
  getPlaylists,
} = require('./youtubeFuncs')
const {
  playlistsToMake,
} = require('./youtubeFuncs/youtubeUtils')

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
      const existingPlaylists = await getPlaylists(auth)
      const toCreate = playlistsToMake(existingPlaylists, subreddits)
    } catch (error) {
      console.error(error)
      auth = await accessYoutube()
    }
  // }, refreshRate)
}

startUp()
