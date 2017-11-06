# redditPlaylistGenNode
Reddit bot to automatically make YouTube playlists.
[Link to channel where the playlists are uploaded (I'll make this it's own channel eventually](https://www.youtube.com/channel/UCkCUI2t9V-KF3MFvk9neeCQ?view_as=subscriber)

## Running
* Clone repo
* `yarn`
* `touch client_id.json secrets.js`
  * Put youtube auth inside `client_id.json`
  * In `secrets.js`put
    ```javascript
     module.exports = {
      reddit: {
        username: "YOUR-REDDIT-USERNAME",
        password: "YOUR-REDDIT-PASSWORD",
        clientId: "YOUR-UNIQUE-CLIENTID",
        clientSecret: "YOUR-UNIQUE-CLIENT-SECRET",
        userAgent: "WHATVER-YOU-WANNA-NAME-THIS",
      },
    }
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
