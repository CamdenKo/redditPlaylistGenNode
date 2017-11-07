const {
  getPlaylistsPromise,
  createPlaylistPromise,
  addToPlaylistPromise,
  playlistItemsPromise,
  deletePlaylistItemPromise,
} = require('./youtubePromises')

/**
 *
 * @param {google.auth.OAuth2} auth
 * @returns {Object} title: id
 */
const getPlaylists = async (auth) => {
  try {
    const playlists = await getPlaylistsPromise(auth)
    return playlists
      .reduce(
        (accum, playlist) => Object.assign(accum, { [playlist.snippet.title]: playlist.id }),
        {},
      )
  } catch (error) {
    console.error(`Trouble getting playlists -- ${error}`)
    return error
  }
}

const createPlaylist = async (auth, title) => {
  try {
    await createPlaylistPromise(auth, title)
  } catch (error) {
    console.error(`Trouble creating playlist -- ${error}`)
  }
}

const createPlaylists = (auth, titles) =>
  Promise.all(titles.map(title => createPlaylist(auth, title)))

const addAllToPlaylist = async (auth, playlistId, videoIds) => {
  for (let videoIndex = 0; videoIndex < videoIds.length; videoIndex += 1) {
    try {
      await addToPlaylistPromise(auth, playlistId, videoIds[videoIndex])
    } catch (error) {
      console.error(`Trouble adding to playlist -- ${error}`)
    }
  }
  console.log(`Finished with playlist ${playlistId}`)
}

const addAllToPlaylists = async (auth, combinedData) =>
  Promise.all(
    Object.keys(combinedData)
      .map(playlistName =>
        addAllToPlaylist(auth, combinedData[playlistName].playlistId, combinedData[playlistName].videoIds),
      ),
  )

const clearPlaylist = async (auth, playlistId) => {
  const playlist = await playlistItemsPromise(auth, playlistId)
  const playlistItemsIds = playlist
    .reduce((accum, item) => [...accum, item.id], [])
  for (let playlistItemId of playlistItemsIds) {
    await deletePlaylistItemPromise(auth, playlistItemId)
  }
}

const clearPlaylists = (auth, playlistIds) =>
  Promise.all(playlistIds.map(playlistId => clearPlaylist(auth, playlistId)))


module.exports = {
  getPlaylists,
  createPlaylists,
  addAllToPlaylists,
  clearPlaylists,
}
