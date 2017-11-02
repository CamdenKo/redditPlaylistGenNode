const {
  playlistsToMake,
} = require('./index')

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
})
