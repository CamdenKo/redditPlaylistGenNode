const { andFunc, isYoutube } = require('../urlValidation/urlValidation')

const convertURLToYoutubeId = (url) => {
  const id = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)[1].substring(0, 11)
  return id || url
}

const goodURL = url =>
  andFunc(isYoutube)(url)

const goodSubmission = submission =>
  !submission.stickied && !submission.is_self && goodURL(submission.url)

const filterRedditResultsToYoutubeId = results =>
  results
    .filter(goodSubmission)
    .map(submission => convertURLToYoutubeId(submission.url))

const getTopFromSub = async (request, subreddit) =>
  filterRedditResultsToYoutubeId(await request.getSubreddit(subreddit).getTop('all'))

const getHotFromSub = async (request, subreddit) =>
  filterRedditResultsToYoutubeId(await request.getSubreddit(subreddit || 'listentothis').getHot())

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

module.exports = {
  getHotFromSub,
  getPostsFromSubs,
}
