# redditPlaylistGenNode
Reddit bot to automatically make YouTube playlists of the front page of each subreddit.

## [Home](https://www.youtube.com/channel/UCi4M2JdQnGf_xv7iV0RVqNA/playlists?view_as=subscriber)

## Links:
* [/r/listentothis - hot](https://www.youtube.com/playlist?list=PLaMFYsRjKw1eeQQu50IsKq2TXAhef17dp)
* [/r/listentothis - top (week)](https://www.youtube.com/watch?v=K9jdIawyCJ0&list=PLaMFYsRjKw1fg70P8zY7TiNSkV0Jd34o5)
* [/r/videos - hot](https://www.youtube.com/watch?v=MqLxbxpEMd8&list=PLaMFYsRjKw1csevVIPyxLyyQ7ypzwOntB)
* [/r/videos - top (week)](https://www.youtube.com/playlist?list=PLaMFYsRjKw1cwsYnVvY_EBYrKV9unovF-)
* [/r/deepintoyoutube - hot](https://www.youtube.com/playlist?list=PLaMFYsRjKw1eApNrSBdu15QdAGJW9-5jz)
* [/r/deepintoyoutube - top (week)](https://www.youtube.com/playlist?list=PLaMFYsRjKw1fv1bTRGuhrc554C0PCw6q4)
* [/r/trailers - hot](https://www.youtube.com/watch?v=fh899UbMhOE&list=PLaMFYsRjKw1fefny3-NU5eHtHcQO5EHBN)
* [/r/trailers - top (week)](https://www.youtube.com/watch?v=_POpCkJToEQ&list=PLaMFYsRjKw1fbdK8rv7JEyqfIYi9_08Fc)

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
- [X] Expand to do more than just "Hot", perhaps top of the month?
  - [ ] Top of the month should have some type of validation to see if the playlist needs to be repopulated
- [ ] Expand to use Youtube API to search for links that aren't youtube

#### Icebox
- [ ] Make a utility for creating youtube api keys in node
- [ ] Give tutorial for enabling reddit API
- [ ] Expand testing
