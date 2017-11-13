# Report bot

Collects metrics over time and reports that somewhere else.

## MVP

Collect Github issues and report the summary to a Trello Card. 

Build with https://probot.github.io and https://serverless.com/ running on https://aws.amazon.com/lambda/. Builds on https://github.com/tcbyrd/probot-lambda.

## Deployment

### Requirements

  * Have https://serverless.com installed: `$ npm install -g serverless`
  * Have an AWS Account and the ENVs ready: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION
  * Register a Github App: https://github.com/settings/apps and the ENVs ready: APP_ID, WEBHOOK_SECRET. Plus store the private key as private-key.pem
  * Have a Trello Card ready and the ENVs ready TRELLO_API_KEY, TRELLO_DEV_TOKEN, TRELLO_USER, TRELLO_CARD_ID

#### How to get the TRELLO_CARD_ID

  ````bash
  # Get TRELLO_API_KEY
  $ open https://trello.com/app-key
  # Get TRELLO_DEV_TOKEN by clicking the Token Link
  ...
  # Get your boards
  $ curl "https://api.trello.com/1/members/$TRELLO_USER/boards?fields=name,id&key=$TRELLO_API_KEY&token=$TRELLO_DEV_TOKEN" | jq .
  # Save your board as TRELLO_BOARD_ID
  $ curl "https://api.trello.com/1/boards/$TRELLO_BOARD_ID/cards?fields=name&key=$TRELLO_API_KEY&token=$TRELLO_DEV_TOKEN" | jq .
  # Look for the approrpiate card
  ````

### Configure

  ````bash
  $ git clone https://github.com/luebken/reportbot
  $ npm install
  ````

  This repo uses https://direnv.net/. With ENVs collected above create this .envrc:

  ````bash
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

  # TRELLO
  export TRELLO_API_KEY=<TODO>
  export TRELLO_DEV_TOKEN=<TODO>
  export TRELLO_USER=<TODO>
  export TRELLO_CARD_ID=<TODO>
  ````

## Deployment

  ````bash
  $ serverless deploy
  # Use Endpoint to include as a webhook in app https://github.com/settings/apps/reportbot
  ````


## Discussion on other deployment solutions: 

* Pure Probot: Is currently not ready for Lambda yet. https://github.com/probot/probot/issues/149
* zeit.co/now: doesn't have suitable workflow for the free offering since it always creates new deployments which would mean changing the webhook.
* Glitch: Doesn't have a native CLI 
* Up: See https://github.com/luebken/reportbot/compare/tech-pocs