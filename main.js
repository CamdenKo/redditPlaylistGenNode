const {
  getHotFromSub,
  getPostsFromSubs,
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
    // 'trailers',
    // 'videos',
    // 'deepintoyoutube',
  ]
  const contentTypes = [
    'hot',
    'top (all)',
  ]
  const startTime = Date.now()
  console.log('starting...')
  try {
    const auth = accessYoutube()
    const hotContent = await getPostsFromSubs(reddit, subreddits, getHotFromSub)
    const playlists = await setupPlaylists(auth, subreddits, contentTypes)
    // const combinedData = combineData(playlists, hotContent)
    // console.log(`Now adding songs to playlists in ${Date.now() - startTime}ms.`)
    // await addAllToPlaylists(auth, combinedData)
    // console.log(`Loop finished in ${Date.now() - startTime}ms.`)
  } catch (error) {
    console.error(error)
  }
}

startUp()
