const {
  getAllRedditContent,
} = require('./redditFuncs/getFromReddit')
const {
  accessYoutube,
} = require('./youtubeFuncs/youtubeAuth')
const {
  getPlaylists,
  createPlaylists,
  addAllToPlaylists,
  clearPlaylists,
} = require('./youtubeFuncs')
const {
  combineData,
  getDesiredNames,
} = require('./util')
const {
  playlistsToMake,
  filterPlaylists,
} = require('./youtubeFuncs/youtubeUtils')
if (process.env.NODE_ENV === 'development') require('./secrets')
const reddit = require('./redditFuncs')


/**
 * @returns {Object} { subreddit: ['links'] }
 */
const setupPlaylists = async (auth, subreddits, contentTypes) => {
  const existingPlaylists = await getPlaylists(auth)
  const desiredNames = getDesiredNames(subreddits, contentTypes)
  const filteredPlaylists = filterPlaylists(existingPlaylists, desiredNames)
  await clearPlaylists(auth, Object.values(filteredPlaylists))
  const toCreate = playlistsToMake(filteredPlaylists, desiredNames)
  if (toCreate.length) {
    await createPlaylists(auth, toCreate)
    const allPlaylists = await getPlaylists(auth)
    return filterPlaylists(allPlaylists, desiredNames)
  }
  return filteredPlaylists
}

const startUp = async () => {
  const subreddits = [
    'listentothis',
    'trailers',
    'videos',
    'deepintoyoutube',
  ]
  const contentTypes = [
    'hot',
    'top (week)',
  ]
  const startTime = Date.now()
  console.log('starting...')
  try {
    const auth = accessYoutube()
    const redditContent = await getAllRedditContent(reddit, subreddits, contentTypes)
    const playlists = await setupPlaylists(auth, subreddits, contentTypes)
    const combinedData = combineData(playlists, redditContent)
    console.log(`Adding to playliosts in ${Date.now() - startTime}ms.`)
    await addAllToPlaylists(auth, combinedData)
    console.log(`Loop finished in ${Date.now() - startTime}ms.`)
  } catch (error) {
    console.error(error)
  }
}

startUp()
