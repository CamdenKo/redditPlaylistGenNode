const google = require('googleapis')

const getPlaylistsPromise = auth =>
  new Promise((resolve, reject) => {
    const service = google.youtube('v3')
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
    const service = google.youtube('v3')
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
    const service = google.youtube('v3')
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
    return playlists.reduce((accum, playlist) => Object.assign(accum, { [playlist.snippet.title]: playlist.id }), {})
  } catch (error) {
    console.error(`Trouble getting playlists -- ${error}`)
  }
}

const createPlaylist = async (auth, title) => {
  try {
    const createdPlaylist = await createPlaylistPromise(auth, title)
  } catch (error) {
    console.error(`Trouble creating playlist -- ${error}`)
  }
}

const createPlaylists = async (auth, titles) =>
  Promise.all(titles.map(title => createPlaylist(auth, title)))

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

const getChannel = (auth) => {
  const service = google.youtube('v3')
  service.channels.list({
    auth,
    part: 'snippet,contentDetails,statistics',
    forUsername: 'GoogleDevelopers',
  }, (err, response) => {
    if (err) {
      console.error(`The API returned an error: ${err}`)
      return
    }
    const channels = response.items
    if (!channels.length) {
      console.log('No channel found.')
    } else {
      console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
                  'it has %s views.',
                  channels[0].id,
                  channels[0].snippet.title,
                  channels[0].statistics.viewCount)
    }
  })
}

module.exports = {
  getChannel,
  getPlaylists,
  createPlaylist,
  createPlaylists,
}
