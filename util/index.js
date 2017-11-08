const subToString = (subreddit, contentType) =>
  `/r/${subreddit} - ${contentType}`

const stringToSub = (string) => {
  const subs = string.substring(3).split(' - ')
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

const getDesiredNames = (subreddits, contentTypes) =>
  subreddits.reduce(
    (accum, subreddit) => [
      ...accum,
      ...contentTypes.reduce((typeAcc, type) => [...typeAcc, subToString(subreddit, type)], []),
    ], [])

module.exports = {
  subToString,
  combineData,
  getDesiredNames,
}
