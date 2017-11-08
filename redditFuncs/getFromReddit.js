const filterRedditResultsToYoutubeId = require('./redditUrlUtilities')

const getTopFromSub = async (request, subreddit, modifier) =>
  filterRedditResultsToYoutubeId(await request.getSubreddit(subreddit).getTop(modifier))

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
const getPostsFromSubs = async (request, subreddits, methodPromise, modifier) => {
  try {
    const allLinks = await Promise.all(subreddits.map(subName => methodPromise(request, subName, modifier)))
    return allLinks.reduce((accum, links, index) =>
      Object.assign(accum, { [subreddits[index]]: links }), {})
  } catch (error) {
    console.error(error)
    return error
  }
}

const mapToPostPromise = (request, subreddit, type) => {
  switch (type.substring(0, 3)) {
    case 'new':
      return getPostsFromSubs(request, subreddit, getNewFromSub)
    case 'top':
      return getPostsFromSubs(request, subreddit, getTopFromSub, type.substring(5))
    case 'hot':
      return getPostsFromSubs(request, subreddit, getHotFromSub)
    default:
      return null
  }
}

const getAllRedditContent = (request, subreddits, contentTypes) =>
  Promise.all(subreddits.reduce((subAccum, subName) => [
    ...subAccum,
    ...contentTypes.reduce((typeAccum, type) => [
      ...typeAccum,
      mapToPostPromise(request, subName, type),
    ], []),
  ], []))


module.exports = {
  getHotFromSub,
  getPostsFromSubs,
  getAllRedditContent,
}
