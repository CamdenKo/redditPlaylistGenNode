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
  createPlaylist,
} = require('./youtubeFuncs')
const {
  playlistsToMake,
  filterPlaylists,
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
      auth = auth ? auth : await accessYoutube()
      const hotContent = await getHotFromSubs(reddit,subreddits)
      const existingPlaylists = await getPlaylists(auth)
      const filteredPlaylists = filterPlaylists(existingPlaylists, subreddits)
      const toCreate = playlistsToMake(filteredPlaylists, subreddits)
      await createPlaylists(auth, toCreate)
    } catch (error) {
      console.error(error)
      auth = await accessYoutube()
    }
  // }, refreshRate)
}

startUp()
