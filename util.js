const minToMs = min =>
  min * 60 * 1000

const subToString = (subreddit, contentType) =>
  `${subreddit} - ${contentType}`

const stringToSub = (string) => {
  const subs = string.split(' - ')
  return { subreddit: subs[0], contentType: subs[1] }
}

const combineData = (playlists, content) =>
  Object.keys(playlists)
    .reduce((accum, playlistName) =>
      Object.assign(
        accum,
        {
          [playlistName]: {
            playlistId: playlists[playlistName], videoIds: content[playlistName],
          },
        },
      ), {})


module.exports = {
  minToMs,
  combineData,
  subToString,
  stringToSub,
}
