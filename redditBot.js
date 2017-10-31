const Snoowrap = require('snoowrap')
const { reddit } = require('./secrets')

const requester = new Snoowrap(reddit)

const goodSubmission = submission =>
  !submission.stickied && !submission.is_self

const goodURL = url =>


const getData = async (request) => {
  const hot = await request.getSubreddit('listentothis').getHot()
  const urlArr = hot
    .filter(goodSubmission)
    .map(submission => submission.url)
  console.log(urlArr)
}

getData(requester)
