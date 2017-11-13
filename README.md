# Report bot

Collects metrics over time and reports that somewhere else.

## MVP

Collect Github issues and report the summary to a Trello Card. 

Build with https://probot.github.io and https://serverless.com/ running on https://aws.amazon.com/lambda/. Builds on https://github.com/tcbyrd/probot-lambda.

## Deployment

### Requirements

  * Tool: `npm install -g serverless``
  * Account and AWS and the ENVs: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION
  * A registered Github App: https://github.com/settings/apps and the ENVs: APP_ID, WEBHOOK_SECRET. Plus store the private key as private-key.pem

### Configure

  #.envrc https://direnv.net/
  # AWS
  export AWS_ACCESS_KEY_ID=<TODO>
  export AWS_SECRET_ACCESS_KEY=<TODO>
  export AWS_REGION=<TODO>

  # PROBOT
  export APP_ID=<TODO>
  export WEBHOOK_SECRET=<TODO>
  export PRIVATE_KEY_PATH=./private-key.pem

  # PROBOT DEV
  # Subdomain to use for localtunnel server.
  export SUBDOMAIN=reportbot 


## Deployment

  $ git clone https://github.com/luebken/reportbot
  $ npm install

  $ serverless deploy
  # Use Endpoint to include as a webhook in app https://github.com/settings/apps/reportbot

## Discussion on other deployment solutions: 

* Pure Probot: Is currently not ready for Lambda yet. https://github.com/probot/probot/issues/149
* zeit.co/now: doesn't have suitable workflow for the free offering since it always creates new deployments which would mean changing the webhook.
* Glitch: Doesn't have a native CLI 
* Up: See https://github.com/luebken/reportbot/compare/tech-pocs