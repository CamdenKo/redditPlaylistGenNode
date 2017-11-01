const fs = require('fs')
const readline = require('readline')

const GoogleAuth = require('google-auth-library')

const promisifedRF = path => new Promise((resolve, reject) => {
  fs.readFile(path, (err, value) => {
    if (err) {
      reject(err)
    } else {
      resolve(value)
    }
  })
})

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
const SCOPES = ['https://www.googleapis.com/auth/youtube']
const TOKEN_DIR = `${process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE}/.credentials/`
const TOKEN_PATH = `${TOKEN_DIR}youtube-nodejs-quickstart.json`

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR)
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token))
  console.log(`Token stored to ${TOKEN_PATH}`)
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @returns {google.auth.OAuth2} new Auth Object
 */
const getNewToken = (oauth2Client) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
  console.log('Authorize this app by visiting this url: ', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        console.error('Error while trying to retrieve access token', err)
        return
      }
      oauth2Client.credentials = token
      storeToken(token)
      return oauth2Client
    })
  })
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @returns {google.auth.OAuth2} Authorization object
 */
const authorize = async (credentials) => {
  const clientSecret = credentials.installed.client_secret
  const clientId = credentials.installed.client_id
  const redirectUrl = credentials.installed.redirect_uris[0]
  const auth = new GoogleAuth()
  const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)

  // Check if we have previously stored a token.
  try {
    const token = await promisifedRF(TOKEN_PATH)
    oauth2Client.credentials = JSON.parse(token)
    return oauth2Client
  } catch (error) {
    return getNewToken(oauth2Client)
  }
}

/**
 * Load client secrets from a local file.
 * @returns {google.auth.OAuth2} Authorization Object
 */
const accessYoutube = async () => {
  try {
    const content = await promisifedRF('client_id.json')
    return await authorize(JSON.parse(content))
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  accessYoutube,
}
