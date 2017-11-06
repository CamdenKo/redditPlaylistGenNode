const playlistsToMake = (playlists, subreddits) => {
  const alreadyCreatedPlaylists = new Set(Object.keys(playlists))
  return subreddits.filter(subreddit => !alreadyCreatedPlaylists.has(subreddit))
}

const filterPlaylists = (playlists, subreddits) =>
  Object.keys(playlists)
    .filter(playlistName => subreddits.includes(playlistName))
    .reduce((accum, playlistName) =>
      Object.assign(accum, { [playlistName]: playlists[playlistName] }),
    {})

const subToString = (subreddit, contentType) =>
  `${subreddit} - ${contentType}`

const stringToSub = (string) => {
  const subs = string.split(' - ')
  return { subreddit: subs[0], contentType: subs[1] }
}

module.exports = {
  playlistsToMake,
  filterPlaylists,
  subToString,
  stringToSub,
}
