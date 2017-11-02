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
  createPlaylists,
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

/**
 * @returns {Object} { subreddit: ['links'] }
 */
const setupPlaylists = async (auth, subreddits) => {
  const existingPlaylists = await getPlaylists(auth)
  const filteredPlaylists = filterPlaylists(existingPlaylists, subreddits)
  const toCreate = playlistsToMake(filteredPlaylists, subreddits)
  if (toCreate.length) {
    await createPlaylists(auth, toCreate)
    const allPlaylists = await getPlaylists(auth)
    return filterPlaylists(allPlaylists, subreddits)
  }
  return filteredPlaylists
}

const startUp = async () => {
  let auth = await accessYoutube()
  const reddit = accessReddit()
  // return setInterval(async () => {
    try {
      auth = auth ? auth : await accessYoutube()
      const hotContent = await getHotFromSubs(reddit, subreddits)
      console.log('hot content', hotContent)
      // const playlists = await setupPlaylists(auth, subreddits)

      // const combinedData = Object.keys(playlists)
      //   .reduce((accum, playlistName) =>
      //     Object.assign(
      //       accum,
      //       { [playlistName]: { id: playlists[playlistName], links: hotContent[playlistName] } },
      //     ), {})

    } catch (error) {
      console.error(error)
      auth = await accessYoutube()
    }
  // }, refreshRate)
}

startUp()
