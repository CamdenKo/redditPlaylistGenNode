const filterRedditResultsToYoutubeId = require('./redditUrlUtilities')

const getTopFromSub = async (request, subreddit, duration) =>
  filterRedditResultsToYoutubeId(await request.getSubreddit(subreddit).getTop(duration || 'all'))

const getHotFromSub = async (request, subreddit) =>
  filterRedditResultsToYoutubeId(await request.getSubreddit(subreddit).getHot())

const getNewFromSub = async (request, subreddit) =>
  filterRedditResultsToYoutubeId(await request.getSubreddit(subreddit).getNew())
/**
 *
 * @param {Snoowrap} request created Snoowrap request object
 * @param {Array(strings)} subreddits strings of which subreddits to check (omit /r/)
 * @param {Function(Snoowrap, string)} methodPromise returns an array of youtubeId's
 * @returns {Object} An Object with keys being subreddit and value being array of strings of the links from hot
 */
const getPostsFromSubs = async (request, subreddits, methodPromise) => {
  try {
    const allLinks = await Promise.all(subreddits.map(subName => methodPromise(request, subName)))
    return allLinks.reduce((accum, links, index) =>
      Object.assign(accum, { [subreddits[index]]: links }), {})
  } catch (error) {
    console.error(error)
    return error
  }
}

const mapToPostPromise = (subreddit, type) => {
  switch (type.substring(0, 3)) {
    case 'new':
      return
    case 'top':
    case 'hot':
    default:
      break
  }
}

const getAllContent = async (subreddits, contentTypes) => {
  contentTypes.forEach((type) => {
  })
}

module.exports = {
  getHotFromSub,
  getPostsFromSubs,
}
