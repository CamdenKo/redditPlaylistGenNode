const {
  playlistsToMake,
  filterPlaylists,
} = require('./youtubeUtils')

describe('youtubeFuncs', () => {
  describe('playlistsToMake', () => {
    const subreddits = [
      'listentothis',
      'trailers',
      'videos',
    ]
    const playlists = {
      listentothis: '123',
      videos: '456',
    }
    const result = playlistsToMake(playlists, subreddits)
    test('Returns an array of strings', () => {
      expect(Array.isArray(result)).toBe(true)
      expect(typeof result[0]).toBe('string')
    })
    test('Returns the subreddits that aren\'t keys in the playlists object', () => {
      expect(result.length).toBe(1)
      expect(result[0]).toBe('trailers')
    })
  })
  describe('filter playlists', () => {
    const subreddits = [
      'listentothis',
      'trailers',
      'videos',
    ]
    const playlists = {
      listentothis: '123',
      deleteMe: '456',
      trailers: '123',
      alsoMe: 'delete',
    }
    const result = filterPlaylists(playlists, subreddits)
    test('returns an Object', () => {
      expect(typeof result).toBe('object')
    })
    test('only keeps playlists that are also subreddits', () => {
      expect(Object.keys(result)).toContain('listentothis')
      expect(Object.keys(result)).toContain('trailers')
    })
    test('removes all non subreddit playlists', () => {
      expect(Object.keys(result).length).toBe(2)
    })
  })
})
