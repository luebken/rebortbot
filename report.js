
var GitHubApi = require("github");
var Trello = require("trello");


module.exports.createReport = function () {

  var trello = new Trello(process.env.TRELLO_API_KEY, process.env.TRELLO_DEV_TOKEN);
  var github = new GitHubApi({})

  var owner = process.env.GITHUB_OWNER
  var repo = process.env.GITHUB_REPO


  github.issues.getForRepo({
    owner: owner,
    repo: repo,
    state: 'all'
  }, function (err, res) {
    const issues_for_card_id = {}
    res.data.map(function (issue) {
      const match = issue.body.match(/TRELLO_CARD_ID:\s([a-z0-9]*)/)
      if (match) {
        const card_id = match[1]
        console.log(`Including issue #${issue.number} (${issue.state}) in report to Trello Card: ${card_id}`)
        if (!issues_for_card_id[card_id]) {
          issues_for_card_id[card_id] = []
        }
        issues_for_card_id[card_id].push(issue)
      }
    })

    Object.entries(issues_for_card_id).map(function (entry) {
      var report = { 'closed_issues': [], 'open_issues': [] }
      const card_id = entry[0]
      const issues = entry[1]
      issues.map(function (issue) {
        const item = { 'title': issue.title, 'url': issue.url }
        if (issue.state == 'closed') {
          report.closed_issues.push(item)
        } else if (issue.state == 'open') {
          report.open_issues.push(item)
        }
      })

      var text = '**Report:** (via [reportbot](http://github.com/luebken/reportbot))\n\n'
      text += ` * Closed Issues: [${report.closed_issues.length}](https://github.com/${owner}/${repo}/issues?q=is%3Aclosed)\n`
      text += ` * Open Issues: [${report.closed_issues.length}](https://github.com/${owner}/${repo}/issues?q=is%3Aopen)\n`

      trello.addCommentToCard(process.env.TRELLO_CARD_ID, text, (err, res) => {
        if (err != null) {
          console.log('Err', err)
        } else {
          console.log('Send report:\n', text, '\n')
        }
      });

    })

  });


}


