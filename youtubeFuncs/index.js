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

const getPlaylists = async (auth) => {
  try {
    const playlists = await getPlaylistsPromise(auth)
    return playlists.reduce((accum, playlist) => Object.assign(accum, { [playlist.snippet.title]: playlist.id }), {})
  } catch (error) {
    console.error(`Trouble getting playlists -- ${error}`)
  }
}

const createPlaylist = async(auth, name) => {
  try {

  } catch (error) {

  }
}
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
}
