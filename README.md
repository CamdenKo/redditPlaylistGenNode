# redditPlaylistGenNode
Reddit bot to automatically make YouTube playlists of the front page of each subreddit.

## [LINK](https://www.youtube.com/channel/UCi4M2JdQnGf_xv7iV0RVqNA/playlists?view_as=subscriber)

Currently monitored subreddits:
* /r/listentothis
* /r/videos
* /r/deepintoyoutube
* /r/trailers

## Running
* Clone repo
* `yarn`
* `touch secrets.js`
  * In `secrets.js` put
    ```javascript
    process.env.GOOGLE_CLIENT_ID = 'YOUR-GOOGLE-CLIENT-ID'
    process.env.GOOGLE_CLIENT_SECRET = 'YOUR-GOOGLE-CLIENT-SECRET'
    process.env.GOOGLE_REDIRECT_URL = 'YOUR-GOOGLE-REDIRECT-URL'
    process.env.OAUTH_ACCESS_TOKEN = 'YOUR-OAUTH-ACCESS-TOKEN-FOR-YOUR-ACCOUNT'
    process.env.OAUTH_REFRESH_TOKEN = 'YOUR-OAUTH-REFRESH-TOKEN-FOR-YOUR-ACCOUNT'
    process.env.REDDIT_CLIENT_ID = 'YOUR-REDDIT-CLIENT-ID'
    process.env.REDDIT_CLIENT_SECRET = 'YOUR-REDDIT-CLIENT-SECRET'
    process.env.REDDIT_PASSWORD = 'YOUR-REDDIT-PASSWORD'
    process.env.REDDIT_USERNAME = 'YOUR-REDDIT-USERNAME'
    process.env.REDDIT_USER_AGENT = 'YOUR-BOT-NAME'
    ```
* `node main.js` OR `npm start`

## Testing
* npm run test

## TODO
- [X] Make playlists generate to /r/SUBREDDITNAME instead of SUBREDDITNAME
- [X] Deploy to Heroku taskrunner
- [X] Make a unique youtube account
- [ ] Expand to do more than just "Hot", perhaps top of the month?
  - [ ] Top of the month should have some type of validation to see if the playlist needs to be repopulated
- [ ] Expand to use Youtube API to search for links that aren't youtube

#### Icebox
- [ ] Make a utility for creating youtube api keys in node
- [ ] Give tutorial for enabling reddit API
