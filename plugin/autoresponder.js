var Trello = require("trello");
var trello = new Trello(process.env.TRELLO_API_KEY, process.env.TRELLO_DEV_TOKEN);

module.exports = function (robot) {
  robot.on('issues.opened', context => {
    return createComment(robot, context, "opening")
  })
  robot.on('issues.closed', context => {
    return createComment(robot, context, "closing")
  })
}


const createComment = async (robot, context, action) => {
  const github = await robot.app.asInstallation(context.payload.installation.id)
  const body = { body: `Thanks for ${action} this issue! :tada: :thumbsup: :thumbsup:` }
  trello.addCommentToCard(process.env.TRELLO_CARD_ID, body.body, (res) => {
    console.log('res from addCommentToCard:', res)
  });

  return github.issues.createComment(context.issue(body))
}

