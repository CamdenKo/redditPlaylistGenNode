const playlistsToMake = (playlists, desiredNames) => {
  const alreadyCreatedPlaylists = new Set(Object.keys(playlists))
  return desiredNames.filter(name => !alreadyCreatedPlaylists.has(name))
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
