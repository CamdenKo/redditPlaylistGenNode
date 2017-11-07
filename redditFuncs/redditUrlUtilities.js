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

module.exports = filterRedditResultsToYoutubeId
