module.exports = function (robot) {
  robot.on('issues.opened', async context => {
    return createComment(robot, context, "opening")
  })
  robot.on('issues.clised', async context => {
    return createComment(robot, context, "closing")
  })
}


function createComment(context, action) {
  const github = await robot.app.asInstallation(context.payload.installation.id)
  const body = { body: `Thanks for ${action} this issue! :tada: :thumbsup: :thumbsup:` }
  return github.issues.createComment(context.issue(body))
}