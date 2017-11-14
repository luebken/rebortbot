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

  //Trello
  const issueURL = context.payload.issue.html_url
  const trelloCommentBody = `Thanks for ${action} the issue ${issueURL} :tada:`
  trello.addCommentToCard(process.env.TRELLO_CARD_ID, trelloCommentBody, (r1, r2) => {
    console.log('res from addCommentToCard:', r1, r2)
  });

  //Github
  const github = await robot.app.asInstallation(context.payload.installation.id)
  const body = { body: `Thanks for ${action} this issue! :tada:\nReported at https://trello.com/c/${process.env.TRELLO_CARD_ID}` }

  return github.issues.createComment(context.issue(body))
}

