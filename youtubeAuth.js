const GoogleAuth = require('google-auth-library')

if (process.env.NODE_ENV === 'development') require('./secrets')

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
const SCOPES = ['https://www.googleapis.com/auth/youtube']

const tokenlessAuthorize = () => {
  const authFactory = new GoogleAuth()
  const client = new authFactory.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL,
  )
  client.generateAuthUrl({
    access_type: 'online',
    scope: SCOPES,
  })
  client.credentials = {
    access_token: process.env.OAUTH_ACCESS_TOKEN,
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
  }
  return client
}


/**
 * Load client secrets from a local file.
 * @returns {google.auth.OAuth2} Authorization Object
 */
const accessYoutube = () =>
  tokenlessAuthorize()

accessYoutube()

module.exports = {
  accessYoutube,
}
