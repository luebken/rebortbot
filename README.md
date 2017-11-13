# Report bot

[![Greenkeeper badge](https://badges.greenkeeper.io/luebken/reportbot.svg)](https://greenkeeper.io/)

Collects metrics over time and reports that somewhere else.

## MVP

Collect Github issues and report the summary to a Trello Card. 

Build with https://probot.github.io and https://serverless.com/ uses https://github.com/tcbyrd/probot-lambda upstream Readme: https://github.com/tcbyrd/probot-lambda

## Development

TODO

## Discussion on other deployment solutions: 

* Pure Probot: Is currently not ready for Lambda yet. https://github.com/probot/probot/issues/149
* zeit.co/now: doesn't have suitable workflow for the free offering since it always creates new deployments which would mean changing the webhook.
* Glitch: Doesn't have a native CLI 
* Up: See https://github.com/luebken/reportbot/compare/tech-pocs