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
