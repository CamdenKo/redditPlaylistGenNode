const google = require('googleapis')

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

const getChannel = (auth) => {
  console.log(auth, '------------auth----------')
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
}
