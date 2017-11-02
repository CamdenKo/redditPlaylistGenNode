const {
  getHotFromSubs,
  accessReddit,
} = require('./redditBot')
const {
  accessYoutube,
} = require('./youtubeAuth')
const {
  getPlaylists,
  createPlaylists,
  addAllToPlaylists,
  clearPlaylists,
} = require('./youtubeFuncs')
const {
  playlistsToMake,
  filterPlaylists,
} = require('./youtubeFuncs/youtubeUtils')

/**
 * @returns {Object} { subreddit: ['links'] }
 */
const setupPlaylists = async (auth, subreddits) => {
  const existingPlaylists = await getPlaylists(auth)
  const filteredPlaylists = filterPlaylists(existingPlaylists, subreddits)
  await clearPlaylists(auth, Object.values(filteredPlaylists))
  const toCreate = playlistsToMake(filteredPlaylists, subreddits)
  if (toCreate.length) {
    await createPlaylists(auth, toCreate)
    const allPlaylists = await getPlaylists(auth)
    return filterPlaylists(allPlaylists, subreddits)
  }
  return filteredPlaylists
}

const startUp = async () => {
  const subreddits = [
    'listentothis',
    'trailers',
    'videos',
  ]
  const startTime = Date.now()
  console.log('starting...')
  const reddit = accessReddit()
  try {
    const auth = await accessYoutube()
    const hotContent = await getHotFromSubs(reddit, subreddits)
    const playlists = await setupPlaylists(auth, subreddits)
    const combinedData = Object.keys(playlists)
      .reduce((accum, playlistName) =>
        Object.assign(
          accum,
          {
            [playlistName]: {
              playlistId: playlists[playlistName], videoIds: hotContent[playlistName],
            },
          },
        ), {})
    await addAllToPlaylists(auth, combinedData)
    console.log(`Loop finished in ${Date.now() - startTime}ms.`)
  } catch (error) {
    console.error(error)
  }
}

startUp()
