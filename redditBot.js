const Snoowrap = require('snoowrap')

const { reddit } = require('./secrets')
const { andFunc, isYoutube } = require('./urlValidation/urlValidation')

const goodURL = url =>
  andFunc(isYoutube)(url)

const goodSubmission = submission =>
  !submission.stickied && !submission.is_self && goodURL(submission.url)

const getReddit = () =>
  new Snoowrap(reddit)

const getData = async (request) => {
  const hot = await request.getSubreddit('listentothis').getHot()
  return hot
    .filter(goodSubmission)
    .map(submission => submission.url)
}

module.exports = {
  requester,
  getData,
}
