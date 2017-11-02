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
  addAllToPlaylists,
} = require('./youtubeFuncs')
const {
  playlistsToMake,
  filterPlaylists,
} = require('./youtubeFuncs/youtubeUtils')

const refreshRate = 100//minToMs(.15)

const subreddits = [
  'listentothis',
  // 'trailers',
  // 'videos',
]

const testFunc = toPrint => console.log(toPrint)
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
      const startTime = Date.now()
      auth = auth ? auth : await accessYoutube()
      const hotContent = await getHotFromSubs(reddit, subreddits)
      const playlists = await setupPlaylists(auth, subreddits)
      const combinedData = Object.keys(playlists)
        .reduce((accum, playlistName) =>
          Object.assign(
            accum,
            { [playlistName]: { playlistId: playlists[playlistName], videoIds: hotContent[playlistName] } },
          ), {})
      testFunc(combinedData.listentothis.videoIds[1])
      await addAllToPlaylists(auth, combinedData)
      console.log(`Loop finished in ${Date.now() - startTime}ms.`)
    } catch (error) {
      console.error(error)
      auth = await accessYoutube()
    }
  // }, refreshRate)
}

startUp()
