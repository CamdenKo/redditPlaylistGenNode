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
          description: `Automatically created playlist for ${title} created by /u/CamdenK`,
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

module.exports = {
  getPlaylistsPromise,
  createPlaylistPromise,
  addToPlaylistPromise,
  playlistItemsPromise,
  deletePlaylistItemPromise,
}
