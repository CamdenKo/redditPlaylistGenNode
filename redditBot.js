const Snoowrap = require('snoowrap')

const { reddit } = require('./secrets')
const { andFunc, isYoutube } = require('./urlValidation/urlValidation')

const goodURL = url =>
  andFunc(isYoutube)(url)

const goodSubmission = submission =>
  !submission.stickied && !submission.is_self && goodURL(submission.url)

const accessReddit = () =>
  new Snoowrap(reddit)

const getHotFromSub = async (request, subreddit) => {
  const hot = await request.getSubreddit(subreddit || 'listentothis').getHot()
  return hot
    .filter(goodSubmission)
    .map(submission => submission.url)
}

const getHotFromSubs = async (request, subreddits) => {
  try {
    const allLinks = await Promise.all(subreddits.map(subName => getHotFromSub(request, subName)))
    return allLinks.reduce((accum, links, index) => Object.assign(accum, { [subreddits[index]]: links }), {})
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  accessReddit,
  getHotFromSub,
  getHotFromSubs,
}
