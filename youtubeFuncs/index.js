const google = require('googleapis')
const service = google.youtube('v3')

const getPlaylistsPromise = auth =>
  new Promise((resolve, reject) => {
    service.playlists.list({
      auth,
      part: 'snippet,contentDetails',
      forUsername: 'youtubeRedditBot',
      mine: 'true',
    }, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response.items)
      }
    })
  })

const createPlaylistPromise = (auth, title) =>
  new Promise((resolve, reject) => {
    service.playlists.insert({
      auth,
      part: 'snippet,status',
      resource: {
        snippet: {
          title,
          description: `Automatically created playlist for /r/${title} created by CamdenK`,
        },
        status: {
          privacyStatus: 'public',
        },
      },
    }, (err, response) => {
      if (err) reject(err)
      else resolve(response.items)
    })
  })

const addToPlaylistPromise = (auth, playlistId, videoId) =>
  new Promise((resolve, reject) => {
    service.playlistItems.insert({
      auth,
      part: 'snippet',
      resource: {
        snippet: {
          playlistId,
          resourceId: {
            videoId,
            kind: 'youtube#video',
          },
        },
      },
    }, (err, response) => {
      if (err) reject(err)
      else resolve(response.items)
    })
  })

const playlistItemsPromise = (auth, playlistId) =>
  new Promise((resolve, reject) => {
    service.playlistItems.list({
      auth,
      part: 'contentDetails',
      playlistId,
      maxResults: '50',
    }, (err, response) => {
      if (err) reject(err)
      else resolve(response.items)
    })
  })

const deletePlaylistItemPromise = (auth, playlistItemId) =>
  new Promise((resolve, reject) => {
    service.playlistItems.delete({
      auth,
      id: playlistItemId,
    }, (err, response) => {
      if (err) reject(err)
      else resolve(response)
    })
  })

/**
 *
 * @param {google.auth.OAuth2} auth
 * @returns {Object} title: id
 */
const getPlaylists = async (auth) => {
  try {
    const playlists = await getPlaylistsPromise(auth)
    return playlists.reduce(
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
}

const addAllToPlaylists = async (auth, combinedData) =>
  Promise.all(
    Object.keys(combinedData)
      .map(playlistName =>
        addAllToPlaylist(auth, combinedData[playlistName].playlistId, combinedData[playlistName].videoIds)
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
