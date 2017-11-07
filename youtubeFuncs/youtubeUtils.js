const playlistsToMake = (playlists, subreddits) => {
  const alreadyCreatedPlaylists = new Set(Object.keys(playlists))
  return subreddits.filter(subreddit => !alreadyCreatedPlaylists.has(subreddit))
}

const filterPlaylists = (playlists, desiredNames) =>
  Object.keys(playlists)
    .filter(playlistName => desiredNames.includes(playlistName))
    .reduce((accum, playlistName) =>
      Object.assign(accum, { [playlistName]: playlists[playlistName] }),
    {})

module.exports = {
  playlistsToMake,
  filterPlaylists,
}
