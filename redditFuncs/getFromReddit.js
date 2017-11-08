const filterRedditResultsToYoutubeId = require('./redditUrlUtilities')
const {
  subToString,
} = require('../util')

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
const getPostsFromSubs = async (request, subreddits, methodPromise, type, modifier) => {
  try {
    const allLinks = await Promise.all(subreddits.map(subName => methodPromise(request, subName, modifier)))
    return allLinks.reduce((accum, links, index) =>
      Object.assign(accum, { [subToString(subreddits[index], type)]: links }), {})
  } catch (error) {
    console.error(error)
    return error
  }
}

const mapToPostPromise = (request, subreddits, type) => {
  switch (type.substring(0, 3)) {
    case 'new':
      return getPostsFromSubs(request, subreddits, getNewFromSub, type)
    case 'top':
      return getPostsFromSubs(request, subreddits, getTopFromSub, type, type.substring(5))
    case 'hot':
      return getPostsFromSubs(request, subreddits, getHotFromSub, type)
    default:
      return null
  }
}

const getAllRedditContent = async (request, subreddits, contentTypes) => {
  const content = await Promise.all(contentTypes.reduce((accum, type) => [
    ...accum,
    mapToPostPromise(request, subreddits, type),
  ], []))
  return content.reduce((accum, typeObj) => Object.assign(accum, typeObj), {})
}

module.exports = {
  getHotFromSub,
  getPostsFromSubs,
  getAllRedditContent,
}
