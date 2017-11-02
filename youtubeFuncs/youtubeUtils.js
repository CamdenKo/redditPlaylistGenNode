const playlistsToMake = (playlists, subreddits) => {
  const alreadyCreatedPlaylists = new Set(Object.keys(playlists))
  return subreddits.filter((subreddit) => !alreadyCreatedPlaylists.has(subreddit))
}

module.exports = {
  playlistsToMake,
}
